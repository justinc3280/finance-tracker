// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const AccountType = {
  "CHECKING": "CHECKING",
  "SAVINGS": "SAVINGS",
  "BROKERAGE": "BROKERAGE",
  "CREDIT_CARD": "CREDIT_CARD",
  "ONLINE": "ONLINE"
};

const { Transaction, Category, Account } = initSchema(schema);

export {
  Transaction,
  Category,
  Account,
  AccountType
};