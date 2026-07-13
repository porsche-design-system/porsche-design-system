#!/usr/bin/env bash
# S5 tree checks. npm ci (reproducible), npm ls --all (no invalid peer edges),
# npm run npm:lint (syncpack). Exit 1 -> real failure (loop_back to update);
# exit >=2 -> environment error (escalate).
set -uo pipefail

if ! npm ci; then
  echo "[verify] npm ci failed from the new lockfile" >&2
  exit 1
fi

if ! npm ls --all > .turbo-spec/out/ls-current.txt 2>&1; then
  echo "[verify] npm ls --all reported unmet/invalid peer edges" >&2
  cat .turbo-spec/out/ls-current.txt >&2
  exit 1
fi

if ! npm run npm:lint; then
  echo "[verify] syncpack lint failed" >&2
  exit 1
fi

echo "[verify] tree checks passed"
exit 0
