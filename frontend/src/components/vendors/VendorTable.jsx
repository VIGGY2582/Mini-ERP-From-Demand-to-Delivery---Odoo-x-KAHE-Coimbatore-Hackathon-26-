import React from 'react';
import { Table, Button, Badge, Form, InputGroup } from 'react-bootstrap';
import { FiEdit2, FiTrash2, FiSearch } from 'react-icons/fi';

const VendorTable = ({ vendors, onEdit, onDelete, searchTerm, onSearchChange }) => {
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const filteredVendors = vendors.filter((vendor) => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      vendor.name?.toLowerCase().includes(searchLower) ||
      vendor.vendorCode?.toLowerCase().includes(searchLower) ||
      vendor.email?.toLowerCase().includes(searchLower)
    );
  });

  if (!vendors || vendors.length === 0) {
    return (
      <div className="text-center py-5">
        <p className="text-muted mb-0">No vendors found</p>
      </div>
    );
  }

  if (filteredVendors.length === 0) {
    return (
      <div className="text-center py-5">
        <p className="text-muted mb-0">No vendors match your search</p>
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
              <th className="ps-3">Vendor Code</th>
              <th>Vendor Name</th>
              <th>Contact Person</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th className="text-end pe-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredVendors.map((vendor) => (
              <tr key={vendor.id}>
                <td className="ps-3">
                  <code className="bg-light px-2 py-1 rounded">{vendor.vendorCode}</code>
                </td>
                <td>
                  <strong className="text-dark">{vendor.name}</strong>
                </td>
                <td className="text-muted">
                  {vendor.contactPerson || '-'}
                </td>
                <td className="text-muted">
                  {vendor.email || '-'}
                </td>
                <td className="text-muted">
                  {vendor.phone || '-'}
                </td>
                <td>
                  <Badge bg={vendor.isActive ? 'success' : 'danger'}>
                    {vendor.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </td>
                <td className="text-end pe-3">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="me-2"
                    onClick={() => onEdit(vendor)}
                  >
                    <FiEdit2 size={14} />
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => onDelete(vendor)}
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

export default VendorTable;
