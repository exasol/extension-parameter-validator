# Developers Guide

## Initial Setup

Install [NodeJS 22](https://nodejs.org/en/download).

## Development

### Run Sonar Locally

Install the latest [Sonar CLI](https://docs.sonarsource.com/sonarqube-server/latest/analyzing-source-code/scanners/sonarscanner/).

Run sonar:

```sh
sonar-scanner -D sonar.token=$SONAR_TOKEN
```

## Releasing

Currently we release this project by hand.

### Steps

* Write a changelog file
* Add a link to `doc/changes/changelog.md`
* Update the version in `package.json`
* Run `npm login`. The credentials can be found in Keeper.
* Run `npm run clean && npm test && npm run build && npm publish --access public`
* Make a [new release](https://github.com/exasol/extension-parameter-validator/releases/new) on GitHub
