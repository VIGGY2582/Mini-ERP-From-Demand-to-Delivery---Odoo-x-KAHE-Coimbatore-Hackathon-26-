import customerService from '../services/customerService.js';
import asyncHandler from '../utils/asyncHandler.js';

// Create Customer
export const createCustomer = asyncHandler(async (req, res) => {
  const result = await customerService.createCustomer(req.body);
  res.status(201).json(result);
});

// Get all Customers
export const getCustomers = asyncHandler(async (req, res) => {
  const result = await customerService.getAllCustomers();
  res.json(result);
});

// Get Customer by ID
export const getCustomerById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await customerService.getCustomerById(parseInt(id, 10));
  res.json(result);
});

// Update Customer
export const updateCustomer = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await customerService.updateCustomer(parseInt(id, 10), req.body);
  res.json(result);
});

// Delete Customer
export const deleteCustomer = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await customerService.deleteCustomer(parseInt(id, 10));
  res.json(result);
});
