import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, Button, Card, Container, Alert, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { FiLock, FiMail, FiCpu, FiEye, FiEyeOff } from 'react-icons/fi';

// Form validation schema
const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');
    
    // Simulate API delay
    setTimeout(() => {
      // Mock validation matching initial seed credentials
      if (data.email === 'admin@erp.com' && data.password === 'admin123') {
        login(
          { id: '1', name: 'Admin User', email: data.email, role: 'Admin' },
          'mock_jwt_token_for_mini_erp_app'
        );
        setLoading(false);
        navigate('/dashboard');
      } else {
        setError('Invalid email or password. Hint: admin@erp.com / admin123');
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <Container style={{ maxWidth: '440px' }}>
        {/* Brand Logo */}
        <div className="text-center mb-4">
          <div className="d-inline-flex bg-primary text-white p-3 rounded-circle shadow-sm mb-3">
            <FiCpu size={36} />
          </div>
          <h2 className="fw-bold text-dark mb-1">Mini ERP Portal</h2>
          <p className="text-muted">Sign in to manage your operations</p>
        </div>

        {/* Login Card */}
        <Card className="border-0 shadow-sm p-4">
          <Card.Body>
            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit(onSubmit)}>
              {/* Email */}
              <Form.Group className="mb-3" controlId="email">
                <Form.Label className="fw-semibold">Email address</Form.Label>
                <InputGroup>
                  <InputGroup.Text className="bg-light border-end-0">
                    <FiMail className="text-secondary" />
                  </InputGroup.Text>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    className={`bg-light border-start-0 ${errors.email ? 'is-invalid' : ''}`}
                    {...register('email')}
                  />
                  {errors.email && (
                    <Form.Control.Feedback type="invalid">
                      {errors.email.message}
                    </Form.Control.Feedback>
                  )}
                </InputGroup>
              </Form.Group>

              {/* Password */}
              <Form.Group className="mb-4" controlId="password">
                <Form.Label className="fw-semibold">Password</Form.Label>
                <InputGroup>
                  <InputGroup.Text className="bg-light border-end-0">
                    <FiLock className="text-secondary" />
                  </InputGroup.Text>
                  <Form.Control
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter password"
                    className={`bg-light border-start-0 border-end-0 ${errors.password ? 'is-invalid' : ''}`}
                    {...register('password')}
                  />
                  <InputGroup.Text 
                    className="bg-light border-start-0 cursor-pointer" 
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ cursor: 'pointer' }}
                  >
                    {showPassword ? <FiEyeOff className="text-secondary" /> : <FiEye className="text-secondary" />}
                  </InputGroup.Text>
                  {errors.password && (
                    <Form.Control.Feedback type="invalid">
                      {errors.password.message}
                    </Form.Control.Feedback>
                  )}
                </InputGroup>
              </Form.Group>

              {/* Submit */}
              <Button
                variant="primary"
                type="submit"
                className="w-100 py-2 fw-semibold d-flex justify-content-center align-items-center gap-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Authenticating...
                  </>
                ) : (
                  'Login'
                )}
              </Button>
            </Form>
          </Card.Body>
        </Card>

        {/* Demo Credentials Box */}
        <div className="bg-white border rounded p-3 mt-3 text-center shadow-sm">
          <span className="text-muted small">
            Demo Credentials:<br />
            <strong>admin@erp.com</strong> / <strong>admin123</strong>
          </span>
        </div>
      </Container>
    </div>
  );
};

export default Login;
