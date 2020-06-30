#!/bin/bash

IMAGE=node
TAG=12.16.1-stretch-slim

docker pull docker.pkg.github.com/porscheui/porsche-design-system/$IMAGE:latest

docker build -f Dockerfile.base -t docker.pkg.github.com/porscheui/porsche-design-system/$IMAGE:$TAG .
docker tag docker.pkg.github.com/porscheui/porsche-design-system/$IMAGE:$TAG docker.pkg.github.com/porscheui/porsche-design-system/$IMAGE:latest

docker push docker.pkg.github.com/porscheui/porsche-design-system/$IMAGE:$TAG
docker push docker.pkg.github.com/porscheui/porsche-design-system/$IMAGE:latest
