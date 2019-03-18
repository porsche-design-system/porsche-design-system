#!/usr/bin/env bash

set -o errexit
set -o pipefail

RED='\033[0;31m'
NC='\033[0m' # No Color

printf "\nWaiting for application to start...\n"

NODE_WAIT_FOR_APPLICATION_START=$(date +%s);
NODE_WAIT_FOR_APPLICATION_END=$((${NODE_WAIT_FOR_APPLICATION_START} + 600));

function wait() {
  while ! curl -sf "${1}" >/dev/null; do
      sleep 1
      if [ $(date +%s) -gt ${NODE_WAIT_FOR_APPLICATION_END} ]; then
        (>&2 printf "\n${RED}Error: Timeout waiting for application to start.${NC}\n")
        exit 1
      fi
  done
}

wait "http://localhost:3000"
