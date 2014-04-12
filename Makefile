MOCHA_OPTS= --check-leaks
REPORTER = dot

check: test

test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter $(REPORTER) \
		$(MOCHA_OPTS)

test-cov: lib-cov
	@EXPRESS_COV=1 $(MAKE) test REPORTER=html-cov > coverage.html

lib-cov:
	@jscoverage lib lib-cov

bench:
	@$(MAKE) -C benchmarks

clean:
	rm -f coverage.html
	rm -fr lib-cov

.PHONY: test bench clean
