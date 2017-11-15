# FiZZ

# Development

## Getting start
RUN `$ make init`

It stands docker container below
 - go
 - webpack
 - data
 - aws-sam-local

`$GOPATH` is `/go` and working directory is `./gameserver:/go/src/app`
It means go builds application as 'app' in `/go/src/app` (equals `./gameserver`)

## Makefile

- **Run Command:** `$ make run ARG="[container name] [command]"`

### Go

- **Start Application (builds and executes app)** `$ make goun`
- **Go Build** `$ make gold`
- **Go GET** `$ make goet ARG="[package url]"`
- **Execute bash in go container.** `$ make gosh`

When you failed to build app in go container using `make gold` or something, the container seems to remain. Maybe you should not use these commands. I recommend to use `make gosh` to build app instead (enter container by this command and run go build there).

### Webpack (Javascript)

- **Yarn install** `$ make jsrn`
- **Yarn add, remove** `$ make jsad`, `$ make jsrm`
  - ex) `$ make jsad ARG="[packages...] [options...]"`
  - If you want to install package as devdependencies, you use option `-D` or `--dev` like `make jsad ARG="[packages name..] --dev"`
- **Enter JS(webpack) container. (execute bash in webpack container)** `$ make jssh`

# Deployment
