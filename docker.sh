#!/usr/bin/env bash

set -o errexit
set -o pipefail

SCRIPT_DIR="$(cd `dirname ${0}` && pwd)"

export RUN_UID="$(id -u)"
export RUN_GID="$(id -g)"
export COMPOSE_PROJECT_NAME="porsche-ui-kit-v0"

SERVICE=ui-kit
if [[ "run-deploy" == "${1}" ]]; then
  SERVICE=ui-kit-deploy
fi

docker-compose -f "${SCRIPT_DIR}/docker-compose.yml" build
docker-compose -f "${SCRIPT_DIR}/docker-compose.yml" run --rm change-volume-owner
docker-compose -f "${SCRIPT_DIR}/docker-compose.yml" run --service-ports --rm "${SERVICE}" "${1}"
