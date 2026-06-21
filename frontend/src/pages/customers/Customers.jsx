import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { FiPlus, FiRefreshCw } from 'react-icons/fi';
import customerService from '../../services/customer.service.js';
import CustomerTable from '../../components/customers/CustomerTable.jsx';
import CustomerForm from '../../components/customers/CustomerForm.jsx';
import DeleteCustomerModal from '../../components/customers/DeleteCustomerModal.jsx';
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import PageHeader from '../../components/common/PageHeader.jsx';

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
      <PageHeader
        title="Customers"
        subtitle="Manage customer profiles and contact information"
        onAdd={handleAddClick}
        onRefresh={fetchCustomers}
        loading={loading}
      />

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
            <Card.Header className="bg-white border-bottom">
              <span className="fw-semibold">All Customers</span>
            </Card.Header>
            <Card.Body className="p-0">
              {loading ? (
                <LoadingSpinner />
              ) : customers.length === 0 ? (
                <EmptyState
                  message="No customers found"
                  subMessage="Create your first customer to get started"
                />
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
