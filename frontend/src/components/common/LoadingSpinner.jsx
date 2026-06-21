import React from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingSpinner = ({ size = 'md', message = 'Loading...' }) => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center py-5">
      <Spinner animation="border" role="status" size={size}>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      {message && (
        <p className="text-muted mt-3 mb-0">{message}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;
