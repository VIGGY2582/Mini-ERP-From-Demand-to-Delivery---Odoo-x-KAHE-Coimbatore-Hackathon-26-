import prisma from '../config/prisma.js';

export const findById = async (id) => {
  return prisma.employee.findUnique({
    where: { id: Number(id) },
    include: { role: true },
  });
};

export const findByEmail = async (email) => {
  return prisma.employee.findUnique({
    where: { email },
    include: { role: true },
  });
};
