import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import { FiCheckCircle, FiXCircle, FiAlertTriangle, FiInfo, FiX } from 'react-icons/fi';

const AppToast = ({ show, onClose, message, variant = 'success', title }) => {
  const getIcon = () => {
    switch (variant) {
      case 'success':
        return <FiCheckCircle size={18} />;
      case 'danger':
      case 'error':
        return <FiXCircle size={18} />;
      case 'warning':
        return <FiAlertTriangle size={18} />;
      case 'info':
      default:
        return <FiInfo size={18} />;
    }
  };

  const getBgClass = () => {
    switch (variant) {
      case 'success':
        return 'text-bg-success';
      case 'danger':
      case 'error':
        return 'text-bg-danger';
      case 'warning':
        return 'text-bg-warning';
      case 'info':
      default:
        return 'text-bg-info';
    }
  };

  return (
    <ToastContainer position="top-end" className="p-3" style={{ zIndex: 9999 }}>
      <Toast show={show} onClose={onClose} className={getBgClass()} delay={3000} autohide>
        <Toast.Header closeButton className="bg-transparent text-white">
          <div className="d-flex align-items-center gap-2 me-auto">
            {getIcon()}
            <strong className="me-auto">{title || 'Notification'}</strong>
          </div>
          <button
            type="button"
            className="btn-close btn-close-white ms-2 m-0"
            onClick={onClose}
            aria-label="Close"
          />
        </Toast.Header>
        <Toast.Body className="text-white">
          {message}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default AppToast;
