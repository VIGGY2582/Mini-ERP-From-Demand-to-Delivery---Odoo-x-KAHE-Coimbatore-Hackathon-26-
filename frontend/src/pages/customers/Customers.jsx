import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert, Spinner } from 'react-bootstrap';
import { FiPlus, FiRefreshCw } from 'react-icons/fi';
import customerService from '../../services/customer.service.js';
import CustomerTable from '../../components/customers/CustomerTable.jsx';
import CustomerForm from '../../components/customers/CustomerForm.jsx';
import DeleteCustomerModal from '../../components/customers/DeleteCustomerModal.jsx';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [showForm, setShowForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [deletingCustomer, setDeletingCustomer] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await customerService.getCustomers();
      if (response.success) {
        setCustomers(response.data);
      } else {
        setError(response.message || 'Failed to fetch customers');
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch customers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleAddClick = () => {
    setEditingCustomer(null);
    setIsEditing(false);
    setShowForm(true);
  };

  const handleEditClick = (customer) => {
    setEditingCustomer(customer);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDeleteClick = (customer) => {
    setDeletingCustomer(customer);
    setShowDeleteModal(true);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (isEditing && editingCustomer) {
        await customerService.updateCustomer(editingCustomer.id, formData);
        setSuccess('Customer updated successfully');
      } else {
        await customerService.createCustomer(formData);
        setSuccess('Customer created successfully');
      }
      setShowForm(false);
      setEditingCustomer(null);
      fetchCustomers();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.message || 'Failed to save customer');
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await customerService.deleteCustomer(deletingCustomer.id);
      setSuccess('Customer deleted successfully');
      setShowDeleteModal(false);
      setDeletingCustomer(null);
      fetchCustomers();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.message || 'Failed to delete customer');
    }
  };

  return (
    <Container fluid className="px-0 py-2">
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2 className="fw-bold mb-1">Customers</h2>
              <p className="text-muted mb-0">Manage customer profiles and contact information</p>
            </div>
            <Button variant="primary" onClick={handleAddClick}>
              <FiPlus className="me-2" />
              Add Customer
            </Button>
          </div>
        </Col>
      </Row>

      {error && (
        <Alert variant="danger" dismissible onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert variant="success" dismissible onClose={() => setSuccess(null)}>
          {success}
        </Alert>
      )}

      <Row>
        <Col>
          <Card className="shadow-sm">
            <Card.Header className="bg-white border-bottom d-flex justify-content-between align-items-center">
              <span className="fw-semibold">All Customers</span>
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={fetchCustomers}
                disabled={loading}
              >
                <FiRefreshCw className={loading ? 'spin-animation' : ''} />
              </Button>
            </Card.Header>
            <Card.Body className="p-0">
              {loading ? (
                <div className="text-center py-5">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              ) : (
                <CustomerTable
                  customers={customers}
                  onEdit={handleEditClick}
                  onDelete={handleDeleteClick}
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                />
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <CustomerForm
        show={showForm}
        onHide={() => {
          setShowForm(false);
          setEditingCustomer(null);
          setIsEditing(false);
        }}
        onSubmit={handleFormSubmit}
        customer={editingCustomer}
        isEditing={isEditing}
      />

      <DeleteCustomerModal
        show={showDeleteModal}
        onHide={() => {
          setShowDeleteModal(false);
          setDeletingCustomer(null);
        }}
        onConfirm={handleDeleteConfirm}
        customer={deletingCustomer}
      />
    </Container>
  );
};

export default Customers;
