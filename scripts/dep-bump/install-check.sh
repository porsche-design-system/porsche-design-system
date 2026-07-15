#!/usr/bin/env bash
# S3 Install & triage. Run npm install; on ERESOLVE first try a deterministic
# clean reinstall (npm:reinstall) before waking the agent. Exit 0 = clean;
# 3 = PERSISTENT ERESOLVE (agent must resolve); 2 = other install failure.
set -uo pipefail

OUT=".turbo-spec/out"
mkdir -p "$OUT"
LOG="$OUT/install.log"

if npm install > "$LOG" 2>&1; then
  echo "CLEAN"
  exit 0
fi

if grep -q "ERESOLVE" "$LOG"; then
  echo "[install-check] ERESOLVE on fast install; attempting clean reinstall" >&2
  if npm run npm:reinstall > "$LOG" 2>&1; then
    echo "CLEAN"
    exit 0
  fi
  if grep -q "ERESOLVE" "$LOG"; then
    echo "ERESOLVE"
    exit 3
  fi
  echo "INSTALL_FAILED"
  exit 2
fi

echo "INSTALL_FAILED"
exit 2
