#!/usr/bin/env bash

set -o errexit
set -o nounset
set -o pipefail

PACKAGE_LOCATION="${1:?package location required}"
PACKAGE_JSON="${PACKAGE_LOCATION}/package.json"

PACKAGE_NAME=$(node -p "require('./${PACKAGE_JSON}').name")
PACKAGE_VERSION=$(node -p "require('./${PACKAGE_JSON}').version")
# extract npm dist-tag from version (rc/beta/alpha); empty for stable releases
# https://stackoverflow.com/questions/6550484/prevent-grep-returning-an-error-when-input-doesnt-match
NPM_TAG_NAME=$(echo "${PACKAGE_VERSION}" | { grep -Eo '(rc|beta|alpha)' || test $? = 1; })

echo "task: [$(date)] \"publish_npmjs\" (${PACKAGE_LOCATION})"

if [[ -n "${NPM_TAG_NAME}" ]]; then
  npm publish --tag "${NPM_TAG_NAME}" --access public --provenance "${PACKAGE_LOCATION}"
else
  # A stable release must neither fail npm's implicit-latest check nor move a dist-tag
  # backwards: `latest` stays on the newest release, `latest-v<major>` on the newest one
  # of its major. An older release than both is still installable by exact version.
  MAJOR_TAG_NAME=$(node -p 'require("semver").major(process.argv[1]).toString()' "${PACKAGE_VERSION}")
  MAJOR_TAG_NAME="latest-v${MAJOR_TAG_NAME}"
  LATEST_VERSION=$(npm view "${PACKAGE_NAME}" dist-tags.latest)
  # Empty when the major has no maintenance tag yet.
  MAJOR_TAG_VERSION=$(npm view "${PACKAGE_NAME}" "dist-tags.${MAJOR_TAG_NAME}")
  NPM_TAG_NAME=$(node -p '
    const semver = require("semver");
    const [version, latest, majorTag, majorTagVersion] = process.argv.slice(1);
    if (!semver.valid(latest)) throw new Error("Missing or invalid npm latest version");
    if (majorTagVersion && !semver.valid(majorTagVersion)) throw new Error(`Invalid npm ${majorTag} version`);
    if (semver.gte(version, latest)) "latest";
    else if (!majorTagVersion || semver.gt(version, majorTagVersion)) majorTag;
    // Superseded within its own major: publish without moving any dist-tag.
    else "";
  ' "${PACKAGE_VERSION}" "${LATEST_VERSION}" "${MAJOR_TAG_NAME}" "${MAJOR_TAG_VERSION}")

  if [[ -n "${NPM_TAG_NAME}" ]]; then
    npm publish --tag "${NPM_TAG_NAME}" --access public --provenance "${PACKAGE_LOCATION}"
  else
    # `npm publish` always assigns a dist-tag, so publish to a throwaway one and remove it.
    SCRATCH_TAG_NAME="superseded-v${PACKAGE_VERSION}"
    npm publish --tag "${SCRATCH_TAG_NAME}" --access public --provenance "${PACKAGE_LOCATION}"
    npm dist-tag rm "${PACKAGE_NAME}" "${SCRATCH_TAG_NAME}"
  fi
fi

echo "Version \"${PACKAGE_VERSION}\" of \"${PACKAGE_NAME}\" published 🎉"
