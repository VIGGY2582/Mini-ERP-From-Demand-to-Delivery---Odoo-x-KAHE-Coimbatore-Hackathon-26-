import prisma from '../config/prisma.js';

/**
 * Create a new product.
 */
export const createProduct = async (data) => {
  return prisma.product.create({ data });
};

/**
 * Get all products.
 */
export const getProducts = async () => {
  return prisma.product.findMany({
    where: { isActive: true },
    include: {
      category: true,
      vendor: true,
    },
    orderBy: { createdAt: 'desc' },
  });
};

/**
 * Get product by ID.
 */
export const getProductById = async (id) => {
  return prisma.product.findUnique({
    where: { id: Number(id) },
    include: {
      category: true,
      vendor: true,
    },
  });
};

/**
 * Get product by SKU.
 */
export const getProductBySku = async (sku) => {
  return prisma.product.findUnique({
    where: { sku },
    include: {
      category: true,
      vendor: true,
    },
  });
};

/**
 * Update product.
 */
export const updateProduct = async (id, data) => {
  return prisma.product.update({
    where: { id: Number(id) },
    data,
    include: {
      category: true,
      vendor: true,
    },
  });
};

/**
 * Soft delete product (deactivate).
 */
export const deleteProduct = async (id) => {
  return prisma.product.update({
    where: { id: Number(id) },
    data: { isActive: false },
  });
};
