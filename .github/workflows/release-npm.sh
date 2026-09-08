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
  # tagged with "latest"
  npm publish --access public --provenance "${PACKAGE_LOCATION}"
fi

echo "Version \"${PACKAGE_VERSION}\" of \"${PACKAGE_NAME}\" published 🎉"
