import prisma from '../config/prisma.js';

/**
 * Create a new vendor.
 */
export const createVendor = async (data) => {
  return prisma.vendor.create({ data });
};

/**
 * Get all vendors.
 */
export const getAllVendors = async () => {
  return prisma.vendor.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'desc' },
  });
};

/**
 * Get vendor by ID.
 */
export const getVendorById = async (id) => {
  return prisma.vendor.findUnique({
    where: { id: Number(id) },
  });
};

/**
 * Get vendor by vendor code.
 */
export const getVendorByCode = async (vendorCode) => {
  return prisma.vendor.findUnique({
    where: { vendorCode },
  });
};

/**
 * Get vendor by email.
 */
export const getVendorByEmail = async (email) => {
  return prisma.vendor.findUnique({
    where: { email },
  });
};

/**
 * Update vendor.
 */
export const updateVendor = async (id, data) => {
  return prisma.vendor.update({
    where: { id: Number(id) },
    data,
  });
};

/**
 * Soft delete vendor (deactivate).
 */
export const deleteVendor = async (id) => {
  return prisma.vendor.update({
    where: { id: Number(id) },
    data: { isActive: false },
  });
};
