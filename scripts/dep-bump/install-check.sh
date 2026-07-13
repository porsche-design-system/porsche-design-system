#!/usr/bin/env bash
# S3 Install & triage. Run npm install and classify the outcome for the agent.
# Exit 0 = clean; 3 = ERESOLVE (agent must resolve); 2 = other install failure.
set -uo pipefail

OUT=".turbo-spec/out"
mkdir -p "$OUT"
LOG="$OUT/install.log"

if npm install > "$LOG" 2>&1; then
  echo "CLEAN"
  exit 0
fi

if grep -q "ERESOLVE" "$LOG"; then
  echo "ERESOLVE"
  exit 3
fi

echo "INSTALL_FAILED"
exit 2
