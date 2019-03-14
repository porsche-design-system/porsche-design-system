#!/bin/bash

set -e
set -o pipefail

main() {
  echo "foo bar 2"
  jq --raw-output . "$GITHUB_EVENT_PATH"
  echo "hello world 2"
}

main
