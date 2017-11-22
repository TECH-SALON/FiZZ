init:
	cp .env.dev.sample .env.dev
	docker-compose build
	docker-compose run --rm webpack yarn install
	docker-compose up -d
run:
	docker-compose run --rm ${ARG}
restart:
	docker-compose stop && docker-compose start
up:
	docker-compose up -d
ps:
	docker-compose ps ${ARG}
down:
	docker-compose down
start:
	docker-compose start


GOP = docker-compose run -p 5000:5000 --rm go
GO = docker-compose run --rm go

gopp:
	$(GOP) /go/src/app/app
gold:
	$(GO) go build
gosh:
	$(GOP) bash
goet:
	$(GO) go get ${ARG}
goom:
	docker-compose run -p 5000:5000 --rm -d go go build && /go/src/app/app

go-app:
	make gopp
go-build:
	make gold
go-bash:
	make gosh
go-get:
	make goet ARG=${ARG}
go-run:
	make goom

JS = docker-compose run --rm webpack

jsrn:
	$(JS) yarn install
jsad:
	$(JS) yarn add ${ARG}
jsrm:
	$(JS) yarn remove ${ARG}
jssh:
	$(JS) bash
jest:
	$(JS) yarn test

yarn-install:
	make jsrn
yarn-add:
	$(JS) yarn add ${ARG}
yarn-remove:
	$(JS) yarn remove ${ARG}
js-bash:
	make jssh
js-test:
	make jest


SAM = docker-compose run --rm sam

sam-help:
	$(SAM)

sam-validate:
	$(SAM) validate

sam-local-generate-event:
	$(SAM) local generate-event api > ./sam/event.json

sam-local-invoke: 
	$(SAM) local invoke -e ./event.json --docker-volume-basedir "."

sam-local-start-api:
	$(SAM) local start-api --docker-volume-basedir "." --host 0.0.0.0

db-list:
	aws dynamodb list-tables --endpoint-url http://localhost:8000
