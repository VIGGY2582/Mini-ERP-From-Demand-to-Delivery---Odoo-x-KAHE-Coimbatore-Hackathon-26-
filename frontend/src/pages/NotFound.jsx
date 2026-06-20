import React from 'react';
import { Card, Button, Container } from 'react-bootstrap';
import { FiHelpCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <Card className="text-center shadow-sm p-4 border-0" style={{ maxWidth: '480px', width: '100%' }}>
        <Card.Body>
          <div className="d-flex justify-content-center mb-4">
            <div className="bg-warning-light p-4 rounded-circle text-warning" style={{ backgroundColor: '#fffbeb', width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifycontent: 'center' }}>
              <FiHelpCircle size={40} className="mx-auto" />
            </div>
          </div>
          <Card.Title as="h2" className="fw-bold text-dark mb-2">404 - Page Not Found</Card.Title>
          <Card.Text className="text-secondary mb-4">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </Card.Text>
          <div className="d-flex justify-content-center gap-3">
            <Button variant="outline-secondary" onClick={() => navigate(-1)}>
              Go Back
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

export default NotFound;
