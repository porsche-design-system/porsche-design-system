#!/usr/bin/env bash

# DO NOT ADD OTHER TRAPS AFTER SOURCING THIS FILE, BECAUSE IT WOULD OVERRIDE THE CREDENTIAL CLEANUP TRAP

set -o errexit
set -o pipefail

if [[ -z "${BROWSERSTACK_USER_NAME}" ]]; then
  echo "Please provide the \$BROWSERSTACK_USER_NAME environment variable."
  exit 1
fi

if [[ -z "${BROWSERSTACK_ACCESS_KEY}" ]]; then
  echo "Please provide the \$BROWSERSTACK_ACCESS_KEY environment variable."
  exit 1
fi

cleanup_credentials() {
  local exit_code=$?
  echo "task: [$(date)] \"cleanup_credentials\""
  rm "${HOME}/packages/ui-kit-js/.env"
  exit ${exit_code}
}

setup_credentials() {
  echo "task: [$(date)] \"setup_credentials\""
  echo "BROWSERSTACK_USER_NAME=${BROWSERSTACK_USER_NAME}" > "${HOME}/packages/ui-kit-js/.env"
  echo "BROWSERSTACK_ACCESS_KEY=${BROWSERSTACK_ACCESS_KEY}" > "${HOME}/packages/ui-kit-js/.env"
}

trap cleanup_credentials EXIT
setup_credentials
