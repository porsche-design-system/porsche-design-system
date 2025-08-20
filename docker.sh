#!/usr/bin/env bash

set -o errexit
set -o pipefail

SCRIPT_DIR="$(cd `dirname ${0}` && pwd)"
RUN_UID="$(id -u)"
RUN_GID="$(id -g)"
COMPOSE_PROJECT_NAME="porsche-design-system"
DOCKER_DEFAULT_PLATFORM="linux/amd64"

export RUN_UID
export RUN_GID
export COMPOSE_PROJECT_NAME
export DOCKER_DEFAULT_PLATFORM

docker compose -f "${SCRIPT_DIR}/docker-compose.yml" run --rm change-volume-owner
docker compose -f "${SCRIPT_DIR}/docker-compose.yml" run --service-ports --rm design-system "${@}"
