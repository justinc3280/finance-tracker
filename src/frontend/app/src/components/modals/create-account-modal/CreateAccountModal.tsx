
import React from "react";
import Modal from "react-bootstrap/Modal";

import AccountCreateForm from "../../../ui-components/AccountCreateForm";

type Props = {
  show: boolean;
  handleClose: () => void;
  onSuccess: () => void;
};

const CreateAccountModal: React.FC<Props> = ({ show, handleClose, onSuccess }) => {
  return (
    <Modal show={show} onHide={handleClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Create Account</Modal.Title>
      </Modal.Header>
      <AccountCreateForm onSuccess={onSuccess} />
    </Modal>
  );
};

export default CreateAccountModal;
