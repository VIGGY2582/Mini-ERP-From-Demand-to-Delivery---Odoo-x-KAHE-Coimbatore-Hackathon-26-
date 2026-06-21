import api from './api.js';

export const customerService = {
  // Get all customers
  getCustomers: async () => {
    const response = await api.get('/customers');
    return response.data;
  },

  // Get customer by ID
  getCustomerById: async (id) => {
    const response = await api.get(`/customers/${id}`);
    return response.data;
  },

  // Create new customer
  createCustomer: async (data) => {
    const response = await api.post('/customers', data);
    return response.data;
  },

  // Update customer
  updateCustomer: async (id, data) => {
    const response = await api.put(`/customers/${id}`, data);
    return response.data;
  },

  // Delete customer
  deleteCustomer: async (id) => {
    const response = await api.delete(`/customers/${id}`);
    return response.data;
  },
};

export default customerService;
