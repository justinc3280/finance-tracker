import React, { useEffect, useState } from 'react';
import Page from '../../page/Page';
import BackendInterface, { Transaction } from '../../../backendInterface';
import TrasactionsTable from '../../transactions-table/TransactionsTable';


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
      {transactions ?
        <TrasactionsTable transactions={transactions} />
        : <p>No transactions found.</p>
      }
    </Page>
  );
};

export default TransactionsPage;