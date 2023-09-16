import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BackendInterface, { Account } from '../../../backendInterface';
import Page from '../../page/Page';


const AccountPage: React.FC = () => {
  let { accountID } = useParams();

  const [account, setAccount] = useState<Account | null | undefined>(undefined);
  useEffect(() => {
    const getAccount = async () => {
      const account = await BackendInterface.getAccount(accountID!);
      setAccount(account);
    };

    if (accountID) {
      getAccount();
    } else {
      setAccount(null);
    };
  }, [accountID]);

  return (
    <Page>
      {account &&
        <div>
          <h1>{account.name}</h1>
        </div>
      }
      {account === null &&
        <p>Account not found</p>
      }
    </Page>
  );
};

export default AccountPage;
