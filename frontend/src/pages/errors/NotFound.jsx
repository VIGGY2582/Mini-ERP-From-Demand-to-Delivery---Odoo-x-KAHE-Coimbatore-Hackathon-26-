import React from 'react';
import { Container, Button, Card } from 'react-bootstrap';
import { FiHome, FiAlertCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container className="d-flex align-items-center justify-content-center vh-100">
      <Card className="text-center p-5 shadow" style={{ maxWidth: '500px' }}>
        <Card.Body>
          <div className="mb-4">
            <FiAlertCircle size={80} className="text-danger" />
          </div>
          <h1 className="display-4 fw-bold mb-3">404</h1>
          <h3 className="mb-3">Page Not Found</h3>
          <p className="text-muted mb-4">
            The page you are looking for doesn't exist or has been moved.
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

export default NotFound;
