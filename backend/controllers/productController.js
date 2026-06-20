import productService from '../services/productService.js';
import asyncHandler from '../utils/asyncHandler.js';

// Create Product
export const createProduct = asyncHandler(async (req, res) => {
  const result = await productService.createProduct(req.body);
  res.status(201).json(result);
});

// Get all Products
export const getProducts = asyncHandler(async (req, res) => {
  const result = await productService.getProducts();
  res.json(result);
});

// Get Product by ID
export const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await productService.getProductById(parseInt(id, 10));
  res.json(result);
});

// Update Product
export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await productService.updateProduct(parseInt(id, 10), req.body);
  res.json(result);
});

// Delete Product
export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await productService.deleteProduct(parseInt(id, 10));
  res.json(result);
});
