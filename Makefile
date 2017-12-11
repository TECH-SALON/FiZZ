init:
	cp .env.dev.sample .env.dev
	docker-compose build
	docker-compose run --rm webpack yarn install
	docker-compose up -d
run:
	docker-compose run --rm ${ARG}
restart:
	docker-compose restart ${C}
start-again:
	docker-compose stop && docker-compose start
up:
	docker-compose up -d
ps:
	docker-compose ps ${ARG}
down:
	docker-compose down
start:
	docker-compose start
logs:
	docker-compose logs

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

TEMP = "lambda/template.yml"

sam-validate:
	$(SAM) validate -t ${TEMP}

FN=bots
EV=event
AC=Bots

S3 = "fizz-sam-development"

sam-local-generate-event:
	$(SAM) local generate-event api > ./sam/lambda/functions/${FN}/event.json

sam-local-invoke:
	docker-compose run --rm sam local invoke ${AC} -t ${TEMP} -e ./lambda/functions/${FN}/${EV}.json --docker-volume-basedir "${PWD}/sam/lambda" --log-file lambda/log/invoke.log

sam-local-start-api:
	docker-compose run --rm -p 3001:3000 sam local start-api -t ${TEMP} --docker-volume-basedir "${PWD}/sam/lambda" --host 0.0.0.0

sam-log:
	docker-compose logs sam

db-list:
	aws dynamodb list-tables --endpoint-url http://localhost:8000

sam-bash:
	docker-compose run --rm --entrypoint bash sam

sam-package:
	cd sam/lambda && \
	make package TEMPLATE=${TEMPLATE} && \
	cd ../..

sam-bundle:
	cd sam/lambda && \
	make bundle && \
	cd ../../

sam-deploy:
	cd sam/lambda && \
	make deploy && \
	cd ../..

sam-release:
	@make sam-bundle 
	@make sam-package TEMPLATE=deploy.yml
	@make sam-deploy

db-init:
	cd sam && \
	./fizz-aws create_local && \
	./fizz-aws list_local && \
	./fizz-aws seed_local && \
	cd .. && \
	make sam-bundle

db-recreate:
	cd sam && ./fizz-aws drop_local && \
	./fizz-aws create_local && \
	./fizz-aws list_local && \
	./fizz-aws seed_local && \
	cd ..

swagger:
	docker run -d -p 8001:8080 --name swagger swaggerapi/swagger-editor
