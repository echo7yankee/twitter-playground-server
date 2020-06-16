# Docker setup oup-common-front

Some useful instructions from Toni Sanchez.

## Dockerfile

    FROM node:10-jessie
    RUN npm install -g foreman
    WORKDIR /ngs/oup-common-front
    COPY ./oup-common-front/package.json .
    RUN npm install --quiet
    WORKDIR /ngs/oup-common-front/lambda
    COPY ./oup-common-front/lambda/package.json .
    RUN npm install --quiet
    COPY . /ngs
    WORKDIR /ngs
    EXPOSE 7070
    ENTRYPOINT ["nf", "start"]

## docker-compose.yml

    version: '2'
    ​
    services:
      redis:
        image: redis
      front:
        build: .
        depends_on:
          - redis
        ports:
          - "7700:7700"
          - "7800:7800"
          - "3035:3035"
        volumes:
          - .:/ngs
          - ./oup-common-front/node_modules:/ngs/oup-common-front/node_modules
          - ./oup-common-front/lambda/node_modules:/ngs/oup-common-front/lambda/node_modules

Note local paths:

          client: WEBPACK_DEV_SERVER_HOST=0.0.0.0 npm run dev --prefix oup-common-front
lambda: REDIS_CACHE_CLUSTER_ENDPOINT=redis REDIS_CACHE_READ_ENDPOINT_1=redis REDIS_CACHE_READ_ENDPOINT_2=redis npm run dev --prefix oup-common-front/lambda

Shortcuts/aliases for docker-compose:

    alias dc='docker-compose'
    alias dcr='docker-compose run --rm'
    alias dcrs='docker-compose run --rm --service-ports'
    alias dcre='docker-compose run --rm --entrypoint'

## Install

To install all the modules once the container is built:

    dcre npm front install --prefix oup-common-front
    dcre npm front install --prefix oup-common-front/lambda
