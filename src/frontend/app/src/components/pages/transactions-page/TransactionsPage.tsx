import React, { useEffect, useState } from 'react';
import Page from '../../page/Page';
import BackendInterface, { Transaction } from '../../../backendInterface';

const TransactionsPage: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[] | null | undefined>(undefined);
  useEffect(() => {
    const getTransactions = async () => {
      const transactions = await BackendInterface.getAllTransactions();
      setTransactions(transactions);
    };

    getTransactions();
  }, []);

  return (
    <Page>
      <h1>Transactions</h1>
      {transactions &&
        <ul>
          {transactions.map((transaction) =>
            <li key={transaction.id}>{transaction.description}</li>
          )}
        </ul>
      }
    </Page>
  );
};

export default TransactionsPage;