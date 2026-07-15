#!/usr/bin/env bash
# Upsert the dependency-bump tables as a single PR comment. Idempotent across
# retries: edits the last bot comment when one already exists, otherwise creates
# it. No-op (success) when there is no PR context or no rendered body, so local
# and non-PR runs stay green.
set -euo pipefail

pr="${TURBO_SPEC_PR_NUMBER:-}"
body_file=".turbo-spec/out/pr-tables.md"

if [ -z "$pr" ]; then
  echo "post-pr-tables: no TURBO_SPEC_PR_NUMBER; skipping PR comment." >&2
  exit 0
fi
if [ ! -s "$body_file" ]; then
  echo "post-pr-tables: no $body_file; skipping PR comment." >&2
  exit 0
fi

# Prefer editing the previous comment so retries don't stack duplicates; fall
# back to creating the first one.
gh pr comment "$pr" --edit-last --body-file "$body_file" \
  || gh pr comment "$pr" --body-file "$body_file"
