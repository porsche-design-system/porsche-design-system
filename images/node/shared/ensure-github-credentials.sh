#!/usr/bin/env bash

# DO NOT ADD OTHER TRAPS AFTER SOURCING THIS FILE, BECAUSE IT WOULD OVERRIDE THE CREDENTIAL CLEANUP TRAP

set -o errexit
set -o pipefail

if [[ -z "${GIT_DEPLOY_KEY}" ]]; then
  echo "Please provide the \$GIT_DEPLOY_KEY environment variable."
  exit 1
fi

cleanup_credentials() {
  local exit_code=$?
  echo "cleanup_credentials $(date)"
  echo "Cleaning up credentials"
  rm "/root/.ssh/id_rsa"
  exit ${exit_code}
}

setup_credentials() {
  echo "setup_credentials $(date)"
  echo "Setting up Git deploy key credentials"
  mkdir -p "/root/.ssh"
  ssh-keyscan -t rsa github.com > "/root/.ssh/known_hosts"
  printf -- "${GIT_DEPLOY_KEY}\n" > "/root/.ssh/id_rsa"
  chmod 600 "/root/.ssh/id_rsa"
}

trap cleanup_credentials EXIT
setup_credentials
