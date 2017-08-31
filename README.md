# Invoices API

## Result files

`dist/server` - webserver itself
`dist/seed` - database prepopulator

## Maintenance tasks

`yarn server:build` - build dist/server and dist/seed
`yarn server:watch` - update dist/server accordingly to changes
`yarn server:lint` - check whole project with linter
`yarn server:run` - run builded server
`yarn server:seed` - prepopulate database

## Installation

The only things you need are `package.json` file and `dist` dir.

Execute corresponding commands:

```shell
yarn install --production
yarn server:seed
yarn server:run
```

## TODO

[ ] add tests
[ ] clean up and dry routes
