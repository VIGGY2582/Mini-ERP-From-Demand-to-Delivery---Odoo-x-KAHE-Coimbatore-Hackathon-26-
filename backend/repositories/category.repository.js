import prisma from '../config/prisma.js';

/**
 * Create a new category.
 */
export const createCategory = async (data) => {
  return prisma.category.create({ data });
};

/**
 * Get all categories.
 */
export const getCategories = async () => {
  return prisma.category.findMany({
    orderBy: { createdAt: 'desc' },
  });
};

/**
 * Get category by ID.
 */
export const getCategoryById = async (id) => {
  return prisma.category.findUnique({
    where: { id: Number(id) },
  });
};

/**
 * Get category by name.
 */
export const getCategoryByName = async (name) => {
  return prisma.category.findUnique({
    where: { name },
  });
};

/**
 * Update category.
 */
export const updateCategory = async (id, data) => {
  return prisma.category.update({
    where: { id: Number(id) },
    data,
  });
};

/**
 * Delete category.
 */
export const deleteCategory = async (id) => {
  return prisma.category.delete({
    where: { id: Number(id) },
  });
};
