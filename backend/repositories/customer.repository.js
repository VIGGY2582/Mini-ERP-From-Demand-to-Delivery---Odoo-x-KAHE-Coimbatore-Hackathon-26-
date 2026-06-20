import prisma from '../config/prisma.js';

/**
 * Create a new customer.
 */
export const createCustomer = async (data) => {
  return prisma.customer.create({ data });
};

/**
 * Get all customers.
 */
export const getAllCustomers = async () => {
  return prisma.customer.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'desc' },
  });
};

/**
 * Get customer by ID.
 */
export const getCustomerById = async (id) => {
  return prisma.customer.findUnique({
    where: { id: Number(id) },
  });
};

/**
 * Get customer by customer code.
 */
export const getCustomerByCode = async (customerCode) => {
  return prisma.customer.findUnique({
    where: { customerCode },
  });
};

/**
 * Get customer by email.
 */
export const getCustomerByEmail = async (email) => {
  return prisma.customer.findUnique({
    where: { email },
  });
};

/**
 * Update customer.
 */
export const updateCustomer = async (id, data) => {
  return prisma.customer.update({
    where: { id: Number(id) },
    data,
  });
};

/**
 * Soft delete customer (deactivate).
 */
export const deleteCustomer = async (id) => {
  return prisma.customer.update({
    where: { id: Number(id) },
    data: { isActive: false },
  });
};
