#!/usr/bin/env bash

# Creates a GitHub Release "v${INPUT_VERSION}" in ${INPUT_REPOSITORY} via the
# GitHub REST API. The release POST also creates the underlying git tag at
# ${INPUT_SHA} via the "tag_name" + "target_commitish" fields, so no separate
# tag-creation step is required.
#
# Only stable versions (no -rc/-beta/-alpha suffix) produce a release. The
# body is built by merging the changelog section for the stable version with
# all directly preceding pre-release sections of the same base version (so
# e.g. 4.0.0 includes 4.0.0-rc.2, 4.0.0-rc.1, ...).
#
# Idempotent: if a release for the tag already exists, the script exits 0.

set -o errexit
set -o nounset
set -o pipefail

: "${INPUT_VERSION:?version input is required}"
: "${INPUT_SHA:?sha input is required}"
: "${INPUT_REPOSITORY:?repository input is required}"
: "${INPUT_CHANGELOG_PATH:?changelog-path input is required}"
: "${GITHUB_TOKEN:?github-token input is required}"

GIT_TAG_NAME="v${INPUT_VERSION}"

if [[ "${INPUT_VERSION}" =~ -(rc|beta|alpha) ]]; then
  echo "Skipping GitHub Release for pre-release version \"${INPUT_VERSION}\"."
  exit 0
fi

if [[ ! -f "${INPUT_CHANGELOG_PATH}" ]]; then
  echo "Changelog file not found at \"${INPUT_CHANGELOG_PATH}\"." >&2
  exit 1
fi

echo "task: [$(date)] \"create_github_release\" ${GIT_TAG_NAME} -> ${INPUT_SHA} (${INPUT_REPOSITORY})"

# Idempotency: bail out if a release for this tag already exists.
EXISTING_STATUS=$(curl -sS -o /dev/null -w '%{http_code}' \
  -H "Authorization: Bearer ${GITHUB_TOKEN}" \
  -H "Accept: application/vnd.github+json" \
  -H "X-GitHub-Api-Version: 2026-03-10" \
  "https://api.github.com/repos/${INPUT_REPOSITORY}/releases/tags/${GIT_TAG_NAME}")

if [[ "${EXISTING_STATUS}" == "200" ]]; then
  echo "GitHub Release \"${GIT_TAG_NAME}\" already exists – nothing to do."
  exit 0
fi

# Extract release body: starts at the heading "## [${INPUT_VERSION}]" and
# continues through any subsequent pre-release headings of the same base
# version (e.g. "## [4.0.0-rc.2]"); stops at the next stable heading or EOF.
# Sections under "### Heading" (e.g. "### Added", "### Changed", "### Fixed")
# from the stable version and all related pre-releases are merged so that each
# heading appears only once in the resulting release body, with their items
# concatenated in chronological (file) order.
RELEASE_BODY=$(awk -v version="${INPUT_VERSION}" '
  BEGIN { collecting = 0; section = ""; n = 0 }
  /^## \[/ {
    # Extract the version inside the first "[...]" pair on the heading line.
    line = $0
    sub(/^## \[/, "", line)
    sub(/\].*$/, "", line)
    v = line
    if (collecting == 0) {
      if (v == version) { collecting = 1; section = ""; next }
      next
    }
    # Already collecting: stop at the next stable heading (no -rc/-beta/-alpha).
    if (v !~ /-(rc|beta|alpha)/) { collecting = 0; next }
    # Otherwise it is a related pre-release; keep its content but drop the heading.
    section = ""
    next
  }
  {
    if (collecting != 1) next
    if ($0 ~ /^### /) {
      section = $0
      if (!(section in seen)) {
        seen[section] = 1
        order[n++] = section
      }
      next
    }
    if (section == "") {
      # Content before any "### " heading (rare); bucket under empty key.
      if (!("" in seen)) { seen[""] = 1; order[n++] = "" }
    }
    bucket[section] = bucket[section] $0 ORS
  }
  END {
    for (i = 0; i < n; i++) {
      key = order[i]
      body = bucket[key]
      # Trim leading/trailing blank lines from each bucket.
      sub(/^(\n)+/, "", body)
      sub(/[[:space:]]+$/, "", body)
      if (key != "") print key
      if (body != "") print body
      if (i < n - 1) print ""
    }
  }
' "${INPUT_CHANGELOG_PATH}")

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

# Build JSON payload safely via jq.
PAYLOAD=$(jq -n \
  --arg tag "${GIT_TAG_NAME}" \
  --arg name "${GIT_TAG_NAME}" \
  --arg body "${RELEASE_BODY}" \
  --arg target "${INPUT_SHA}" \
  '{
    tag_name: $tag,
    target_commitish: $target,
    name: $name,
    body: $body,
    draft: false,
    prerelease: false,
    make_latest: "true"
  }')

curl --fail-with-body -sS -X POST \
  -H "Authorization: Bearer ${GITHUB_TOKEN}" \
  -H "Accept: application/vnd.github+json" \
  -H "X-GitHub-Api-Version: 2026-03-10" \
  "https://api.github.com/repos/${INPUT_REPOSITORY}/releases" \
  -d "${PAYLOAD}"

echo "Created GitHub Release \"${GIT_TAG_NAME}\" 🚀"


