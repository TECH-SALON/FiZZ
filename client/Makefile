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
	make jsad ARG=${ARG}
yarn-remove:
	make jsrm ARG=${ARG}
js-bash:
	make jssh
js-test:
	make jest
