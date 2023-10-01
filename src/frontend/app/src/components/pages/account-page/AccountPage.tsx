import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BackendInterface, { Account, Transaction } from '../../../backendInterface';
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

  const [transactions, setTransactions] = useState<Transaction[] | null | undefined>(undefined);
  useEffect(() => {
    const getTransactions = async () => {
      const transactions = await BackendInterface.getTransactionsForAccount(accountID!);
      setTransactions(transactions);
    };

    if (accountID) {
      getTransactions();
    } else {
      setTransactions(null);
    };
  }, [accountID]);

  return (
    <Page>
      {account &&
        <div>
          <h1>{account.name}</h1>
          <h3>Transactions</h3>
          {transactions ?
            <ul>
              {transactions.map((transaction) =>
                <li key={transaction.id}>{transaction.description}</li>
              )}
            </ul>
          :
            <p>No transactions found.</p>
          }
        </div>
      }
      {account === null &&
        <p>Account not found</p>
      }
    </Page>
  );
};

export default AccountPage;
