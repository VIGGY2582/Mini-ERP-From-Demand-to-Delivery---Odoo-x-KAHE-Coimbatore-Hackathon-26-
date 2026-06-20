import salesService from '../services/salesService.js';
import asyncHandler from '../utils/asyncHandler.js';

// Create Sales Order
export const createSalesOrder = asyncHandler(async (req, res) => {
  const result = await salesService.createSalesOrder(req.body);
  res.status(201).json(result);
});

// Get all Sales Orders
export const getSalesOrders = asyncHandler(async (req, res) => {
  const result = await salesService.getSalesOrders();
  res.json(result);
});

// Get Sales Order by ID
export const getSalesOrderById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await salesService.getSalesOrderById(parseInt(id, 10));
  res.json(result);
});

// Update Sales Order Status
export const updateSalesOrderStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const result = await salesService.updateSalesOrderStatus(parseInt(id, 10), status);
  res.json(result);
});
