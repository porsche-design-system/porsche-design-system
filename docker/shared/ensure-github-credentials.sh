#!/usr/bin/env bash

# DO NOT ADD OTHER TRAPS AFTER SOURCING THIS FILE, BECAUSE IT WOULD OVERRIDE THE CREDENTIAL CLEANUP TRAP

set -o errexit
set -o pipefail

if [[ -z "${GH_DEPLOY_KEY_PAGES}" ]]; then
  echo "Please provide the \$GH_DEPLOY_KEY_PAGES environment variable."
  exit 1
fi

cleanup_github_credentials() {
  local exit_code=$?
  echo "task: [$(date)] \"cleanup_github_credentials\""
  rm "/root/.ssh/id_rsa"
  exit ${exit_code}
}

setup_github_credentials() {
  echo "task: [$(date)] \"setup_github_credentials\""
  mkdir -p "/root/.ssh"
  ssh-keyscan -t rsa github.com > "/root/.ssh/known_hosts"
  printf -- "${GH_DEPLOY_KEY_PAGES}\n" > "/root/.ssh/id_rsa"
  chmod 600 "/root/.ssh/id_rsa"
}

trap cleanup_github_credentials EXIT
setup_github_credentials
