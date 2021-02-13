#!/bin/bash

docker build -f .docker/client.Dockerfile -t client client
docker build -f .docker/server.Dockerfile -t api server