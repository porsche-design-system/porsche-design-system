#!/usr/bin/env bash

# DO NOT ADD OTHER TRAPS AFTER SOURCING THIS FILE, BECAUSE IT WOULD OVERRIDE THE CREDENTIAL CLEANUP TRAP

set -o errexit
set -o pipefail

if [[ -z "${NPMJS_REGISTRY_TOKEN}" ]]; then
  echo "Please provide the \$NPMJS_REGISTRY_TOKEN environment variable. Have a look at README for more information."
  exit 1
fi

cleanup_credentials() {
  local exit_code=$?
  echo "task: [$(date)] \"cleanup_credentials\""
  rm "${HOME}/.npmrc"
  exit $exit_code
}

setup_credentials() {
  echo "task: [$(date)] \"setup_credentials\""
  echo "//registry.npmjs.org/:_authToken=${NPMJS_REGISTRY_TOKEN}" > "${HOME}/.npmrc"
}

trap cleanup_credentials EXIT
setup_credentials
