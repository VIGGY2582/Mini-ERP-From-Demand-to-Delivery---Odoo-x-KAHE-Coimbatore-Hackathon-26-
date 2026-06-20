import api from './api.js';

export const categoryService = {
  // Get all categories
  getCategories: async () => {
    const response = await api.get('/categories');
    return response.data;
  },

  // Get category by ID
  getCategoryById: async (id) => {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  },

  // Create new category
  createCategory: async (data) => {
    const response = await api.post('/categories', data);
    return response.data;
  },

  // Update category
  updateCategory: async (id, data) => {
    const response = await api.put(`/categories/${id}`, data);
    return response.data;
  },

  // Delete category
  deleteCategory: async (id) => {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
  },
};

export default categoryService;
