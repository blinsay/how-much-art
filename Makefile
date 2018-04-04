NAME := how-much-art

all: build

.PHONY: install
install:
	npm install

.PHONY: open
open:
	open index.html

.PHONY: tsc
tsc:
	@./node_modules/typescript/bin/tsc --watch --pretty

.PHONY: snapshot
snapshot:
	@./bin/snapshot-save

.PHONY: list
list:
	@./bin/snapshot-list
