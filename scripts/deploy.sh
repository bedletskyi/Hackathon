#!/bin/bash

echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_ID" --password-stdin

docker tag api:latest randommargin/dockerhub:api
docker tag client:latest randommargin/dockerhub:client

docker push randommargin/dockerhub:api
docker push randommargin/dockerhub:client