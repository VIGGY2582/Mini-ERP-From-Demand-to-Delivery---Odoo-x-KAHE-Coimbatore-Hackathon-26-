import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert, Spinner } from 'react-bootstrap';
import { FiPlus, FiRefreshCw } from 'react-icons/fi';
import vendorService from '../../services/vendor.service.js';
import VendorTable from '../../components/vendors/VendorTable.jsx';
import VendorForm from '../../components/vendors/VendorForm.jsx';
import DeleteVendorModal from '../../components/vendors/DeleteVendorModal.jsx';

const Vendors = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [showForm, setShowForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingVendor, setEditingVendor] = useState(null);
  const [deletingVendor, setDeletingVendor] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const fetchVendors = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await vendorService.getVendors();
      if (response.success) {
        setVendors(response.data);
      } else {
        setError(response.message || 'Failed to fetch vendors');
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch vendors');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  const handleAddClick = () => {
    setEditingVendor(null);
    setIsEditing(false);
    setShowForm(true);
  };

  const handleEditClick = (vendor) => {
    setEditingVendor(vendor);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDeleteClick = (vendor) => {
    setDeletingVendor(vendor);
    setShowDeleteModal(true);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (isEditing && editingVendor) {
        await vendorService.updateVendor(editingVendor.id, formData);
        setSuccess('Vendor updated successfully');
      } else {
        await vendorService.createVendor(formData);
        setSuccess('Vendor created successfully');
      }
      setShowForm(false);
      setEditingVendor(null);
      fetchVendors();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.message || 'Failed to save vendor');
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await vendorService.deleteVendor(deletingVendor.id);
      setSuccess('Vendor deleted successfully');
      setShowDeleteModal(false);
      setDeletingVendor(null);
      fetchVendors();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.message || 'Failed to delete vendor');
    }
  };

  return (
    <Container fluid className="px-0 py-2">
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2 className="fw-bold mb-1">Vendors</h2>
              <p className="text-muted mb-0">Manage vendor profiles and supplier information</p>
            </div>
            <Button variant="primary" onClick={handleAddClick}>
              <FiPlus className="me-2" />
              Add Vendor
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
              <span className="fw-semibold">All Vendors</span>
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={fetchVendors}
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
                <VendorTable
                  vendors={vendors}
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

      <VendorForm
        show={showForm}
        onHide={() => {
          setShowForm(false);
          setEditingVendor(null);
          setIsEditing(false);
        }}
        onSubmit={handleFormSubmit}
        vendor={editingVendor}
        isEditing={isEditing}
      />

      <DeleteVendorModal
        show={showDeleteModal}
        onHide={() => {
          setShowDeleteModal(false);
          setDeletingVendor(null);
        }}
        onConfirm={handleDeleteConfirm}
        vendor={deletingVendor}
      />
    </Container>
  );
};

export default Vendors;
