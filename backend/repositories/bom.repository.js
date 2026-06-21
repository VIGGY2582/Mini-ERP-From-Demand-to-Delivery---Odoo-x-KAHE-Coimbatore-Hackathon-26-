import prisma from '../config/prisma.js';

/**
 * Create a new BoM.
 */
export const createBoM = async (data) => {
  return prisma.boM.create({
    data,
    include: {
      product: true,
      lines: true,
    },
  });
};

/**
 * Create BoM lines.
 */
export const createBoMLines = async (lines) => {
  return prisma.boMLine.createMany({
    data: lines,
  });
};

/**
 * Get all BoMs.
 */
export const getAllBoMs = async () => {
  return prisma.boM.findMany({
    include: {
      product: true,
      lines: true,
    },
    orderBy: { createdAt: 'desc' },
  });
};

/**
 * Get BoM by ID.
 */
export const getBoMById = async (id) => {
  return prisma.boM.findUnique({
    where: { id: Number(id) },
    include: {
      product: true,
      lines: true,
    },
  });
};

/**
 * Get BoM by product ID.
 */
export const getBoMByProductId = async (productId) => {
  return prisma.boM.findUnique({
    where: { productId: Number(productId) },
    include: {
      product: true,
      lines: true,
    },
  });
};

/**
 * Get active BoM by product ID.
 */
export const getActiveBoMByProductId = async (productId) => {
  return prisma.boM.findFirst({
    where: {
      productId: Number(productId),
      isActive: true,
    },
    include: {
      product: true,
      lines: true,
    },
  });
};

/**
 * Update BoM.
 */
export const updateBoM = async (id, data) => {
  return prisma.boM.update({
    where: { id: Number(id) },
    data,
    include: {
      product: true,
      lines: true,
    },
  });
};

/**
 * Delete BoM (soft delete by deactivating).
 */
export const deleteBoM = async (id) => {
  return prisma.boM.update({
    where: { id: Number(id) },
    data: { isActive: false },
  });
};

/**
 * Delete BoM lines by BoM ID.
 */
export const deleteBoMLinesByBomId = async (bomId) => {
  return prisma.boMLine.deleteMany({
    where: { bomId: Number(bomId) },
  });
};
