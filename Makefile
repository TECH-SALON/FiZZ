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

# initialize-db:
# 	./sam/fizz-aws create_local
# 	./sam/fizz-aws seed_local

# recreate-db:
# 	./sam/fizz-aws drop_local
# 	./sam/fizz-aws create_local
# 	./sam/fizz-aws seed_local


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

sam:
	'sam-help'
	'sam-validate'
	'sam-local--generate-event'
	'sam-lcoal-invoke'
	'sam-test'

sam-help:
	$(SAM)

sam-validate:
	$(SAM) validate

# sam-local-generate-event:
# 	$(SAM) local generate-event api > ./sam/test/events/event.json

# sam-local-invoke:
# 	$(SAM) local invoke -e ./test/events/event.json --docker-volume-basedir "test"

# sam-test:
# 	$(SAM) local invoke ${FN} -e ./test/events/${EV} --docker-volume-basedir "."

sam-local-start-api:
	$(SAM) local start-api --docker-volume-basedir "." --host 0.0.0.0

db-list:
	aws dynamodb list-tables --endpoint-url http://localhost:8000

# sam-test-bot:
# 	make sam-test EV="bots.json" FN="Bots"

sam-bash:
	docker-compose run --rm --entrypoint bash sam

TEMP = "template.yml"
S3 = "fizz-sam-development"

sam-package:
	$(SAM) package --template-file ${TEMP} --s3-bucket ${S3} --output-template-file packaged.yml

sam-host:
	sam local start-api -p 3001 --env-vars ./sam/sam-local/env.json
