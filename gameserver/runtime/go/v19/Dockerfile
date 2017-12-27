FROM golang:1.9-alpine

RUN apk --update add git bash && rm /var/cache/apk/*
WORKDIR /go/src/app

ADD . .
EXPOSE 8080
