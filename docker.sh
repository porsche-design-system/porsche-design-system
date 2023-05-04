#!/usr/bin/env bash

set -o errexit
set -o pipefail

SCRIPT_DIR="$(cd `dirname ${0}` && pwd)"

export RUN_UID="$(id -u)"
export RUN_GID="$(id -g)"
export COMPOSE_PROJECT_NAME="porsche-design-system-v1"
export DOCKER_DEFAULT_PLATFORM=linux/amd64

docker-compose -f "${SCRIPT_DIR}/docker-compose.yml" run --rm change-volume-owner
docker-compose -f "${SCRIPT_DIR}/docker-compose.yml" run --service-ports --rm design-system "${@}"
