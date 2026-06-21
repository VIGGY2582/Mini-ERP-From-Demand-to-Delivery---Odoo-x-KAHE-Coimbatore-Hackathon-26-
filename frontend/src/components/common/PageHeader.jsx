import React from 'react';
import { Button } from 'react-bootstrap';
import { FiPlus, FiRefreshCw } from 'react-icons/fi';

const PageHeader = ({ 
  title, 
  subtitle, 
  onAdd, 
  onRefresh, 
  loading,
  addButtonText = 'Add New',
  refreshButton = true 
}) => {
  return (
    <div className="mb-4">
      <div className="d-flex justify-content-between align-items-start flex-wrap gap-3">
        <div className="flex-grow-1">
          <h2 className="fw-bold mb-1">{title}</h2>
          {subtitle && (
            <p className="text-muted mb-0">{subtitle}</p>
          )}
        </div>
        <div className="d-flex gap-2 flex-shrink-0">
          {refreshButton && (
            <Button
              variant="outline-secondary"
              onClick={onRefresh}
              disabled={loading}
              size="sm"
            >
              <FiRefreshCw className={loading ? 'spin-animation' : ''} />
            </Button>
          )}
          {onAdd && (
            <Button variant="primary" onClick={onAdd}>
              <FiPlus className="me-2" />
              {addButtonText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
