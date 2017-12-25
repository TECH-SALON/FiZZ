FROM golang:1.9-alpine

RUN apk -v --update add git bash curl && rm /var/cache/apk/*
WORKDIR /go/src/app

ADD . .
EXPOSE 8080
