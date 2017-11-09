init:
	docker-compose build
	docker-compose run --rm webpack yarn install
	docker-compose up -d
gorun:
	docker-compose run --rm go go build && /go/src/app
