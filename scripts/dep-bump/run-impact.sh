#!/usr/bin/env bash
# S5 impact tests. Select impact commands from bump.json, then run them in order.
# Exit 1 -> a test/build command failed (escalate at the gate).
set -uo pipefail

node --import tsx scripts/dep-bump/select-impact-tests.ts

mapfile -t COMMANDS < <(node -e '
  const fs = require("node:fs");
  const plan = JSON.parse(fs.readFileSync(".turbo-spec/out/impact.json", "utf8"));
  for (const cmd of plan.commands ?? []) console.log(cmd);
')

for cmd in "${COMMANDS[@]}"; do
  echo "[verify] running impact command: $cmd"
  if ! eval "$cmd"; then
    echo "[verify] impact command failed: $cmd" >&2
    exit 1
  fi
done

echo "[verify] all impact commands passed"
exit 0
