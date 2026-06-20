import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { authorize } from '../middleware/authorize.js';
import * as vendorController from '../controllers/vendorController.js';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Create Vendor - Admin, Manager, Purchase
router.post('/', authorize('Admin', 'Manager', 'Purchase'), vendorController.createVendor);

// Get all Vendors - Admin, Manager, Purchase
router.get('/', authorize('Admin', 'Manager', 'Purchase'), vendorController.getVendors);

// Get Vendor by ID - Admin, Manager, Purchase
router.get('/:id', authorize('Admin', 'Manager', 'Purchase'), vendorController.getVendorById);

// Update Vendor - Admin, Manager, Purchase
router.put('/:id', authorize('Admin', 'Manager', 'Purchase'), vendorController.updateVendor);

// Delete Vendor - Admin only
router.delete('/:id', authorize('Admin'), vendorController.deleteVendor);

export default router;
