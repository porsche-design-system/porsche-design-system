#!/usr/bin/env bash
# S1 Preflight (mechanical). Assert a clean, reproducible tree and snapshot baselines.
# Exit 0 -> CONTINUE. Exit >=2 -> escalate (terminal BLOCKED at preflight).
set -uo pipefail

OUT=".turbo-spec/out"
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

printf '{\n  "schemaVersion": 1,\n  "outcome": "CONTINUE"\n}\n' > "$OUT/preflight.json"
echo "[preflight] clean, reproducible, baselines captured"
exit 0
