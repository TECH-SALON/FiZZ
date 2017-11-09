init:
	docker-compose build
	docker-compose run --rm webpack yarn install
	docker-compose up -d
run:
	docker-compose run --rm ${ARG}
restart:
	docker-compose stop && docker-compose start
up:
	docker-compose up -d

GO = docker-compose run --rm go

gopp:
	$(GO) ./app
goun:
	$(GO) go build && ./app
gold:
	$(GO) go build
gosh:
	$(GO) bash
goet:
	$(GO) go get ${ARG}
goom:
	docker-compose run --rm -d go go build && ./app


JS = docker-compose run --rm webpack

jsrn:
	$(JS) yarn install
jsad:
	$(JS) yarn add ${ARG}
jsrm:
	$(JS) yarn remove ${ARG}
