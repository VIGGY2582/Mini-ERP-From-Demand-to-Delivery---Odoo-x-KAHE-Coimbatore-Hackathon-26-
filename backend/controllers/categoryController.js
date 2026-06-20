import categoryService from '../services/categoryService.js';
import asyncHandler from '../utils/asyncHandler.js';

// Create Category
export const createCategory = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const result = await categoryService.createCategory({ name, description });
  res.status(201).json(result);
});

// Get all Categories
export const getCategories = asyncHandler(async (req, res) => {
  const result = await categoryService.getAllCategories();
  res.json(result);
});

// Get Category by ID
export const getCategoryById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await categoryService.getCategoryById(parseInt(id, 10));
  res.json(result);
});

// Update Category
export const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const result = await categoryService.updateCategory(parseInt(id, 10), { name, description });
  res.json(result);
});

// Delete Category
export const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await categoryService.deleteCategory(parseInt(id, 10));
  res.status(200).json(result);
});
