# FiZZ

# Development

RUN `$ make init`

It stands docker container below
 - go
 - webpack
 - data
 - aws-sam-local

`$GOPATH` is `/go` and working directory is `./gameserver:/go/src/app`
It means go builds application as 'app' in `/go/src/app` (equals `./gameserver`)

## Makefile

**Run Command:** `$ make run ARG="[container name] [command]"`

### Go

**Start Application (builds and executes app)** `$ make goun`
**Go Build** `$ make gold`
**Go GET** `$ make goet ARG="[package url]"`
**Execute bash in go container.** `$ make gosh`

# Deployment
