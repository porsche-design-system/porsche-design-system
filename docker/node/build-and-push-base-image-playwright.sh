#!/bin/bash

REGISTRY=ghcr.io/porsche-design-system/porsche-design-system
IMAGE=playwright
TAG=v1.40.1-focal

docker pull $REGISTRY/$IMAGE:latest

docker build -f Dockerfile-playwright -t $REGISTRY/$IMAGE:$TAG -t $REGISTRY/$IMAGE:latest .

docker push $REGISTRY/$IMAGE:$TAG
docker push $REGISTRY/$IMAGE:latest
