# FiZZ

[![wercker status](https://app.wercker.com/status/dd5435b485b8d5e17a6bbbc6e098a3a2/s/master "wercker status")](https://app.wercker.com/project/byKey/dd5435b485b8d5e17a6bbbc6e098a3a2)

# Development

## Getting start
RUN `$ make init`

It stands docker containers below
 - go
 - webpack
 - data
 - sam
 - db

`$GOPATH` is `/go` and working directory is `./gameserver:/go/src/app`
It means go builds application as 'app' in `/go/src/app` (mounted host directory `./gameserver`)

## Makefile

- **Run Command:** `$ make run ARG="[container name] [command]"`
- **Operate Docker Compose**
  - `make restart`
  - `make up`: docker-compose up -d
  - `make ps [ARG]`: docker-compose ps
  - `make down`
  - `make start`

### Go

- **Start Application (executes app)** `$ make go-app`
- **Go Build** `$ make go-build`
- **Go GET** `$ make go-get ARG="[package url]"`
- **Execute bash in go container.** `$ make go-bash`

When you failed to build app in go container using `make gold` or something, the container seems to remain. Maybe you should not use these commands. I recommend to use `make gosh` to build app instead (enter container by this command and run go build there).

### Webpack (Javascript)

- **Yarn install** `$ make yarn-install`
- **Yarn add, remove** `$ make yarn-add`, `$ make yarn-remove`
  - ex) `$ make yarn-add ARG="[packages...] [options...]"`
  - If you want to install package as devdependencies, you use option `-D` or `--dev` like `make yarn-add ARG="[packages name..] --dev"`
- **Enter JS(webpack) container. (execute bash in webpack container)** `$ make js-bash`
- **Run Test** `$ make js-test`

## Tips

### Docker Error

#### `No left spaces on devices.`

- remove unnecessary containers.
- resize qemu-img
  - but this solution is controvesial.
  - https://forums.docker.com/t/no-space-left-on-device-error/10894/17


# Deployment
