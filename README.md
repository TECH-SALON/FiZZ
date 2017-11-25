# FiZZ

[![wercker status](https://app.wercker.com/status/dd5435b485b8d5e17a6bbbc6e098a3a2/s/master "wercker status")](https://app.wercker.com/project/byKey/dd5435b485b8d5e17a6bbbc6e098a3a2)

# API Document

See this: https://github.com/TECH-SALON/FiZZ/wiki/API

# Development

## Getting start

1. RUN `$ make init`
2. Install AWS CLI `pip install awscli` (**Mac or Linux**)
3. Configure Accesskey `aws configure`
4. RUN `$ make db`

It stands docker containers below
 - go  `localhost:5000`
 - webpack `localhost:8080`
 - data
 - sam `localhost:3000`
 - db  `localhost:8000/shell`

`$GOPATH` is `/go` and working directory is `./gameserver:/go/src/app`
It means go builds application as 'app' in `/go/src/app` (mounted host directory `./gameserver`)pment

----

See More: https://github.com/TECH-SALON/FiZZ/wiki/Development

## Tips

See this: https://github.com/TECH-SALON/FiZZ/wiki/Tips

# Deployment
