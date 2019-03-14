#!/bin/bash

set -e
set -o pipefail

main() {
   jq --raw-output . "$GITHUB_EVENT_PATH"
}

main
