import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { authorize } from '../middleware/authorize.js';
import * as customerController from '../controllers/customerController.js';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Create Customer - Admin, Manager, Sales
router.post('/', authorize('Admin', 'Manager', 'Sales'), customerController.createCustomer);

// Get all Customers - Admin, Manager, Sales
router.get('/', authorize('Admin', 'Manager', 'Sales'), customerController.getCustomers);

// Get Customer by ID - Admin, Manager, Sales
router.get('/:id', authorize('Admin', 'Manager', 'Sales'), customerController.getCustomerById);

// Update Customer - Admin, Manager, Sales
router.put('/:id', authorize('Admin', 'Manager', 'Sales'), customerController.updateCustomer);

// Delete Customer - Admin only
router.delete('/:id', authorize('Admin'), customerController.deleteCustomer);

export default router;
