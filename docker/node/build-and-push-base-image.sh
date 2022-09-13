#!/bin/bash

REGISTRY=ghcr.io/porscheui/porsche-design-system
IMAGE=playwright
TAG=v1.25.1-focal

docker pull $REGISTRY/$IMAGE:latest

docker build -t $REGISTRY/$IMAGE:$TAG -t $REGISTRY/$IMAGE:latest .

docker push $REGISTRY/$IMAGE:$TAG
docker push $REGISTRY/$IMAGE:latest
