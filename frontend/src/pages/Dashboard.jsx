import React from 'react';
import { Row, Col, Card, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { 
  FiUsers, FiBox, FiShoppingBag, FiTruck, 
  FiLayers, FiDollarSign, FiShoppingCart, FiCpu
} from 'react-icons/fi';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const cards = [
    { name: 'Employees', path: '/dashboard/employees', icon: <FiUsers size={28} />, count: '0 Active', color: '#4f46e5', desc: 'Manage workforce personnel, directory list and profiles.' },
    { name: 'Products', path: '/dashboard/products', icon: <FiBox size={28} />, count: '0 Cataloged', color: '#0ea5e9', desc: 'Manage product items, pricing plans, and definitions.' },
    { name: 'Customers', path: '/dashboard/customers', icon: <FiShoppingBag size={28} />, count: '0 Profiles', color: '#10b981', desc: 'Track customer profiles, contacts and customer orders.' },
    { name: 'Vendors', path: '/dashboard/vendors', icon: <FiTruck size={28} />, count: '0 Suppliers', color: '#f59e0b', desc: 'Register vendor supplier profiles and procurement logs.' },
    { name: 'Inventory', path: '/dashboard/inventory', icon: <FiLayers size={28} />, count: '0 In Stock', color: '#8b5cf6', desc: 'Monitor stock levels, inventory transfers and locations.' },
    { name: 'Sales', path: '/dashboard/sales', icon: <FiDollarSign size={28} />, count: '$0.00 Total', color: '#ef4444', desc: 'Manage invoices, sales quotations, and revenues.' },
    { name: 'Purchase', path: '/dashboard/purchase', icon: <FiShoppingCart size={28} />, count: '$0.00 Total', color: '#ec4899', desc: 'Create purchase orders, track invoices and bills.' },
    { name: 'Manufacturing', path: '/dashboard/manufacturing', icon: <FiCpu size={28} />, count: '0 Active Work', color: '#14b8a6', desc: 'Plan bill of materials, work orders and production.' },
  ];

  return (
    <Container fluid className="px-0 py-2">
      {/* Welcome Banner */}
      <div className="bg-white border rounded p-4 mb-4 shadow-sm">
        <h1 className="fw-bold fs-3 text-dark mb-1">Welcome back, {user?.name || 'Administrator'}</h1>
        <p className="text-secondary mb-0">Here is a quick overview of your ERP module configurations.</p>
      </div>

      {/* Grid of Cards */}
      <Row className="g-4">
        {cards.map((card) => (
          <Col key={card.name} xs={12} sm={6} lg={4} xl={3}>
            <Card 
              className="erp-card h-100 shadow-sm border-0 cursor-pointer" 
              onClick={() => navigate(card.path)}
              style={{ cursor: 'pointer' }}
            >
              <Card.Body className="d-flex flex-column p-4">
                {/* Header Icon + Count */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div 
                    className="p-3 rounded-3 text-white" 
                    style={{ backgroundColor: card.color, display: 'inline-flex' }}
                  >
                    {card.icon}
                  </div>
                  <span className="badge bg-light text-dark border px-2.5 py-1.5 fw-semibold rounded-pill">
                    {card.count}
                  </span>
                </div>

                {/* Info Text */}
                <Card.Title className="fw-bold fs-5 mb-2 text-dark">{card.name}</Card.Title>
                <Card.Text className="text-secondary small mb-0 flex-grow-1">
                  {card.desc}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Dashboard;
