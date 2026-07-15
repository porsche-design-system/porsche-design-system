#!/usr/bin/env bash
# collect-outdated.sh — stage: check_outdated_dependencies (compute).
#
# Runs `npm outdated` and transforms its output into the structured artifact
# .turbo-spec/out/outdated.json, validated downstream against
# .turbo-spec/schemas/outdated.schema.json.
#
# `npm install` has already run in the blueprint's top-level setup_command, so
# an installed tree is present for npm outdated's `current` column.
#
# Exit semantics — this is the difference between a trustworthy report and a
# misleading one:
#   - Genuinely up to date  → npm outdated exits 0 with empty stdout → we emit
#     an empty `outdated: []` list and succeed.
#   - Outdated packages      → npm outdated exits 1 with a JSON object → we emit
#     the parsed list and succeed.
#   - A real npm error       → stdout is not parseable JSON → we FAIL (non-zero)
#     rather than pretend everything is up to date.
set -uo pipefail

out_dir=".turbo-spec/out"
raw_file="${out_dir}/outdated.raw.json"
json_file="${out_dir}/outdated.json"
mkdir -p "${out_dir}"

# Capture stdout regardless of npm's exit code (1 is normal when outdated).
npm outdated --json --long >"${raw_file}" 2>"${out_dir}/outdated.err" || true

# npm prints nothing when the tree is fully up to date — normalize to an empty
# JSON object so the transform below has valid input.
if [ ! -s "${raw_file}" ]; then
  echo '{}' >"${raw_file}"
fi

# Transform the npm map into the schema shape. A parse failure here means npm
# emitted something that is not the expected JSON map (a real error), so we exit
# non-zero and let the gate fail instead of authoring a false empty list.
node -e '
  const fs = require("fs");
  const rawPath = process.argv[1];
  const outPath = process.argv[2];

  let data;
  try {
    data = JSON.parse(fs.readFileSync(rawPath, "utf8"));
  } catch (e) {
    console.error("collect-outdated: npm outdated did not return parseable JSON:", e.message);
    process.exit(1);
  }
  if (data === null || typeof data !== "object" || Array.isArray(data)) {
    console.error("collect-outdated: unexpected npm outdated payload (not an object).");
    process.exit(1);
  }

  const outdated = Object.entries(data).map(([name, info]) => {
    const i = info && typeof info === "object" ? info : {};
    return {
      name,
      current: i.current || "-",
      wanted: i.wanted || "-",
      latest: i.latest || "-",
      type: i.type || "dependencies",
      location: i.location || "",
    };
  }).sort((a, b) => a.name.localeCompare(b.name));

  const payload = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    outdated,
  };
  fs.writeFileSync(outPath, JSON.stringify(payload, null, 2) + "\n");
  console.error(`collect-outdated: ${outdated.length} outdated package(s) recorded.`);
' "${raw_file}" "${json_file}"
