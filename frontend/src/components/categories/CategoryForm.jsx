import React, { useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { FiX } from 'react-icons/fi';

const CategoryForm = ({ show, onHide, onSubmit, category, isEditing }) => {
  const [formData, setFormData] = React.useState({
    name: '',
    description: '',
  });
  const [validated, setValidated] = React.useState(false);

  useEffect(() => {
    if (category && isEditing) {
      setFormData({
        name: category.name || '',
        description: category.description || '',
      });
    } else {
      setFormData({
        name: '',
        description: '',
      });
    }
    setValidated(false);
  }, [category, isEditing, show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    onSubmit(formData);
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {isEditing ? 'Edit Category' : 'Add New Category'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Category Name *</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter category name"
              required
              isInvalid={validated && !formData.name.trim()}
            />
            <Form.Control.Feedback type="invalid">
              Category name is required.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter category description"
              rows={3}
            />
          </Form.Group>

          <div className="d-flex justify-content-end gap-2 mt-4">
            <Button variant="secondary" onClick={onHide}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {isEditing ? 'Update Category' : 'Create Category'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CategoryForm;
