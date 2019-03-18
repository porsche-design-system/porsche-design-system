#!/usr/bin/env bash

set -o errexit
set -o pipefail

RED='\033[0;31m'
NC='\033[0m' # No Color

SCRIPT_DIR="$(cd `dirname ${0}` && pwd)"

if ! [ -x "$(command -v local-env-creator)" ]; then
  (>&2 printf "${RED}'local-env-creator' binary not found, please install it via:${NC}\n")
  (>&2 printf "${RED}npm i -g @myporsche/myservices-local-env-creator --registry https://porschedev.jfrog.io/porschedev/api/npm/public-npm/${NC}\n")
  exit 1;
fi

local-env-creator

export RUN_UID="$(id -u)"
export RUN_GID="$(id -g)"
export COMPOSE_PROJECT_NAME="porsche-ui-kit"

docker-compose -f "${SCRIPT_DIR}/docker-compose.yml" run --rm change-volume-owner

docker-compose -f "${SCRIPT_DIR}/docker-compose.yml" build
docker-compose -f "${SCRIPT_DIR}/docker-compose.yml" run --service-ports --rm ui-kit ${1}
