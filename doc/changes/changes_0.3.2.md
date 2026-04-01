# Extension Parameter Validator 0.3.2, released 2026-04-01

Code name: Fix dependabot alerts in vulnerable dependencies

## Summary

This release fixes the following dependabot alerts:
* [#33: Prototype Pollution via parse() in NodeJS flatted](https://github.com/exasol/extension-parameter-validator/security/dependabot/33)
* [#30: minimatch has ReDoS: matchOne() combinatorial backtracking via multiple non-adjacent GLOBSTAR segments](https://github.com/exasol/extension-parameter-validator/security/dependabot/30)
* [#28: minimatch has ReDoS: matchOne() combinatorial backtracking via multiple non-adjacent GLOBSTAR segments](https://github.com/exasol/extension-parameter-validator/security/dependabot/28)
* [#27: minimatch has ReDoS: matchOne() combinatorial backtracking via multiple non-adjacent GLOBSTAR segments](https://github.com/exasol/extension-parameter-validator/security/dependabot/27)
* [#34: Picomatch: Method Injection in POSIX Character Classes causes incorrect Glob Matching](https://github.com/exasol/extension-parameter-validator/security/dependabot/34)
* [#16: js-yaml has prototype pollution in merge (<<)](https://github.com/exasol/extension-parameter-validator/security/dependabot/16)
* [#15: js-yaml has prototype pollution in merge (<<)](https://github.com/exasol/extension-parameter-validator/security/dependabot/15)

## Security

* #16: Fix dependabot alerts

## Dependency Updates

### Compile Dependency Updates

* Updated `@exasol/extension-manager-interface:0.3.1` to `0.4.3`

### Development Dependency Updates

* Added `eslint:9.20.0`
* Added `@types/node:^22.13.1`
* Updated `ts-jest:^29.1.1` to `^29.2.5`
* Updated `@types/jest:^29.5.4` to `^29.5.14`
* Added `typescript-eslint:^8.23.0`
* Updated `typescript:5.2.2` to `5.7.3`
* Updated `ts-node:^10.9.1` to `^10.9.2`
* Updated `jest:^29.6.4` to `^29.7.0`
* Removed `@typescript-eslint/parser:^6.6.0`
* Removed `@typescript-eslint/eslint-plugin:^6.6.0`
