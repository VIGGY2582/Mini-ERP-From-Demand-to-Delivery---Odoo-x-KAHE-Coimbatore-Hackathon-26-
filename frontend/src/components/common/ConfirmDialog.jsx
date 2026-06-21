import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FiAlertTriangle, FiInfo, FiCheckCircle, FiXCircle } from 'react-icons/fi';

const ConfirmDialog = ({ 
  show, 
  onHide, 
  onConfirm, 
  title = 'Confirm Action',
  message,
  variant = 'danger',
  confirmText = 'Confirm',
  cancelText = 'Cancel'
}) => {
  const getIcon = () => {
    switch (variant) {
      case 'warning':
        return <FiAlertTriangle className="text-warning" size={20} />;
      case 'info':
        return <FiInfo className="text-info" size={20} />;
      case 'success':
        return <FiCheckCircle className="text-success" size={20} />;
      case 'danger':
      default:
        return <FiAlertTriangle className="text-danger" size={20} />;
    }
  };

  const getVariant = () => {
    switch (variant) {
      case 'warning':
        return 'warning';
      case 'info':
        return 'info';
      case 'success':
        return 'success';
      case 'danger':
      default:
        return 'danger';
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title className="d-flex align-items-center gap-2">
          {getIcon()}
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="mb-0">{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          {cancelText}
        </Button>
        <Button variant={getVariant()} onClick={onConfirm}>
          {confirmText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmDialog;
