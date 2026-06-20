import prisma from '../config/prisma.js';

/**
 * Create a new employee.
 */
export const create = async (data) => {
  return prisma.employee.create({ data });
};

/**
 * Find employee by ID.
 */
export const findById = async (id) => {
  return prisma.employee.findUnique({
    where: { id: Number(id) },
    include: { role: true },
  });
};

/**
 * Find employee by email.
 */
export const findByEmail = async (email) => {
  return prisma.employee.findUnique({ where: { email } });
};

/**
 * Find employee by employeeCode.
 */
export const findByCode = async (code) => {
  return prisma.employee.findUnique({ where: { employeeCode: code } });
};

/**
 * Get all employees with role information.
 */
export const findAll = async () => {
  return prisma.employee.findMany({ include: { role: true } });
};

/**
 * Update employee fields.
 */
export const update = async (id, data) => {
  return prisma.employee.update({
    where: { id: Number(id) },
    data,
  });
};

/**
 * Soft‑delete (deactivate) an employee.
 */
export const deactivate = async (id) => {
  return prisma.employee.update({
    where: { id: Number(id) },
    data: { isActive: false },
  });
};
