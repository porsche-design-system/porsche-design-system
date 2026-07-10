#!/usr/bin/env bash
# Finalize: assemble the PR body, commit the dependency changes, and (unless
# DEP_UPDATE_DRY=1) push to origin and open (or update) a PR against main.
#
# Requires: gh authenticated with push rights to origin (no fork needed).
# Exit 0 = ok, 1 = nothing to commit (loop_back), 2 = environment problem.
#
# Re-entrant: safe to re-run after a partial failure. If a prior run already
# committed but failed before pushing / opening the PR, a rerun still pushes and
# reuses (updates) the existing PR instead of erroring on "PR already exists".

set -euo pipefail

# Resolve sibling scripts by this file's location, not the caller's cwd, so the
# stage works regardless of where it is invoked from (and is testable in a
# scratch repo without copying the whole script tree).
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

OUT_DIR=".turbo-spec/out"
PLAN="$OUT_DIR/update-plan.json"
OVERRIDES="$OUT_DIR/overrides-added.json"
REPORT="$OUT_DIR/outdated-report.json"
BODY="$OUT_DIR/pr-body.md"
DEFAULT_BRANCH="${DEFAULT_BRANCH:-main}"

if [ ! -f "$PLAN" ]; then
  echo "finalize: no update-plan.json — nothing to finalize" >&2
  exit 2
fi

# Optional CLI args built as arrays. On macOS bash 3.2.57 (the host shell),
# expanding an EMPTY array as "${arr[@]}" under `set -u` throws
# "unbound variable" even though the array is initialised — so every expansion
# below uses the "${arr[@]+"${arr[@]}"}" guard, which yields nothing when empty.
ISSUE_ARG=()
[ -n "${ISSUE_NUMBER:-}" ] && ISSUE_ARG=(--issue "$ISSUE_NUMBER")
OVERRIDES_ARG=()
[ -f "$OVERRIDES" ] && OVERRIDES_ARG=(--overrides "$OVERRIDES")
REPORT_ARG=()
[ -f "$REPORT" ] && REPORT_ARG=(--outdated-report "$REPORT")

node "$SCRIPT_DIR/assemble-pr-body.mjs" "$PLAN" \
  "${OVERRIDES_ARG[@]+"${OVERRIDES_ARG[@]}"}" \
  "${REPORT_ARG[@]+"${REPORT_ARG[@]}"}" \
  "${ISSUE_ARG[@]+"${ISSUE_ARG[@]}"}" \
  --out "$BODY"

# Stage only tracked modifications and deletions (`-u`), never untracked files.
# Every file this workflow legitimately edits — package.json across the tree,
# package-lock.json, docs/dependencies.md, and any Angular-migrated tracked
# sources — is already tracked, so `-u` captures them all while structurally
# refusing to sweep in npm debug logs, lifecycle output, or stray secrets that
# `git add -A` would have committed.
git add -u

# Belt-and-braces: refuse to continue if any untracked, non-ignored file is
# present. `.turbo-spec/out/` is gitignored; anything else untracked is
# unexpected here and must stop the run rather than risk leaking it later.
UNTRACKED="$(git status --porcelain --untracked-files=normal | grep '^??' || true)"
if [ -n "$UNTRACKED" ]; then
  echo "finalize: refusing to proceed — unexpected untracked files present:" >&2
  echo "$UNTRACKED" >&2
  exit 2
fi

DATE="$(date +%Y-%m-%d)"
BRANCH="$(git rev-parse --abbrev-ref HEAD)"
COMMIT_SUBJECT="chore(deps): weekly dependency updates ($DATE)"

# Commit only when there is a staged diff. On a partial rerun the changes were
# already committed by the earlier run, so there is nothing to stage — that is
# NOT an error; fall through to push / PR so the rerun still finishes the job.
if git diff --cached --quiet; then
  if git log -1 --pretty=%s 2>/dev/null | grep -q '^chore(deps): weekly dependency updates'; then
    echo "finalize: changes already committed by a prior run — continuing to push/PR" >&2
  else
    echo "finalize: no staged changes to commit — nothing to finalize" >&2
    exit 1
  fi
else
  git commit -m "$COMMIT_SUBJECT

Co-authored-by: Copilot App <223556219+Copilot@users.noreply.github.com>"
fi

if [ "${DEP_UPDATE_DRY:-0}" = "1" ]; then
  echo "finalize: DEP_UPDATE_DRY=1 — committed locally; skipping push and PR"
  exit 0
fi

# Push is idempotent: -u sets upstream; re-pushing an up-to-date branch is a no-op.
git push -u origin "$BRANCH"

# Idempotent PR handling: reuse an already-open PR for this head branch and
# refresh its body, instead of failing on "a pull request already exists".
EXISTING_PR="$(gh pr list --head "$BRANCH" --state open --json number --jq '.[0].number' 2>/dev/null || echo '')"
if [ -n "$EXISTING_PR" ]; then
  gh pr edit "$EXISTING_PR" --body-file "$BODY"
  echo "finalize: updated existing PR #$EXISTING_PR for $BRANCH"
else
  gh pr create \
    --base "$DEFAULT_BRANCH" \
    --head "$BRANCH" \
    --title "$COMMIT_SUBJECT" \
    --body-file "$BODY"
  echo "finalize: PR opened against $DEFAULT_BRANCH"
fi
