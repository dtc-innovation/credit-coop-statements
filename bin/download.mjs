import { download } from '../index';

const {BANK_USERNAME:username, BANK_PASSWORD:password, BANK_ACCOUNT_ID:accountId} = process.env;

console.log('%s (pwd length %d)', username, password.length)

download({ username, password, accountId })
  .then(statement => process.stdout.write(statement))
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
