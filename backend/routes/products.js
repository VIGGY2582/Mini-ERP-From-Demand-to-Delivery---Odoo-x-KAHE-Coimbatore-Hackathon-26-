import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { authorize } from '../middleware/authorize.js';
import * as productController from '../controllers/productController.js';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Create Product - Admin, Inventory, Manager
router.post('/', authorize('Admin', 'Inventory', 'Manager'), productController.createProduct);

// Get all Products - All authenticated users
router.get('/', productController.getProducts);

// Get Product by ID - All authenticated users
router.get('/:id', productController.getProductById);

// Update Product - Admin, Inventory, Manager
router.put('/:id', authorize('Admin', 'Inventory', 'Manager'), productController.updateProduct);

// Delete Product - Admin only
router.delete('/:id', authorize('Admin'), productController.deleteProduct);

export default router;
