#!/usr/bin/env node

const {download} = require('../index');
const {argv} = process;
const {username, 'account-id':accountId} = require('minimist')(argv);
const {BANK_PASSWORD:password}= process.env;

console.log('%s (pwd %s, accnt id %s)',
  username,
  password ? '✔' : '✘',
  accountId ? '✔' : '✘',
);

if (!username || !password || !accountId) {
  console.error('One of username, password or account id is missing.');
  console.error('@see https://git.io/vx4aC for instructions.')
  process.exit(1);
}

download({ username, password, accountId })
  .then(statement => process.stdout.write(statement))
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
