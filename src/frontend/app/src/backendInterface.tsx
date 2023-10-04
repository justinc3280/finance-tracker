import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore';
import { Account, Transaction } from './models';


class BackendInterface {
  public static getAccounts = async () => {
    const accounts = await DataStore.query(Account);
    if (accounts.length === 0) return null;
    return accounts;
  };

  public static getAccount = async (id: string) => {
    const account = await DataStore.query(Account, id);
    if (!account) return null;
    return account;
  };

  public static getAllTransactions = async () => {
    const transactions = await DataStore.query(Transaction, Predicates.ALL, {
      sort: (s) => s.date(SortDirection.ASCENDING),
    });
    if (transactions.length === 0) return null;
    return transactions;
  };

  public static getTransactionsForAccount = async (accountID: string) => {
    const transactions = await DataStore.query(Transaction,
      (t) => t.accountID.eq(accountID), {
        sort: (s) => s.date(SortDirection.ASCENDING),
      }
    );
    if (transactions.length === 0) return null;
    return transactions;
  };
};

export { Account, Transaction };
export default BackendInterface;
