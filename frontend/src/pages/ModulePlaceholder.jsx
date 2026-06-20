import React from 'react';
import { Card, Button, Container } from 'react-bootstrap';
import { FiSliders, FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const ModulePlaceholder = ({ moduleName }) => {
  const navigate = useNavigate();

  return (
    <Container className="d-flex align-items-center justify-content-center py-5">
      <Card className="text-center shadow-sm p-4 border-0" style={{ maxWidth: '600px', width: '100%' }}>
        <Card.Body>
          <div className="d-flex justify-content-center mb-4">
            <div className="bg-light-blue p-4 rounded-circle text-primary" style={{ backgroundColor: '#eff6ff', width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifycontent: 'center' }}>
              <FiSliders size={40} className="mx-auto" />
            </div>
          </div>
          <Card.Title as="h2" className="fw-bold mb-3">{moduleName} Module</Card.Title>
          <Card.Subtitle className="mb-4 text-muted fs-6">
            Module Under Development
          </Card.Subtitle>
          <Card.Text className="text-secondary mb-4">
            This module has been registered in the ERP application routing table. The core controller, service, and repository structures are ready for integration.
          </Card.Text>
          <div className="d-flex justify-content-center gap-3">
            <Button variant="outline-secondary" className="d-flex align-items-center gap-2" onClick={() => navigate(-1)}>
              <FiArrowLeft /> Back
            </Button>
            <Button variant="primary" onClick={() => navigate('/dashboard')}>
              Go to Dashboard
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ModulePlaceholder;
