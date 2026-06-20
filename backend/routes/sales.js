import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { authorize } from '../middleware/authorize.js';
import * as salesController from '../controllers/salesController.js';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Create Sales Order - Admin, Sales
router.post('/', authorize('Admin', 'Sales'), salesController.createSalesOrder);

// Get all Sales Orders - Admin, Manager, Sales
router.get('/', authorize('Admin', 'Manager', 'Sales'), salesController.getSalesOrders);

// Get Sales Order by ID - Admin, Manager, Sales
router.get('/:id', authorize('Admin', 'Manager', 'Sales'), salesController.getSalesOrderById);

// Update Sales Order Status - Admin, Sales
router.put('/:id/status', authorize('Admin', 'Sales'), salesController.updateSalesOrderStatus);

export default router;
