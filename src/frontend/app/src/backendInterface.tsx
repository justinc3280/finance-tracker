import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore';
import { Account, Transaction as TransactionModel } from './models';
import { Transaction } from './types';


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

  public static getAllTransactions = async (includeAccountName: boolean = false) => {
    const transactionModels = await DataStore.query(TransactionModel, Predicates.ALL, {
      sort: (s) => s.date(SortDirection.ASCENDING),
    });
    if (transactionModels.length === 0) return null;

    const transactions: Transaction[] = [];
    for (const transactionModel of transactionModels) {
      const transaction: Transaction = {
        id: transactionModel.id,
        date: transactionModel.date,
        amount: transactionModel.amount,
        description: transactionModel.description,
      };
      if (includeAccountName) {
        const account = await transactionModel.Account;
        transaction.accountName = account.name;
      };
      transactions.push(transaction);
    };
    return transactions;
  };

  public static getTransactionsForAccount = async (accountID: string) => {
    const transactionModels = await DataStore.query(TransactionModel,
      (t) => t.accountID.eq(accountID), {
        sort: (s) => s.date(SortDirection.ASCENDING),
      }
    );
    if (transactionModels.length === 0) return null;

    const transactions: Transaction[] = [];
    for (const transactionModel of transactionModels) {
      transactions.push({
        id: transactionModel.id,
        date: transactionModel.date,
        amount: transactionModel.amount,
        description: transactionModel.description,
      });
    };
    return transactions;
  };
};

export { Account };
export default BackendInterface;
