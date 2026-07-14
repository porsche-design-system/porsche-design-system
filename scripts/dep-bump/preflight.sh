#!/usr/bin/env bash
# S1 Preflight (mechanical). Assert a clean, reproducible tree and snapshot baselines.
# Exit 0 -> CONTINUE. Exit >=2 -> escalate (terminal BLOCKED at preflight).
set -uo pipefail

OUT=".turbo-spec/out"
# Start each run from a clean output dir so a crashed prior run cannot leak a
# stale verdict/hint into this one. `.turbo-spec/out` is gitignored, so removing
# it never dirties the tree (asserted clean below). The update stage recreates
# the dir and seeds the resolve ledger in its pre_command.
rm -rf "$OUT"
mkdir -p "$OUT"

if [ -n "$(git status --porcelain)" ]; then
  echo "[preflight] worktree is not clean; refusing to start" >&2
  exit 2
fi

if ! npm ci; then
  echo "[preflight] npm ci failed; retrying once for transient/network reasons" >&2
  sleep 5
  if ! npm ci; then
    echo "[preflight] npm ci failed twice; stopping" >&2
    exit 2
  fi
fi

if ! git diff --quiet; then
  echo "[preflight] npm ci mutated tracked files; lockfile is not reproducible" >&2
  exit 2
fi

npm audit --json > "$OUT/audit-baseline.json" || true
# Baseline tree snapshot: consumed by tree-compare.ts as the set of pre-existing
# invalid/extraneous edges the verify/update tree-check is allowed to tolerate.
npm ls --all --json > "$OUT/ls-baseline.json" 2>/dev/null || true

# Baseline dep snapshot for in-sandbox classification (F6). Preflight runs on the
# host where git works and the tree is clean (== HEAD), so this captures the
# pre-bump deps + tracked package.json list. The update stage reads these files
# from disk instead of calling git, whose worktree .git may be unmounted.
if ! node --import tsx scripts/dep-bump/snapshot-baseline.ts; then
  echo "[preflight] failed to snapshot the dependency baseline" >&2
  exit 2
fi

printf '{\n  "schemaVersion": 1,\n  "outcome": "CONTINUE"\n}\n' > "$OUT/preflight.json"
echo "[preflight] clean, reproducible, baselines captured"
exit 0
