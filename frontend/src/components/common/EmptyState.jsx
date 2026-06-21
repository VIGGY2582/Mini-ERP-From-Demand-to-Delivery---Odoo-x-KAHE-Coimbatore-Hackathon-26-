import React from 'react';
import { Card } from 'react-bootstrap';
import { FiInbox, FiSearch } from 'react-icons/fi';

const EmptyState = ({ icon: Icon = FiInbox, message, subMessage, action }) => {
  return (
    <Card className="border-0 bg-light">
      <Card.Body className="text-center py-5">
        <div className="mb-3">
          <Icon size={48} className="text-muted" />
        </div>
        <h5 className="text-muted mb-2">{message || 'No data found'}</h5>
        {subMessage && (
          <p className="text-muted small mb-4">{subMessage}</p>
        )}
        {action && action}
      </Card.Body>
    </Card>
  );
};

export default EmptyState;
