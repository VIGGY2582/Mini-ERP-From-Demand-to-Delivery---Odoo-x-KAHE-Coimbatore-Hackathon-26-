import React from 'react';
import { Table, Button, Badge } from 'react-bootstrap';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

const CategoryTable = ({ categories, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (!categories || categories.length === 0) {
    return (
      <div className="text-center py-5">
        <p className="text-muted mb-0">No categories found</p>
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <Table hover className="align-middle">
        <thead className="bg-light">
          <tr>
            <th className="ps-3">Category Name</th>
            <th>Description</th>
            <th>Created Date</th>
            <th className="text-end pe-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td className="ps-3">
                <strong className="text-dark">{category.name}</strong>
              </td>
              <td className="text-muted">
                {category.description || '-'}
              </td>
              <td className="text-muted">
                {formatDate(category.createdAt)}
              </td>
              <td className="text-end pe-3">
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="me-2"
                  onClick={() => onEdit(category)}
                >
                  <FiEdit2 size={14} />
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => onDelete(category)}
                >
                  <FiTrash2 size={14} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CategoryTable;
