import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FiAlertTriangle } from 'react-icons/fi';

const DeleteCustomerModal = ({ show, onHide, onConfirm, customer }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title className="d-flex align-items-center gap-2">
          <FiAlertTriangle className="text-warning" size={20} />
          Confirm Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="mb-0">
          Are you sure you want to delete the customer <strong>"{customer?.name}"</strong> ({customer?.customerCode})?
          This action cannot be undone.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteCustomerModal;
