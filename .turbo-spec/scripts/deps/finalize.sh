#!/usr/bin/env bash
# Finalize: assemble the PR body, commit the dependency changes, and (unless
# DEP_UPDATE_DRY=1) push to origin and open a PR against main.
#
# Requires: gh authenticated with push rights to origin (no fork needed).
# Exit 0 = ok, 1 = nothing to commit (loop_back), 2 = environment problem.

set -euo pipefail

OUT_DIR=".turbo-spec/out"
PLAN="$OUT_DIR/update-plan.json"
OVERRIDES="$OUT_DIR/overrides-added.json"
BODY="$OUT_DIR/pr-body.md"
DEFAULT_BRANCH="${DEFAULT_BRANCH:-main}"

if [ ! -f "$PLAN" ]; then
  echo "finalize: no update-plan.json — nothing to finalize" >&2
  exit 2
fi

ISSUE_ARG=()
[ -n "${ISSUE_NUMBER:-}" ] && ISSUE_ARG=(--issue "$ISSUE_NUMBER")
OVERRIDES_ARG=()
[ -f "$OVERRIDES" ] && OVERRIDES_ARG=(--overrides "$OVERRIDES")

node .turbo-spec/scripts/deps/assemble-pr-body.mjs "$PLAN" \
  "${OVERRIDES_ARG[@]}" "${ISSUE_ARG[@]}" --out "$BODY"

# Stage tracked changes only (out/ is gitignored).
git add -A

if git diff --cached --quiet; then
  echo "finalize: no staged changes to commit" >&2
  exit 1
fi

DATE="$(date +%Y-%m-%d)"
git commit -m "chore(deps): weekly dependency updates ($DATE)

Co-authored-by: Copilot App <223556219+Copilot@users.noreply.github.com>"

if [ "${DEP_UPDATE_DRY:-0}" = "1" ]; then
  echo "finalize: DEP_UPDATE_DRY=1 — committed locally; skipping push and PR"
  exit 0
fi

BRANCH="$(git rev-parse --abbrev-ref HEAD)"
git push -u origin "$BRANCH"

gh pr create \
  --base "$DEFAULT_BRANCH" \
  --head "$BRANCH" \
  --title "chore(deps): weekly dependency updates ($DATE)" \
  --body-file "$BODY"

echo "finalize: PR opened against $DEFAULT_BRANCH"
