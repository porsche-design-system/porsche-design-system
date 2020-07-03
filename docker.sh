#!/usr/bin/env bash

set -o errexit
set -o pipefail

SCRIPT_DIR="$(cd `dirname ${0}` && pwd)"

export RUN_UID="$(id -u)"
export RUN_GID="$(id -g)"
export COMPOSE_PROJECT_NAME="porsche-design-system-v1"

SERVICE=design-system
if [[ "run-deploy-storefront" == "${1}" || "run-release-sketch" == "${1}" ]]; then
  SERVICE=design-system-deploy
fi

if [[ "run-deploy-assets" == "${1}" ]]; then
  SERVICE=design-system-deploy-assets
fi

docker-compose -f "${SCRIPT_DIR}/docker-compose.yml" build
docker-compose -f "${SCRIPT_DIR}/docker-compose.yml" run --rm change-volume-owner
docker-compose -f "${SCRIPT_DIR}/docker-compose.yml" run --service-ports --rm "${SERVICE}" "${@}"
