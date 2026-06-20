import * as categoryRepository from '../repositories/category.repository.js';

/**
 * Create a new category with validation.
 */
export const createCategory = async (data) => {
  const { name, description } = data;

  // Trim whitespace
  const trimmedName = name.trim();
  const trimmedDescription = description ? description.trim() : null;

  // Check if category name is provided
  if (!trimmedName) {
    const error = new Error('Category name is required');
    error.statusCode = 400;
    throw error;
  }

  // Check for duplicate category name
  const existingCategory = await categoryRepository.getCategoryByName(trimmedName);
  if (existingCategory) {
    const error = new Error('Category already exists');
    error.statusCode = 409;
    throw error;
  }

  const category = await categoryRepository.createCategory({
    name: trimmedName,
    description: trimmedDescription,
  });

  return {
    success: true,
    message: 'Category created successfully',
    data: category,
  };
};

/**
 * Get all categories.
 */
export const getAllCategories = async () => {
  const categories = await categoryRepository.getCategories();
  return {
    success: true,
    message: 'Categories retrieved successfully',
    data: categories,
  };
};

/**
 * Get category by ID.
 */
export const getCategoryById = async (id) => {
  const category = await categoryRepository.getCategoryById(id);
  if (!category) {
    const error = new Error('Category not found');
    error.statusCode = 404;
    throw error;
  }
  return {
    success: true,
    message: 'Category retrieved successfully',
    data: category,
  };
};

/**
 * Update category with validation.
 */
export const updateCategory = async (id, data) => {
  const { name, description } = data;

  // Trim whitespace
  const trimmedName = name ? name.trim() : undefined;
  const trimmedDescription = description !== undefined ? description.trim() : undefined;

  // Check if category exists
  const existingCategory = await categoryRepository.getCategoryById(id);
  if (!existingCategory) {
    const error = new Error('Category not found');
    error.statusCode = 404;
    throw error;
  }

  // If name is being updated, check for duplicate
  if (trimmedName && trimmedName !== existingCategory.name) {
    const duplicateCategory = await categoryRepository.getCategoryByName(trimmedName);
    if (duplicateCategory) {
      const error = new Error('Category already exists');
      error.statusCode = 409;
      throw error;
    }
  }

  const updateData = {};
  if (trimmedName !== undefined) updateData.name = trimmedName;
  if (trimmedDescription !== undefined) updateData.description = trimmedDescription;

  const updatedCategory = await categoryRepository.updateCategory(id, updateData);

  return {
    success: true,
    message: 'Category updated successfully',
    data: updatedCategory,
  };
};

/**
 * Delete category.
 */
export const deleteCategory = async (id) => {
  // Check if category exists
  const existingCategory = await categoryRepository.getCategoryById(id);
  if (!existingCategory) {
    const error = new Error('Category not found');
    error.statusCode = 404;
    throw error;
  }

  await categoryRepository.deleteCategory(id);

  return {
    success: true,
    message: 'Category deleted successfully',
  };
};
