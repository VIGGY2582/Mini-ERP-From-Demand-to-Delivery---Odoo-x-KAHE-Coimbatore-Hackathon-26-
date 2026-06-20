import vendorService from '../services/vendorService.js';
import asyncHandler from '../utils/asyncHandler.js';

// Create Vendor
export const createVendor = asyncHandler(async (req, res) => {
  const result = await vendorService.createVendor(req.body);
  res.status(201).json(result);
});

// Get all Vendors
export const getVendors = asyncHandler(async (req, res) => {
  const result = await vendorService.getAllVendors();
  res.json(result);
});

// Get Vendor by ID
export const getVendorById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await vendorService.getVendorById(parseInt(id, 10));
  res.json(result);
});

// Update Vendor
export const updateVendor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await vendorService.updateVendor(parseInt(id, 10), req.body);
  res.json(result);
});

// Delete Vendor
export const deleteVendor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await vendorService.deleteVendor(parseInt(id, 10));
  res.json(result);
});
