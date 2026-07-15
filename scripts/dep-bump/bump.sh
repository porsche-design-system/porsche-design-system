#!/usr/bin/env bash
# S2 Bump. Run the repository's held-back-aware update, then classify the diff.
# Writes .turbo-spec/out/bump.json. Exit 0 only when the classification was
# produced; a failed update OR a failed classify escalates (the agent depends on
# bump.json, so a swallowed classify failure must not read as success).
set -uo pipefail

# Reconcile this platform's native binaries before any tsx/syncpack call. The host
# preflight installs node_modules on macOS; this stage runs in a linux sandbox where the
# platform-gated esbuild/syncpack binaries are absent. Probe-guarded no-op when healthy.
if ! bash scripts/dep-bump/ensure-platform-binaries.sh; then
  echo "[bump] could not reconcile platform binaries" >&2
  exit 2
fi

if ! npm run npm:update:non-interactive; then
  echo "[bump] npm:update:non-interactive failed" >&2
  exit 2
fi

if ! node --import tsx scripts/dep-bump/classify-bump.ts; then
  echo "[bump] classification failed; bump.json was not written" >&2
  exit 2
fi
echo "[bump] classification written to .turbo-spec/out/bump.json"
