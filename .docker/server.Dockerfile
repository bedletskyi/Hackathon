FROM node:lts-alpine as build

WORKDIR /app
COPY ./package.json /app/package.json

RUN npm install -g nodemon
RUN npm install
RUN npm audit fix

COPY . /app

ENTRYPOINT ["npm", "start"]