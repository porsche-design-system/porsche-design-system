#!/bin/bash

REGISTRY=ghcr.io/porsche-design-system/porsche-design-system
IMAGE=playwright
TAG=v1.32.3-focal-v3

docker pull $REGISTRY/$IMAGE:latest

# multiplatform universal image
# https://dev.to/docker/choosing-the-right-docker-image-for-your-apple-m1-pro-440l
docker buildx build -f Dockerfile-playwright --platform linux/amd64,linux/arm64 --push -t $REGISTRY/$IMAGE:$TAG-universal .

# default image
docker build -f Dockerfile-playwright -t $REGISTRY/$IMAGE:$TAG -t $REGISTRY/$IMAGE:latest .
docker push $REGISTRY/$IMAGE:$TAG
docker push $REGISTRY/$IMAGE:latest
