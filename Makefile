init:
	docker-compose build
	docker-compose run --rm webpack yarn install
	docker-compose up -d
run:
	docker-compose run --rm ${ARG}

GO = docker-compose run --rum go

goun:
	$(GO) go build && /go/src/app
gold:
	$(GO) go build
gosh:
	$(GO) bash
goet:
	$(GO) go get ${ARG}
