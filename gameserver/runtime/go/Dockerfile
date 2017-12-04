FROM golang:1.9-alpine

RUN apk -v --update add \
        python \
        py-pip \
        groff \
        less \
        mailcap \
        && \
    pip install --upgrade awscli==1.11.188 s3cmd==2.0.1 python-magic && \
    apk -v --purge del py-pip && \
    rm /var/cache/apk/*

VOLUME /root/.aws
WORKDIR /go/src/app

ARG gamefile
ARG s3file

COPY server.go .
COPY ${gamefile} .
# RUN aws s3 cp ${s3file} .

RUN go-wrapper download
RUN go-wrapper install

CMD["app"]
