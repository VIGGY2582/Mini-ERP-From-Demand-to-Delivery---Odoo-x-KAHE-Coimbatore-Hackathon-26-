import * as salesRepository from '../repositories/sales.repository.js';
import * as customerRepository from '../repositories/customer.repository.js';
import * as productRepository from '../repositories/product.repository.js';
import * as inventoryRepository from '../repositories/inventory.repository.js';

/**
 * Create a new sales order with validation.
 */
export const createSalesOrder = async (data) => {
  const { customerId, lines } = data;

  // Validate customer exists
  const customer = await customerRepository.getCustomerById(customerId);
  if (!customer) {
    const error = new Error('Customer not found');
    error.statusCode = 404;
    throw error;
  }

  // Validate lines
  if (!lines || lines.length === 0) {
    const error = new Error('At least one order line is required');
    error.statusCode = 400;
    throw error;
  }

  let totalAmount = 0;
  const orderLines = [];

  // Validate each line and calculate totals
  for (const line of lines) {
    const { productId, quantity, unitPrice } = line;

    if (!productId) {
      const error = new Error('Product ID is required');
      error.statusCode = 400;
      throw error;
    }

    if (!quantity || quantity <= 0) {
      const error = new Error('Quantity must be greater than 0');
      error.statusCode = 400;
      throw error;
    }

    if (unitPrice === undefined || unitPrice === null || unitPrice < 0) {
      const error = new Error('Unit price must be greater than or equal to 0');
      error.statusCode = 400;
      throw error;
    }

    // Verify product exists
    const product = await productRepository.getProductById(productId);
    if (!product) {
      const error = new Error(`Product with ID ${productId} not found`);
      error.statusCode = 404;
      throw error;
    }

    // Check inventory exists
    let inventory = await inventoryRepository.getInventoryByProductId(productId);
    if (!inventory) {
      // Create inventory if it doesn't exist
      inventory = await inventoryRepository.createInventory(productId);
    }

    // Check sufficient stock
    if (inventory.quantity < quantity) {
      const error = new Error(`Insufficient available stock for product ${product.name}. Available: ${inventory.quantity}, Required: ${quantity}`);
      error.statusCode = 400;
      throw error;
    }

    // Reserve inventory
    await inventoryRepository.updateInventoryQuantity(productId, inventory.quantity - quantity);

    const lineTotal = quantity * unitPrice;
    totalAmount += lineTotal;

    orderLines.push({
      productId,
      quantity,
      unitPrice,
      lineTotal,
    });
  }

  // Create sales order
  const salesOrder = await salesRepository.createSalesOrder({
    customerId: Number(customerId),
    orderDate: new Date(),
    status: 'DRAFT',
    totalAmount,
  });

  // Create order lines with salesOrderId
  const linesWithOrderId = orderLines.map((line) => ({
    ...line,
    salesOrderId: salesOrder.id,
  }));

  await salesRepository.createSalesOrderLines(linesWithOrderId);

  // Fetch the complete order with lines
  const completeOrder = await salesRepository.getSalesOrderById(salesOrder.id);

  return {
    success: true,
    message: 'Sales order created successfully',
    data: completeOrder,
  };
};

/**
 * Get all sales orders.
 */
export const getSalesOrders = async () => {
  const salesOrders = await salesRepository.getSalesOrders();
  return {
    success: true,
    message: 'Sales orders retrieved successfully',
    data: salesOrders,
  };
};

/**
 * Get sales order by ID.
 */
export const getSalesOrderById = async (id) => {
  const salesOrder = await salesRepository.getSalesOrderById(id);
  if (!salesOrder) {
    const error = new Error('Sales order not found');
    error.statusCode = 404;
    throw error;
  }
  return {
    success: true,
    message: 'Sales order retrieved successfully',
    data: salesOrder,
  };
};

/**
 * Update sales order status.
 */
export const updateSalesOrderStatus = async (id, status) => {
  const validStatuses = ['DRAFT', 'CONFIRMED', 'DELIVERED', 'CANCELLED'];

  if (!validStatuses.includes(status)) {
    const error = new Error('Invalid status. Must be one of: DRAFT, CONFIRMED, DELIVERED, CANCELLED');
    error.statusCode = 400;
    throw error;
  }

  // Get current order
  const currentOrder = await salesRepository.getSalesOrderById(id);
  if (!currentOrder) {
    const error = new Error('Sales order not found');
    error.statusCode = 404;
    throw error;
  }

  // If cancelling, release reserved inventory
  if (status === 'CANCELLED' && currentOrder.status !== 'CANCELLED') {
    for (const line of currentOrder.lines) {
      const inventory = await inventoryRepository.getInventoryByProductId(line.productId);
      if (inventory) {
        await inventoryRepository.updateInventoryQuantity(
          line.productId,
          inventory.quantity + line.quantity
        );
      }
    }
  }

  const updatedOrder = await salesRepository.updateSalesOrderStatus(id, status);

  return {
    success: true,
    message: 'Sales order status updated successfully',
    data: updatedOrder,
  };
};
