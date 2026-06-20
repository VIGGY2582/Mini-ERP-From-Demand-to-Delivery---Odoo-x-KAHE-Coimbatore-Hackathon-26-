import { validationResult } from 'express-validator';
import categoryService from '../services/categoryService.js';
import asyncHandler from '../utils/asyncHandler.js';

// Create Category
export const createCategory = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, description } = req.body;
  const category = await categoryService.createCategory({ name, description });
  res.status(201).json(category);
});

// Get all Categories
export const getCategories = asyncHandler(async (req, res) => {
  const categories = await categoryService.getAllCategories();
  res.json(categories);
});

// Get Category by ID
export const getCategoryById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await categoryService.getCategoryById(parseInt(id, 10));
  if (!category) {
    return res.status(404).json({ error: 'Category not found' });
  }
  res.json(category);
});

// Update Category
export const updateCategory = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { id } = req.params;
  const { name, description } = req.body;
  const updated = await categoryService.updateCategory(parseInt(id, 10), { name, description });
  if (!updated) {
    return res.status(404).json({ error: 'Category not found' });
  }
  res.json(updated);
});

// Delete Category
export const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deleted = await categoryService.deleteCategory(parseInt(id, 10));
  if (!deleted) {
    return res.status(404).json({ error: 'Category not found' });
  }
  res.status(204).send();
});
