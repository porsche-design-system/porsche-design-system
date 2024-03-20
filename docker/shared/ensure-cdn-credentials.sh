#!/usr/bin/env bash

# DO NOT ADD OTHER TRAPS AFTER SOURCING THIS FILE, BECAUSE IT WOULD OVERRIDE THE CREDENTIAL CLEANUP TRAP

set -o errexit
set -o pipefail

if [[ -z "${CDN_SSH_KEY}" ]]; then
  echo "Please provide the \$CDN_SSH_KEY environment variable."
  exit 1
fi

cleanup_cdn_credentials() {
  local exit_code=$?
  echo "task: [$(date)] \"cleanup_cdn_credentials\""
  rm "/root/.ssh/id_rsa"
  exit ${exit_code}
}

setup_cdn_credentials() {
  echo "task: [$(date)] \"setup_cdn_credentials\""
  mkdir -p "/root/.ssh"
  printf -- "${CDN_SSH_KEY}\n" > "/root/.ssh/id_rsa"
  chmod 600 "/root/.ssh/id_rsa"
}

trap cleanup_cdn_credentials EXIT
setup_cdn_credentials
