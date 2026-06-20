import prisma from '../config/prisma.js';

/**
 * Create a new sales order.
 */
export const createSalesOrder = async (data) => {
  return prisma.salesOrder.create({
    data,
    include: {
      customer: true,
      lines: {
        include: {
          product: true,
        },
      },
    },
  });
};

/**
 * Create sales order lines.
 */
export const createSalesOrderLines = async (lines) => {
  return prisma.salesOrderLine.createMany({
    data: lines,
  });
};

/**
 * Get all sales orders.
 */
export const getSalesOrders = async () => {
  return prisma.salesOrder.findMany({
    include: {
      customer: true,
      lines: {
        include: {
          product: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
};

/**
 * Get sales order by ID.
 */
export const getSalesOrderById = async (id) => {
  return prisma.salesOrder.findUnique({
    where: { id: Number(id) },
    include: {
      customer: true,
      lines: {
        include: {
          product: true,
        },
      },
    },
  });
};

/**
 * Update sales order status.
 */
export const updateSalesOrderStatus = async (id, status) => {
  return prisma.salesOrder.update({
    where: { id: Number(id) },
    data: { status },
    include: {
      customer: true,
      lines: {
        include: {
          product: true,
        },
      },
    },
  });
};
