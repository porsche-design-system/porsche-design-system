#!/usr/bin/env bash

# DO NOT ADD OTHER TRAPS AFTER SOURCING THIS FILE, BECAUSE IT WOULD OVERRIDE THE CREDENTIAL CLEANUP TRAP

set -o errexit
set -o pipefail

if [[ -z "${PORSCHE_NPM_REGISTRY_TOKEN}" ]]; then
  echo "Please provide the \$PORSCHE_NPM_REGISTRY_TOKEN environment variable."
  exit 1
fi

cleanup_credentials() {
  local exit_code=$?
  echo "Cleaning up credentials"
  rm "${HOME}/.npmrc"
  exit ${exit_code}
}

setup_credentials() {
  echo "Setting up npm credentials"
  echo "//porscheui.jfrog.io/porscheui/api/npm/npm/:_authToken=${PORSCHE_NPM_REGISTRY_TOKEN}" > "${HOME}/.npmrc"
}

trap cleanup_credentials EXIT
setup_credentials
