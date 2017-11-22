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
