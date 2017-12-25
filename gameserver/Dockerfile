FROM golang:alpine

RUN apk --update add git bash vim


ENV FIND_NESTED_VENDOR find vendor -path '*/vendor' -type d
RUN ${FIND_NESTED_VENDOR} | xargs --no-run-if-empty cp -rln -t . && \
    ${FIND_NESTED_VENDOR} | xargs --no-run-if-empty rm -r

WORKDIR /go/src/app
