import prisma from '../config/prisma.js';

/**
 * Get inventory by product ID.
 */
export const getInventoryByProductId = async (productId) => {
  return prisma.inventory.findUnique({
    where: { productId: Number(productId) },
    include: { product: true },
  });
};

/**
 * Update inventory quantity.
 */
export const updateInventoryQuantity = async (productId, quantity) => {
  return prisma.inventory.update({
    where: { productId: Number(productId) },
    data: { quantity: Number(quantity) },
  });
};

/**
 * Create inventory for a product.
 */
export const createInventory = async (productId) => {
  return prisma.inventory.create({
    data: {
      productId: Number(productId),
      quantity: 0,
    },
  });
};
