# 20.5.0 node
ARG NODE_VERSION="latest"

ARG APP_NAME="star-nearby-offers-worker"
ARG APP_ENV="development"
ARG TZ="Asia/Dhaka"

ARG MAINTAINER="Sayed Yeamin Arafat <sayed.yeamin@brainstation-23.com>"

FROM node:${NODE_VERSION}

LABEL maintainer = ${MAINTAINER}

# Apt install, openssl setup
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y openssl nano curl && \
    apt-get autoremove -y && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

WORKDIR /usr/src/app

COPY package.json .

ARG NODE_ENV

RUN if [ "$NODE_ENV" = "development" ]; \
        then npm install; \
        else npm install --only production; \
    fi

COPY . .

ENV PORT 3201
EXPOSE $PORT

