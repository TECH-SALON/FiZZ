FROM golang:1.9-alpine

RUN apk -v --update add git bash && rm /var/cache/apk/*
WORKDIR /go/src/app

ADD . .
