#!/usr/bin/env bash
# S3.5 Normalize (mechanical). Prune now-redundant overrides, auto-fix syncpack
# version-range + formatting drift, then gate on: lint clean, format clean, and
# nothing left to update. Exit 0 -> pass; 1 -> gate failure; 2 -> environment.
set -uo pipefail

if ! node --import tsx scripts/dep-bump/prune-overrides.ts; then
  echo "[normalize] override prune failed" >&2
  exit 2
fi

# Auto-fix version-range inconsistencies and formatting, then assert clean.
npm run npm:lint:fix || true
npm run npm:format:fix || true

if ! npm run npm:lint; then
  echo "[normalize] syncpack lint still failing after fix" >&2
  exit 1
fi
if ! npm run npm:format; then
  echo "[normalize] syncpack format still failing after fix" >&2
  exit 1
fi

# Gate: everything updatable must already be up to date (syncpack update --check).
if ! npm run npm:outdated; then
  echo "[normalize] syncpack reports remaining updates (update --check non-empty)" >&2
  exit 1
fi

echo "[normalize] pruned, lint+format clean, nothing left to update"
exit 0
