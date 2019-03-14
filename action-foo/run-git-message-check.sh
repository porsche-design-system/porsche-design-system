#!/bin/bash

set -e
set -o pipefail

main() {
  echo "foo bar"
  jq --raw-output . "$GITHUB_EVENT_PATH"
  echo "hello world"
}

main
