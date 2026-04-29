#!/usr/bin/env bash

# Creates the lightweight git tag "v${INPUT_VERSION}" on ${INPUT_SHA} in
# ${INPUT_REPOSITORY} via the GitHub REST API. Fails on any non-success
# response (e.g. tag already exists, auth error).

set -o errexit
set -o nounset
set -o pipefail

: "${INPUT_VERSION:?version input is required}"
: "${INPUT_SHA:?sha input is required}"
: "${INPUT_REPOSITORY:?repository input is required}"
: "${GITHUB_TOKEN:?github-token input is required}"

GIT_TAG_NAME="v${INPUT_VERSION}"
SKIP_PRERELEASES="${INPUT_SKIP_PRERELEASES:-true}"

if [[ "${SKIP_PRERELEASES}" == "true" ]] && [[ "${INPUT_VERSION}" =~ -(rc|beta|alpha) ]]; then
  echo "Skipping git tag for pre-release version \"${INPUT_VERSION}\"."
  exit 0
fi

echo "task: [$(date)] \"create_git_tag\" ${GIT_TAG_NAME} -> ${INPUT_SHA} (${INPUT_REPOSITORY})"

curl --fail-with-body -sS -X POST \
  -H "Authorization: Bearer ${GITHUB_TOKEN}" \
  -H "Accept: application/vnd.github+json" \
  -H "X-GitHub-Api-Version: 2026-03-10" \
  "https://api.github.com/repos/${INPUT_REPOSITORY}/git/refs" \
  -d @- <<EOF
{
  "ref": "refs/tags/${GIT_TAG_NAME}",
  "sha": "${INPUT_SHA}"
}
EOF

echo "Created git tag \"${GIT_TAG_NAME}\" at \"${INPUT_SHA}\" 🏷️"

