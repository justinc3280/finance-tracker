import React from "react";
import Modal from "react-bootstrap/Modal";

import TransactionCreateForm from "../../ui-components/TransactionCreateForm";

type Props = {
  show: boolean;
  handleClose: () => void;
  onSuccess: () => void;
};

const CreateTransactionModal: React.FC<Props> = ({ show, handleClose, onSuccess }) => {
  return (
    <Modal show={show} onHide={handleClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Create Transaction</Modal.Title>
      </Modal.Header>
      <TransactionCreateForm onSuccess={onSuccess} />
    </Modal>
  );
};

export default CreateTransactionModal;
