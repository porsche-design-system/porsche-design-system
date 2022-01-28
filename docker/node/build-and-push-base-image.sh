#!/bin/bash

REGISTRY=ghcr.io/porscheui/porsche-design-system
IMAGE=node
TAG=14.18.3-stretch-slim

docker pull $REGISTRY/$IMAGE:latest

docker build -t $REGISTRY/$IMAGE:$TAG -t $REGISTRY/$IMAGE:latest .

docker push $REGISTRY/$IMAGE:$TAG
docker push $REGISTRY/$IMAGE:latest
