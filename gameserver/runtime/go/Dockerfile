FROM golang:1.9-alpine

RUN apk -v --update add \
        python \
        py-pip \
        groff \
        less \
        mailcap \
        bash \
        && \
    pip install --upgrade awscli==1.11.188 s3cmd==2.0.1 python-magic && \
    apk -v --purge del py-pip && \
    rm /var/cache/apk/*

VOLUME /root/.aws
WORKDIR /go/src/app

ARG botdir
ARG s3file

COPY server.go .
COPY ${botdir} .

RUN go-wrapper download
RUN go-wrapper install

CMD["app"]
