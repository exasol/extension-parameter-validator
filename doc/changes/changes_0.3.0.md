# Extension Parameter Validator 0.3.0, released 2023-09-05

Code name: Support `select` parameter type

## Summary

This release adds support for the `select` parameter type.

The release also re-defines the `ValidationResult` type as `ValidationResultSuccess | ValidationResultFailure`. This allows accessing the `message` field only for validation failures.

## Features

* #10: Added support for the `select` parameter type

## Dependency Updates

### Compile Dependency Updates

* Updated `@exasol/extension-manager-interface:0.1.16` to `0.3.1`

### Development Dependency Updates

* Updated `@typescript-eslint/parser:^5.57.0` to `^6.6.0`
* Updated `ts-jest:^29.1.0` to `^29.1.1`
* Updated `@types/jest:^29.5.0` to `^29.5.4`
* Updated `typescript:5.0.3` to `5.2.2`
* Updated `jest:^29.5.0` to `^29.6.4`
* Updated `@typescript-eslint/eslint-plugin:^5.57.0` to `^6.6.0`
