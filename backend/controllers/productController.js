import asyncHandler from 'express-async-handler';
import * as productService from '../services/productService.js';
import { validate } from '../middleware/validation.js';
import { body, param } from 'express-validator';
import auth from '../middleware/auth.js';

// Create Product
export const createProduct = asyncHandler(async (req, res) => {
  const product = await productService.createProduct(req.body);
  // Create inventory with default quantity 0
  await productService.createInventoryForProduct(product.id);
  res.status(201).json(product);
});

// Get all Products
export const getProducts = asyncHandler(async (req, res) => {
  const products = await productService.getProducts();
  res.json(products);
});

// Get Product by ID
export const getProductById = asyncHandler(async (req, res) => {
  const product = await productService.getProductById(Number(req.params.id));
  if (!product) {
    res.status(404).json({ error: 'Product not found' });
    return;
  }
  res.json(product);
});

// Update Product
export const updateProduct = asyncHandler(async (req, res) => {
  const updated = await productService.updateProduct(Number(req.params.id), req.body);
  if (!updated) {
    res.status(404).json({ error: 'Product not found' });
    return;
  }
  res.json(updated);
});

// Delete Product
export const deleteProduct = asyncHandler(async (req, res) => {
  const deleted = await productService.deleteProduct(Number(req.params.id));
  if (!deleted) {
    res.status(404).json({ error: 'Product not found' });
    return;
  }
  res.status(204).send();
});
