#!/bin/bash

REGISTRY=ghcr.io/porsche-design-system/porsche-design-system
IMAGE=playwright
TAG=v1.49.1-jammy-test-6

docker pull $REGISTRY/$IMAGE:latest
docker build -f Dockerfile -t $REGISTRY/$IMAGE:$TAG -t $REGISTRY/$IMAGE:latest .
docker push $REGISTRY/$IMAGE:$TAG
docker push $REGISTRY/$IMAGE:latest
