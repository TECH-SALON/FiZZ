FROM golang:alpine

RUN apk --update add git bash vim

WORKDIR /go/src/app

RUN go get -u github.com/golang/dep/cmd/dep
RUN dep ensure
