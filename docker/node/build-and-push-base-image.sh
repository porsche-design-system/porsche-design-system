#!/bin/bash

IMAGE=node
TAG=14.16.1-stretch-slim-v1

docker pull docker.pkg.github.com/porscheui/porsche-design-system/$IMAGE:latest

docker build -t docker.pkg.github.com/porscheui/porsche-design-system/$IMAGE:$TAG .

docker push docker.pkg.github.com/porscheui/porsche-design-system/$IMAGE:$TAG
