#!/bin/bash

REGISTRY=ghcr.io/porscheui/porsche-design-system
IMAGE=node
TAG=16.14.0-stretch-slim

docker pull $REGISTRY/$IMAGE:latest

docker build -t $REGISTRY/$IMAGE:$TAG -t $REGISTRY/$IMAGE:latest .

docker push $REGISTRY/$IMAGE:$TAG
docker push $REGISTRY/$IMAGE:latest
