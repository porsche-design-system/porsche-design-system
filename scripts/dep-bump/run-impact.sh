#!/usr/bin/env bash
# S5 impact tests. Select impact commands from bump.json, then run them in order.
# Exit 1 -> a test/build command failed (escalate at the gate).
set -uo pipefail

node --import tsx scripts/dep-bump/select-impact-tests.ts || exit 2

# Read the impact commands into an array. Avoid `mapfile` (bash 4+) so the gate
# works on the host's bash 3.2 (macOS default) as well as the Linux sandbox.
COMMANDS=()
while IFS= read -r cmd; do
  [ -n "$cmd" ] && COMMANDS+=("$cmd")
done < <(node -e '
  const fs = require("node:fs");
  const plan = JSON.parse(fs.readFileSync(".turbo-spec/out/impact.json", "utf8"));
  for (const cmd of plan.commands ?? []) console.log(cmd);
')

# Guard the expansion: under `set -u`, bash 3.2 treats an empty "${COMMANDS[@]}"
# as an unbound variable.
if [ "${#COMMANDS[@]}" -gt 0 ]; then
  for cmd in "${COMMANDS[@]}"; do
    echo "[verify] running impact command: $cmd"
    if ! eval "$cmd"; then
      echo "[verify] impact command failed: $cmd" >&2
      exit 1
    fi
  done
fi

echo "[verify] all impact commands passed"
exit 0
