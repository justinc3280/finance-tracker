import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Page from '../../page/Page';
import BackendInterface, { Transaction } from '../../../backendInterface';
import CreateTransactionModal from '../../modals/CreateTransactionModal';
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

  const [showCreateTransactionModal, setShowCreateTransactionModal] = useState<boolean>(false);

  const handleModalClose = () => {
    setShowCreateTransactionModal(false);
  };

  const onTransactionCreated = () => {
    handleModalClose();

    const getTransactions = async () => {
      const transactions = await BackendInterface.getAllTransactions();
      setTransactions(transactions);
    }

    getTransactions();
  };

  return (
    <Page>
      <div className="mb-4">
        <Button variant="primary" size="sm" className="float-end" onClick={() => setShowCreateTransactionModal(true)}>
          Create Transaction
        </Button>
        <h1>Transactions</h1>
      </div>
      {transactions ?
        <TrasactionsTable transactions={transactions} />
        : <p>No transactions found.</p>
      }
      <CreateTransactionModal show={showCreateTransactionModal} handleClose={handleModalClose} onSuccess={onTransactionCreated} />
    </Page>
  );
};

export default TransactionsPage;