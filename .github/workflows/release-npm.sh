#!/usr/bin/env bash

set -o errexit
set -o pipefail

PACKAGE_LOCATION="${1}"
PACKAGE_JSON="${PACKAGE_LOCATION}/package.json"
PACKAGE_NAME=$(grep name "${PACKAGE_JSON}" | head -1 | awk -F= "{ print ${2} }" | sed 's/[:,\",]//g;s/name//' | tr -d '[[:space:]]')
PACKAGE_VERSION=$(grep version "${PACKAGE_JSON}" | head -1 | awk -F= "{ print ${2} }" | sed 's/[:,\",]//g;s/version//' | tr -d '[[:space:]]')
GIT_TAG_NAME="${PACKAGE_NAME:23}-v${PACKAGE_VERSION}"
# extract tag from version, but have fallback if it can't be extracted for stable release or assets package
# https://stackoverflow.com/questions/6550484/prevent-grep-returning-an-error-when-input-doesnt-match
NPM_TAG_NAME=$(echo ${PACKAGE_VERSION} | { grep -Eo '(rc|beta|alpha)' || test $? = 1; })

publish_npmjs() {
  echo "task: [$(date)] \"publish_npmjs\" (${PACKAGE_LOCATION})"

  if [[ ${NPM_TAG_NAME} ]]; then
    result=$(yarn publish --tag ${NPM_TAG_NAME} --non-interactive --registry=https://registry.npmjs.org/ --access public "${PACKAGE_LOCATION}")
  else
    # tagged with "latest"
    result=$(yarn publish --non-interactive --registry=https://registry.npmjs.org/ --access public "${PACKAGE_LOCATION}")
  fi

  if [[ ${result} == *"Done"* ]]; then
    return 0 # true
  else
    return 1 # false
  fi
}

add_git_tag() {
  echo "task: [$(date)] \"add_git_tag\" ${GIT_TAG_NAME}, ${GITHUB_SHA}"
  curl -s -X POST "https://api.github.com/repos/porsche-design-system/porsche-design-system/git/refs" \
    -H "Authorization: token ${GITHUB_TOKEN}" \
    -d @- <<EOF
{
  "ref": "refs/tags/${GIT_TAG_NAME}",
  "sha": "${GITHUB_SHA}"
}
EOF
}

if publish_npmjs; then
  add_git_tag
  echo "Version \"${PACKAGE_VERSION}\" of \"${PACKAGE_NAME}\" published 🎉"
else
  echo "Publishing version \"${PACKAGE_VERSION}\" of \"${PACKAGE_NAME}\" failed 😢"
  exit 1
fi
