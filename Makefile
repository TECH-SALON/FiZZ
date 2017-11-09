init:
	docker-compose build
	docker-compose run --rm webpack yarn install
	docker-compose up -d
run:
	docker-compose run --rm ${ARG}

GO = docker-compose run --rm go

goun:
	$(GO) go build && /go/src/app
gold:
	$(GO) go build
gosh:
	$(GO) bash
goet:
	$(GO) go get ${ARG}

JS = docker-compose run --rm webpack

jsrn:
	$(JS) yarn install
jsad:
	$(JS) yarn add ${ARG}
jsrm:
	$(JS) yarn remove ${ARG}
