docker login -u "$DOCKER_ID" -p "$DOCKER_PASSWORD"

docker tag api:latest randommargin/dockerhub:api
docker tag client:latest randommargin/dockerhub:client

docker push randommargin/dockerhub:api
docker push randommargin/dockerhub:client