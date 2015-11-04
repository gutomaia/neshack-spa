PYTHON_MODULES?=lib

NODE_BIN=./node_modules/.bin
BOWER_BIN = ${NODE_BIN}/bower
BOWER_INSTALLER_BIN = ${NODE_BIN}/bower-installer

VIRTUALENV_DIR=$(CURDIR)/build/python/venv
VIRTUALENV_CMD=${VIRTUALENV_DIR}/bin/activate
VIRTUALENV=. ${VIRTUALENV_CMD};

NESHACK_WEBAPP_WHEEL=neshack_webapp-${VERSION}-py2-none-any.whl

OK=\033[32m[OK]\033[39m
FAIL=\033[31m[FAIL]\033[39m
CHECK=@if [ $$? -eq 0 ]; then echo "${OK}"; else echo "${FAIL}"; cat ${DEBUG} ; fi

WGET = wget -q --user-agent="Mozilla/5.0 (Linux; U; Android 4.0.2; en-us; Galaxy Nexus Build/ICL53F) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30"

SRC_JS = $(shell find lib tests -type f -iname "*.js") \
         app.js \
         tdd.js

CHECKPOINT_DIR=.checkpoint
CHECKPOINT=${CHECKPOINT_DIR}/.check

NODE_CHECK=node_modules/.check
BOWER_CHECK=bower_components/.check
BOWER_INSTALLER_CHECK=bower_components/.check-installer

ifeq "" "$(shell which npm)"
default:
	@echo "Please install node.js"
	@echo "Visit http://nodejs.org/ for more details"
	exit 1
else
default: build
endif


${NODE_CHECK}: package.json
	@echo "NPM installing packages:"
	@npm install #> ${DEBUG} 2> ${ERROR}
	@touch $@
	${CHECK}

${BOWER_CHECK}: bower.json ${NODE_CHECK}
	@${BOWER_BIN} install && touch $@

external:
	@echo "Creating external dir: \c"
	@mkdir -p external
	${CHECK}

${BOWER_INSTALLER_CHECK}: bower.json ${BOWER_CHECK} ${NODE_CHECK} external
	@${BOWER_INSTALLER_BIN} && touch $@

jshint:
	@${NODE_BIN}/jshint ${SRC_JS} --config jshint.config

jslint:
	@${NODE_BIN}/jslint --indent 4 --predef "define, nodeunit" --vars --sloppy --nomen --todo --stupid ${SRC_JS}

build/.check:
	@mkdir -p $@
	touch $@

build: ${NODE_CHECK} jshint

${VIRTUALENV_CMD}:
	@test -d ${VIRTUALENV_DIR} || virtualenv ${VIRTUALENV_ARGS} ${VIRTUALENV_DIR} > /dev/null && touch $@

${CHECKPOINT}:
	@mkdir -p ${CHECKPOINT_DIR}

${CHECKPOINT_DIR}/.upgrade_pip: ${CHECKPOINT} ${VIRTUALENV_CMD}
	@${VIRTUALENV} pip install --upgrade pip && touch $@

${CHECKPOINT_DIR}/.install_wheel: ${CHECKPOINT_DIR}/.upgrade_pip
	@${VIRTUALENV} pip install wheel && touch $@

dist/.check:
	@mkdir -p dist && touch $@

wheel: ${CHECKPOINT_DIR}/.install_wheel dist/.check ${BOWER_INSTALLER_CHECK}
	@mkdir -p build/wheel/neshack_spa/static/app
	@cat misc/setup.py | sed "s/version=.*/version='${VERSION}',/" > build/wheel/setup.py
	@cp misc/MANIFEST.in build/wheel
	@cp -R lib/* build/wheel/neshack_spa/static/app
	@cp -R static/init.js build/wheel/neshack_spa/static
	@cp -R external/component build/wheel/neshack_spa/static
	@echo "__version__='${VERSION}'" > build/wheel/neshack_spa/__init__.py
	@python -c "a = open('package.json'); import json; print 'package = %s\n' % json.load(a)" >> build/wheel/neshack_spa/__init__.py
	@python -c "a = open('bower.json'); import json; print 'bower = %s\n' % json.load(a)" >> build/wheel/neshack_spa/__init__.py
	@cd build/wheel && ${VIRTUALENV} python setup.py bdist_wheel > /dev/null
	@cp build/wheel/dist/*.whl dist

dist: wheel

clean:
	@find . -iname \*~ -delete
	@rm -rf build/
	@rm -rf dist/
	@rm -rf external
	@rm -rf reports

purge: clean
	@rm -rf node_modules
	@rm -rf bower_components
	@rm -rf deps

run: ${BOWER_INSTALLER_CHECK}
	@${NODE_BIN}/supervisor ./app.js

.PHONY: clean purge dist run build
