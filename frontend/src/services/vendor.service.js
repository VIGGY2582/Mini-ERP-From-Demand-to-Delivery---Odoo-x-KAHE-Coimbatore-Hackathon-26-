import api from './api.js';

export const vendorService = {
  // Get all vendors
  getVendors: async () => {
    const response = await api.get('/vendors');
    return response.data;
  },

  // Get vendor by ID
  getVendorById: async (id) => {
    const response = await api.get(`/vendors/${id}`);
    return response.data;
  },

  // Create new vendor
  createVendor: async (data) => {
    const response = await api.post('/vendors', data);
    return response.data;
  },

  // Update vendor
  updateVendor: async (id, data) => {
    const response = await api.put(`/vendors/${id}`, data);
    return response.data;
  },

  // Delete vendor
  deleteVendor: async (id) => {
    const response = await api.delete(`/vendors/${id}`);
    return response.data;
  },
};

export default vendorService;
