import React from "react";
import Modal from "react-bootstrap/Modal";

import CategoryCreateForm from "../../ui-components/CategoryCreateForm";

type Props = {
  show: boolean;
  handleClose: () => void;
  onSuccess: () => void;
};

const CreateCategoryModal: React.FC<Props> = ({ show, handleClose, onSuccess }) => {
  return (
    <Modal show={show} onHide={handleClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Create Category</Modal.Title>
      </Modal.Header>
      <CategoryCreateForm onSuccess={onSuccess} />
    </Modal>
  );
};

export default CreateCategoryModal;
