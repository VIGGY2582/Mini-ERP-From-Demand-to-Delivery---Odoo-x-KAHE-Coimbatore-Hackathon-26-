import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { FiPlus, FiRefreshCw } from 'react-icons/fi';
import categoryService from '../../services/category.service.js';
import CategoryTable from '../../components/categories/CategoryTable.jsx';
import CategoryForm from '../../components/categories/CategoryForm.jsx';
import DeleteCategoryModal from '../../components/categories/DeleteCategoryModal.jsx';
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import PageHeader from '../../components/common/PageHeader.jsx';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [deletingCategory, setDeletingCategory] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await categoryService.getCategories();
      if (response.success) {
        setCategories(response.data);
      } else {
        setError(response.message || 'Failed to fetch categories');
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddClick = () => {
    setEditingCategory(null);
    setIsEditing(false);
    setShowForm(true);
  };

  const handleEditClick = (category) => {
    setEditingCategory(category);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDeleteClick = (category) => {
    setDeletingCategory(category);
    setShowDeleteModal(true);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (isEditing && editingCategory) {
        await categoryService.updateCategory(editingCategory.id, formData);
        setSuccess('Category updated successfully');
      } else {
        await categoryService.createCategory(formData);
        setSuccess('Category created successfully');
      }
      setShowForm(false);
      setEditingCategory(null);
      fetchCategories();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.message || 'Failed to save category');
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await categoryService.deleteCategory(deletingCategory.id);
      setSuccess('Category deleted successfully');
      setShowDeleteModal(false);
      setDeletingCategory(null);
      fetchCategories();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.message || 'Failed to delete category');
    }
  };

  return (
    <Container fluid className="px-0 py-2">
      <PageHeader
        title="Categories"
        subtitle="Manage product categories"
        onAdd={handleAddClick}
        onRefresh={fetchCategories}
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
              <span className="fw-semibold">All Categories</span>
            </Card.Header>
            <Card.Body className="p-0">
              {loading ? (
                <LoadingSpinner />
              ) : categories.length === 0 ? (
                <EmptyState
                  message="No categories found"
                  subMessage="Create your first category to get started"
                />
              ) : (
                <CategoryTable
                  categories={categories}
                  onEdit={handleEditClick}
                  onDelete={handleDeleteClick}
                />
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <CategoryForm
        show={showForm}
        onHide={() => {
          setShowForm(false);
          setEditingCategory(null);
          setIsEditing(false);
        }}
        onSubmit={handleFormSubmit}
        category={editingCategory}
        isEditing={isEditing}
      />

      <DeleteCategoryModal
        show={showDeleteModal}
        onHide={() => {
          setShowDeleteModal(false);
          setDeletingCategory(null);
        }}
        onConfirm={handleDeleteConfirm}
        category={deletingCategory}
      />
    </Container>
  );
};

export default Categories;
