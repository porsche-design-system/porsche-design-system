#!/usr/bin/env bash
# S2 Bump. Run the repository's held-back-aware update, then classify the diff.
# Writes .turbo-spec/out/bump.json. Exit 0 unless the update command itself failed.
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

node --import tsx scripts/dep-bump/classify-bump.ts
echo "[bump] classification written to .turbo-spec/out/bump.json"
