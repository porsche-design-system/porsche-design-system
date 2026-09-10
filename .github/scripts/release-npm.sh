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
  # Maintenance releases must neither fail npm's implicit-latest check nor move
  # consumers of `latest` back from a newer major/minor.
  LATEST_VERSION=$(npm view "${PACKAGE_NAME}" dist-tags.latest)
  NPM_TAG_NAME=$(node -p '
    const semver = require("semver");
    const [version, latest] = process.argv.slice(1);
    if (!semver.valid(latest)) throw new Error("Missing or invalid npm latest version");
    semver.lt(version, latest) ? `latest-v${semver.major(version)}` : "latest";
  ' "${PACKAGE_VERSION}" "${LATEST_VERSION}")
  npm publish --tag "${NPM_TAG_NAME}" --access public --provenance "${PACKAGE_LOCATION}"
fi

echo "Version \"${PACKAGE_VERSION}\" of \"${PACKAGE_NAME}\" published 🎉"
