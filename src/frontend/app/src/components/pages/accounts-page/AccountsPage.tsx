import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BackendInterface, { Account } from '../../../backendInterface';
import Button from 'react-bootstrap/Button';
import Page from '../../page/Page';
import { Card } from 'react-bootstrap';
import CreateAccountModal from '../../modals/CreateAccountModal';


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
      <div className="mb-4">
        <Button variant="primary" size="sm" className="float-end" onClick={() => setShowCreateAccountModal(true)}>
          Create Account
        </Button>
        <h1>Accounts</h1>
      </div>

      {accounts &&
        <Row>
          {accounts.map((account) =>
            <Col key={account.id} xs={12} md={6} lg={4} xl={3}>
              <Link to={`/account/${account.id}`} className="text-decoration-none">
                <Card className="mb-3">
                  <Card.Body>
                    {account.name}
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          )}
        </Row>
      }
      {accounts === null &&
        <p>No accounts to show</p>
      }
      <CreateAccountModal show={showCreateAccountModal} handleClose={handleModalClose} onSuccess={onAccountCreated} />
    </Page>
  );
};

export default AccountsPage;