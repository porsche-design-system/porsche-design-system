#!/usr/bin/env bash

# Creates a GitHub Release "v${INPUT_VERSION}" in ${INPUT_REPOSITORY} via the
# GitHub REST API. The release POST also creates the underlying git tag at
# ${INPUT_SHA} via the "tag_name" + "target_commitish" fields, so no separate
# tag-creation step is required (except for drafts, which don't create tags).
#
# Only stable versions (no pre-release suffix) produce a release. The body is
# built by merging the changelog section for the stable version with all directly
# preceding pre-release sections of the same base version (so e.g. 4.0.0 includes
# 4.0.0-rc.2, 4.0.0-rc.1, ...), see ./extract-release-body.awk.
#
# Idempotent: if a release for the tag already exists, the script exits 0.

set -o errexit
set -o nounset
set -o pipefail

: "${INPUT_VERSION:?version input is required}"
: "${INPUT_REPOSITORY:?repository input is required}"
: "${INPUT_CHANGELOG_PATH:?changelog-path input is required}"

# Commit the git tag is created at. Only needed when the tag doesn't exist yet (the CI case);
# it must be a branch name or the SHA of a branch tip, otherwise the API answers "404 Not Found".
# For an already existing tag (the backfill case) it is left empty and omitted from the payload.
INPUT_SHA="${INPUT_SHA:-}"

# "auto" marks the release as latest only if it is the highest stable version in the
# changelog. Without it, a maintenance release of an older major (e.g. 3.36.0 released
# after 4.6.0) would steal the "Latest" badge.
INPUT_MAKE_LATEST="${INPUT_MAKE_LATEST:-auto}"
# Drafts allow reviewing a release before it becomes public (a draft doesn't create the git tag).
INPUT_DRAFT="${INPUT_DRAFT:-false}"
# Dry run prints the request payload instead of calling the GitHub API (no token needed).
INPUT_DRY_RUN="${INPUT_DRY_RUN:-false}"

if [[ "${INPUT_DRY_RUN}" != "true" ]]; then
  : "${GITHUB_TOKEN:?github-token input is required}"
fi

# Every exit below is 0, so only this output distinguishes a real release from a no-op.
set_created() {
  if [[ -n "${GITHUB_OUTPUT:-}" ]]; then
    echo "created=$1" >> "${GITHUB_OUTPUT}"
  fi
}

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
GIT_TAG_NAME="v${INPUT_VERSION}"

if [[ "${INPUT_VERSION}" == *-* ]]; then
  echo "Skipping GitHub Release for pre-release version \"${INPUT_VERSION}\"."
  set_created false
  exit 0
fi

if [[ ! -f "${INPUT_CHANGELOG_PATH}" ]]; then
  echo "Changelog file not found at \"${INPUT_CHANGELOG_PATH}\"." >&2
  exit 1
fi

if [[ ! "${INPUT_MAKE_LATEST}" =~ ^(auto|true|false)$ ]]; then
  echo "Invalid make-latest input \"${INPUT_MAKE_LATEST}\" (expected \"auto\", \"true\" or \"false\")." >&2
  exit 1
fi

if [[ ! "${INPUT_DRAFT}" =~ ^(true|false)$ ]]; then
  echo "Invalid draft input \"${INPUT_DRAFT}\" (expected \"true\" or \"false\")." >&2
  exit 1
fi

echo "task: [$(date)] \"create_github_release\" ${GIT_TAG_NAME} -> ${INPUT_SHA:-<existing tag>} (${INPUT_REPOSITORY})"

# Idempotency: bail out if a release for this tag already exists.
if [[ "${INPUT_DRY_RUN}" != "true" ]]; then
  EXISTING_STATUS=$(curl -sS -o /dev/null -w '%{http_code}' \
    -H "Authorization: Bearer ${GITHUB_TOKEN}" \
    -H "Accept: application/vnd.github+json" \
    -H "X-GitHub-Api-Version: 2026-03-10" \
    "https://api.github.com/repos/${INPUT_REPOSITORY}/releases/tags/${GIT_TAG_NAME}")

  if [[ "${EXISTING_STATUS}" == "200" ]]; then
    echo "GitHub Release \"${GIT_TAG_NAME}\" already exists – nothing to do."
    set_created false
    exit 0
  fi
fi

# Resolve "auto": latest only if the changelog holds no higher stable version.
MAKE_LATEST="${INPUT_MAKE_LATEST}"
if [[ "${MAKE_LATEST}" == "auto" ]]; then
  HIGHEST_STABLE_VERSION=$(awk '
    /^## \[/ {
      line = $0
      sub(/^## \[/, "", line)
      sub(/\].*$/, "", line)
      if (line ~ /^[0-9]+\.[0-9]+\.[0-9]+$/) print line
    }
  ' "${INPUT_CHANGELOG_PATH}" | sort -V | tail -n 1)

  if [[ "${HIGHEST_STABLE_VERSION}" == "${INPUT_VERSION}" ]]; then
    MAKE_LATEST="true"
  else
    MAKE_LATEST="false"
  fi

  echo "Resolved make-latest=\"${MAKE_LATEST}\" (highest stable version in changelog: \"${HIGHEST_STABLE_VERSION}\")."
fi

RELEASE_BODY=$(awk -v version="${INPUT_VERSION}" -f "${SCRIPT_DIR}/extract-release-body.awk" "${INPUT_CHANGELOG_PATH}")

# Trim leading/trailing blank lines.
RELEASE_BODY=$(printf '%s\n' "${RELEASE_BODY}" | awk '
  NF { found = 1 }
  found { buf = buf $0 ORS }
  END {
    sub(/[[:space:]]+$/, "", buf)
    print buf
  }
')

if [[ -z "${RELEASE_BODY}" ]]; then
  RELEASE_BODY="See [CHANGELOG.md](https://github.com/${INPUT_REPOSITORY}/blob/${GIT_TAG_NAME}/${INPUT_CHANGELOG_PATH}) for details."
fi

# Build JSON payload safely via jq. "target_commitish" is only sent when a sha is given,
# because for an existing tag GitHub rejects a plain commit SHA with "404 Not Found".
PAYLOAD=$(jq -n \
  --arg tag "${GIT_TAG_NAME}" \
  --arg name "${GIT_TAG_NAME}" \
  --arg body "${RELEASE_BODY}" \
  --arg target "${INPUT_SHA}" \
  --arg makeLatest "${MAKE_LATEST}" \
  --argjson draft "${INPUT_DRAFT}" \
  '{
    tag_name: $tag,
    name: $name,
    body: $body,
    draft: $draft,
    prerelease: false,
    make_latest: $makeLatest
  } + (if $target == "" then {} else { target_commitish: $target } end)')

if [[ "${INPUT_DRY_RUN}" == "true" ]]; then
  echo "[dry-run] Payload for \"${GIT_TAG_NAME}\":"
  echo "${PAYLOAD}"
  set_created false
  exit 0
fi

if ! RESPONSE=$(curl --fail-with-body -sS -X POST \
  -H "Authorization: Bearer ${GITHUB_TOKEN}" \
  -H "Accept: application/vnd.github+json" \
  -H "X-GitHub-Api-Version: 2026-03-10" \
  "https://api.github.com/repos/${INPUT_REPOSITORY}/releases" \
  -d "${PAYLOAD}"); then
  echo "Failed to create GitHub Release \"${GIT_TAG_NAME}\":" >&2
  echo "${RESPONSE}" >&2
  exit 1
fi

if [[ "${INPUT_DRAFT}" == "true" ]]; then
  # A draft is not public and has no git tag, so there is nothing to announce yet.
  set_created false
  echo "Created draft GitHub Release \"${GIT_TAG_NAME}\" 📝"
else
  set_created true
  echo "Created GitHub Release \"${GIT_TAG_NAME}\" 🚀"
fi
