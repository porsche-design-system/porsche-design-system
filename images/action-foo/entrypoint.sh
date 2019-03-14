#!/bin/bash

set -e
set -o pipefail

main() {
  echo "v0.x/core tags:"
  SORTED_V0X_CORE_VERSION_TAGS="$(git tag --sort=-version:refname --list 'v0.*/core')"
  echo ${SORTED_V0X_CORE_VERSION_TAGS}

  echo "foo bar 2"
  jq --raw-output . "$GITHUB_EVENT_PATH"
  echo "hello world 2"
}

main
