import React, { useEffect, useState } from 'react';
import BackendInterface, { Account } from '../../../backendInterface';
import Button from 'react-bootstrap/Button';
import Page from '../../page/Page';
import CreateAccountModal from '../../modals/create-account-modal/CreateAccountModal';


const AccountsPage: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[] | null | undefined>(undefined);
  useEffect(() => {
    const getAccounts = async () => {
      const accounts = await BackendInterface.getAccounts();
      setAccounts(accounts);
    }

    getAccounts();
  }, []);

  const [showCreateAccountModal, setShowCreateAccountModal] = useState<boolean>(false);

  const handleModalClose = () => {
    setShowCreateAccountModal(false);
  }

  const onAccountCreated = () => {
    handleModalClose();

    const getAccounts = async () => {
      const accounts = await BackendInterface.getAccounts();
      setAccounts(accounts);
    };

    getAccounts();
  };

  return (
    <Page>
      <Button variant="primary" size="sm" className="float-end" onClick={() => setShowCreateAccountModal(true)}>
        Create Account
      </Button>
      <h1>Accounts</h1>

      {accounts && accounts.map((account) =>
        <div key={account.id}>
          <p>{account.name}</p>
        </div>
      )}
      {accounts === null &&
        <p>No accounts to show</p>
      }
      <CreateAccountModal show={showCreateAccountModal} handleClose={handleModalClose} onSuccess={onAccountCreated} />
    </Page>
  );
};

export default AccountsPage;