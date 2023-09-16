import { DataStore } from '@aws-amplify/datastore';
import { Account } from './models';


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
};

export { Account };
export default BackendInterface;
