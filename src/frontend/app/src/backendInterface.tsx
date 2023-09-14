import { DataStore } from '@aws-amplify/datastore';
import { Account } from './models';


class BackendInterface {
  public static getAccounts = async () => {
    const accounts = await DataStore.query(Account);
    if (accounts.length === 0) return null;
    return accounts;
  }
}

export { Account };
export default BackendInterface;
