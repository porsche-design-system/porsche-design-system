#!/usr/bin/env bash

# DO NOT ADD OTHER TRAPS AFTER SOURCING THIS FILE, BECAUSE IT WOULD OVERRIDE THE CREDENTIAL CLEANUP TRAP

set -o errexit
set -o pipefail

function cleanup {
  local exitCode=$?
  printf "\nCleaning up credentials...\n"
  rm "${HOME}/.npmrc"
  exit ${exitCode}
}
trap cleanup EXIT

if [[ -z "${ARTIFACTORY_TOKEN}" ]]; then
  (>&2 printf "Please provide the ARTIFACTORY_TOKEN environment variable.\n")
  exit 1
fi

printf "\nSetting up NPM credentials...\n"
echo "//porscheui.jfrog.io/porscheui/api/npm/npm/:_authToken=${ARTIFACTORY_TOKEN}" > "${HOME}/.npmrc"
