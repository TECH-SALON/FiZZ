FROM node:9.3-alpine

RUN apk --update add bash git && rm /var/cache/apk/*
RUN mkdir /app
WORKDIR /app

ADD . .
