#!/usr/bin/env bash
# Preflight for the dependency-update workflow.
#
#   preflight.sh          setup: verify prerequisites, then create/switch to the
#                         dated update branch (mutating).
#   preflight.sh --check  gate: assert invariants only (no mutation).
#
# Exit codes: 0 = ok, 1 = invariant violated (loop_back), 2 = environment
# problem such as wrong Node/npm or a dirty tree (escalate).

set -euo pipefail

MODE="${1:-setup}"
DEFAULT_BRANCH="${DEFAULT_BRANCH:-main}"
BRANCH_PREFIX="chore/dependency-updates"

fail_env() { echo "preflight: $1" >&2; exit 2; }
fail_gate() { echo "preflight: $1" >&2; exit 1; }

# --- must run at the repo root of the PDS monorepo ---
if [ ! -f package.json ]; then
  fail_env "no package.json in \$PWD ($PWD) — run from the repo root"
fi
ROOT_NAME="$(node -p "require('./package.json').name" 2>/dev/null || echo '')"
case "$ROOT_NAME" in
  *porsche-design-system*) : ;;
  *) fail_env "package.json name '$ROOT_NAME' is not the PDS monorepo root" ;;
esac

# --- Node / npm must match the root package.json volta pins ---
WANT_NODE="$(node -p "require('./package.json').volta?.node || ''" 2>/dev/null || echo '')"
WANT_NPM="$(node -p "require('./package.json').volta?.npm || ''" 2>/dev/null || echo '')"
HAVE_NODE="$(node -v 2>/dev/null | sed 's/^v//')"
HAVE_NPM="$(npm -v 2>/dev/null || echo '')"
if [ -n "$WANT_NODE" ] && [ "$WANT_NODE" != "$HAVE_NODE" ]; then
  fail_env "Node $HAVE_NODE does not match volta pin $WANT_NODE"
fi
if [ -n "$WANT_NPM" ] && [ "$WANT_NPM" != "$HAVE_NPM" ]; then
  fail_env "npm $HAVE_NPM does not match volta pin $WANT_NPM"
fi

CURRENT_BRANCH="$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo '')"

if [ "$MODE" = "--check" ]; then
  # Gate: never operate on the default branch (enforces "never push to main").
  if [ "$CURRENT_BRANCH" = "$DEFAULT_BRANCH" ]; then
    fail_gate "current branch is '$DEFAULT_BRANCH'; the workflow must run on a $BRANCH_PREFIX/* branch"
  fi
  case "$CURRENT_BRANCH" in
    "$BRANCH_PREFIX"/*) : ;;
    *) echo "preflight: warning: branch '$CURRENT_BRANCH' is not $BRANCH_PREFIX/* (allowed for local runs)" >&2 ;;
  esac
  echo "preflight --check: ok (branch=$CURRENT_BRANCH, node=$HAVE_NODE, npm=$HAVE_NPM)"
  exit 0
fi

# --- setup: working tree must be clean before we branch ---
if [ -n "$(git status --porcelain)" ]; then
  fail_env "working tree is not clean; commit or stash before running"
fi

# Refresh the default branch (best-effort; offline is not fatal for local runs).
git fetch origin "$DEFAULT_BRANCH" --quiet 2>/dev/null || \
  echo "preflight: warning: could not fetch origin/$DEFAULT_BRANCH (offline?)" >&2

BRANCH="${BRANCH_PREFIX}/$(date +%Y-%m-%d)"
if [ "$CURRENT_BRANCH" = "$BRANCH" ]; then
  echo "preflight: already on $BRANCH"
elif git show-ref --verify --quiet "refs/heads/$BRANCH"; then
  git switch "$BRANCH"
  echo "preflight: switched to existing $BRANCH"
else
  git switch -c "$BRANCH"
  echo "preflight: created $BRANCH"
fi

# Clean the artifact directory so a fresh run never reads a prior run's
# update-plan.json / install.log (stale artifacts caused misroutes and false
# gate failures). Setup mode only — resume does not re-run preflight.
rm -rf .turbo-spec/out && mkdir -p .turbo-spec/out
echo "preflight: cleaned .turbo-spec/out"

exit 0
