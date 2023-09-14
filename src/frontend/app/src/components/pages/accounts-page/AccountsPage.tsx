import React, { useEffect, useState } from 'react';
import BackendInterface, { Account } from '../../../backendInterface';
import Page from '../../page/Page';

const AccountsPage: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[] | null | undefined>(undefined);
  useEffect(() => {
    const getAccounts = async () => {
      const accounts = await BackendInterface.getAccounts();
      setAccounts(accounts);
    }

    getAccounts();
  }, []);

  return (
    <Page>
      <h1>Accounts</h1>
      {accounts && accounts.map((account) =>
          <div key={account.id}>
            <p>{account.name}</p>
          </div>
      )}
      {accounts === null &&
        <p>No accounts to show</p>
      }
    </Page>
  );
};

export default AccountsPage;