build:
	@npm install
	@./node_modules/.bin/bower install
	@./node_modules/.bin/grunt

clean:
	@rm -rf bower_components node_modules dist .tmp

.PHONY: build clean