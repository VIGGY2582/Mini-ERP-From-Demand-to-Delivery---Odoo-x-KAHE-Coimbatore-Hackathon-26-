import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { authorize } from '../middleware/authorize.js';
import * as categoryController from '../controllers/categoryController.js';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Create Category - Admin and Manager only
router.post('/', authorize('Admin', 'Manager'), categoryController.createCategory);

// Get all Categories - All authenticated users
router.get('/', categoryController.getCategories);

// Get Category by ID - All authenticated users
router.get('/:id', categoryController.getCategoryById);

// Update Category - Admin and Manager only
router.put('/:id', authorize('Admin', 'Manager'), categoryController.updateCategory);

// Delete Category - Admin only
router.delete('/:id', authorize('Admin'), categoryController.deleteCategory);

export default router;
