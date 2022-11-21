#!/bin/bash

REGISTRY=ghcr.io/porsche-design-system/porsche-design-system
IMAGE=node
TAG=18.10.0-stretch-slim

docker pull $REGISTRY/$IMAGE:latest

docker build -f Dockerfile-node -t $REGISTRY/$IMAGE:$TAG -t $REGISTRY/$IMAGE:latest .

docker push $REGISTRY/$IMAGE:$TAG
docker push $REGISTRY/$IMAGE:latest
