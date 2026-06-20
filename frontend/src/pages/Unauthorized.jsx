import React from 'react';
import { Card, Button, Container } from 'react-bootstrap';
import { FiAlertTriangle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <Card className="text-center shadow-sm p-4 border-0" style={{ maxWidth: '480px', width: '100%' }}>
        <Card.Body>
          <div className="d-flex justify-content-center mb-4">
            <div className="bg-danger-light p-4 rounded-circle text-danger" style={{ backgroundColor: '#fef2f2', width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifycontent: 'center' }}>
              <FiAlertTriangle size={40} className="mx-auto" />
            </div>
          </div>
          <Card.Title as="h2" className="fw-bold text-dark mb-2">Access Denied</Card.Title>
          <Card.Text className="text-secondary mb-4">
            You do not have the required permissions or roles to access this page. Please log in with appropriate credentials or contact the system administrator.
          </Card.Text>
          <div className="d-flex justify-content-center gap-3">
            <Button variant="outline-secondary" onClick={() => navigate(-1)}>
              Go Back
            </Button>
            <Button variant="primary" onClick={() => navigate('/login')}>
              Log In
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Unauthorized;
