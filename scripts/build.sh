#!/bin/bash

docker build -f ../.docker/client.Dockerfile -t buckwheat-client ../client
docker build -f ../.docker/server.Dockerfile -t buckwheat-server ../server