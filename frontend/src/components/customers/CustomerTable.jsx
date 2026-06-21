import React from 'react';
import { Table, Button, Badge, Form, InputGroup } from 'react-bootstrap';
import { FiEdit2, FiTrash2, FiSearch } from 'react-icons/fi';

const CustomerTable = ({ customers, onEdit, onDelete, searchTerm, onSearchChange }) => {
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const filteredCustomers = customers.filter((customer) => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      customer.name?.toLowerCase().includes(searchLower) ||
      customer.customerCode?.toLowerCase().includes(searchLower) ||
      customer.email?.toLowerCase().includes(searchLower)
    );
  });

  if (!customers || customers.length === 0) {
    return (
      <div className="text-center py-5">
        <p className="text-muted mb-0">No customers found</p>
      </div>
    );
  }

  if (filteredCustomers.length === 0) {
    return (
      <div className="text-center py-5">
        <p className="text-muted mb-0">No customers match your search</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-3">
        <InputGroup>
          <InputGroup.Text>
            <FiSearch />
          </InputGroup.Text>
          <Form.Control
            placeholder="Search by name, code, or email..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </InputGroup>
      </div>
      <div className="table-responsive">
        <Table hover className="align-middle">
          <thead className="bg-light">
            <tr>
              <th className="ps-3">Customer Code</th>
              <th>Customer Name</th>
              <th>Contact Person</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th className="text-end pe-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer) => (
              <tr key={customer.id}>
                <td className="ps-3">
                  <code className="bg-light px-2 py-1 rounded">{customer.customerCode}</code>
                </td>
                <td>
                  <strong className="text-dark">{customer.name}</strong>
                </td>
                <td className="text-muted">
                  {customer.contactPerson || '-'}
                </td>
                <td className="text-muted">
                  {customer.email || '-'}
                </td>
                <td className="text-muted">
                  {customer.phone || '-'}
                </td>
                <td>
                  <Badge bg={customer.isActive ? 'success' : 'danger'}>
                    {customer.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </td>
                <td className="text-end pe-3">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="me-2"
                    onClick={() => onEdit(customer)}
                  >
                    <FiEdit2 size={14} />
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => onDelete(customer)}
                  >
                    <FiTrash2 size={14} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default CustomerTable;
