FROM golang:1.9-alpine

RUN apk -v --update add \
        python \
        py-pip \
        groff \
        less \
        mailcap \
        bash \
        git \
        && \
    pip install --upgrade awscli==1.11.188 s3cmd==2.0.1 python-magic && \
    apk -v --purge del py-pip && \
    rm /var/cache/apk/*

WORKDIR /go/src/app

ARG resurl
RUN git clone $resurl .

ADD . .

RUN go-wrapper download
RUN go-wrapper install

CMD ["app"]
