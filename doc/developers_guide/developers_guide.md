# Developers Guide

## Releasing

Currently we release this project by hand.

### Steps

* Write a changelog file
* Add a link to `doc/changes/changelog.md`
* Update the version in `package.json`
* Run `npm login`. The credentials can be found in Keeper.
* Run `npm run clean && npm test && npm run build && npm publish --access public`
* Make a [new release](https://github.com/exasol/extension-manager-interface/releases/new) on GitHub
