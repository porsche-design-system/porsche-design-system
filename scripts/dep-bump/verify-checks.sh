#!/usr/bin/env bash
# S5 tree checks. npm ci (reproducible), tree baseline-diff (no NEW invalid peer
# edges vs the S1 baseline — pre-existing third-party edges are tolerated),
# npm run npm:lint (syncpack). Exit 1 -> real failure (loop_back to update);
# exit >=2 -> environment error (escalate).
set -uo pipefail

if ! npm ci; then
  echo "[verify] npm ci failed from the new lockfile" >&2
  exit 1
fi

# Capture the current tree and diff it against the S1 preflight baseline. Fail
# ONLY on edges introduced by this run; edges already present on the untouched
# base tree are not attributable to the bump and must not gate it.
npm ls --all --json > .turbo-spec/out/ls-current.json 2>/dev/null || true
if ! node --import tsx scripts/dep-bump/tree-compare.ts; then
  echo "[verify] new invalid/extraneous edges vs baseline (see .turbo-spec/out/tree-compare.json)" >&2
  exit 1
fi

if ! npm run npm:lint; then
  echo "[verify] syncpack lint failed" >&2
  exit 1
fi

echo "[verify] tree checks passed"
exit 0
