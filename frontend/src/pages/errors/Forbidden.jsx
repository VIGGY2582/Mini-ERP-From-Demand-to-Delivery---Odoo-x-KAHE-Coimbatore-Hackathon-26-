import React from 'react';
import { Container, Button, Card } from 'react-bootstrap';
import { FiShield, FiHome } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Forbidden = () => {
  const navigate = useNavigate();

  return (
    <Container className="d-flex align-items-center justify-content-center vh-100">
      <Card className="text-center p-5 shadow" style={{ maxWidth: '500px' }}>
        <Card.Body>
          <div className="mb-4">
            <FiShield size={80} className="text-warning" />
          </div>
          <h1 className="display-4 fw-bold mb-3">403</h1>
          <h3 className="mb-3">Access Denied</h3>
          <p className="text-muted mb-4">
            You don't have permission to access this page. Please contact your administrator.
          </p>
          <Button variant="primary" onClick={() => navigate('/dashboard')}>
            <FiHome className="me-2" />
            Return to Dashboard
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Forbidden;
