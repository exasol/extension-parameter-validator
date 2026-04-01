# Developers Guide

## Initial Setup

Install [NodeJS 22](https://nodejs.org/en/download).

## Development

### Testing, Building and Linting

```sh
npm install
npm test
npm run lint
npm run build
```

### Run Sonar Locally

Install the latest [Sonar CLI](https://docs.sonarsource.com/sonarqube-server/latest/analyzing-source-code/scanners/sonarscanner/).

Run sonar:

```sh
export SONAR_TOKEN=abc123
sonar-scanner
```

### Upgrade Dependencies

```sh
npx npm-check-updates -u && npm install
```

## Releasing

Currently we release this project by hand.

### Steps

- Write a changelog file
- Add a link to `doc/changes/changelog.md`
- Update the version in `package.json`
- Merge Pull Request to `main`
- Make a [new release](https://github.com/exasol/extension-parameter-validator/releases/new) on GitHub
  - This will trigger the [release workflow](../../.github/workflows/release.yml) and publish to [npmjs.com](https://www.npmjs.com/package/@exasol/extension-manager-interface)
