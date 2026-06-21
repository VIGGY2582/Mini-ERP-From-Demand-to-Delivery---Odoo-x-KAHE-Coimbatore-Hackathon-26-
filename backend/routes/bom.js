import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { authorize } from '../middleware/authorize.js';
import * as bomController from '../controllers/bom.controller.js';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Create BoM - Admin, Production
router.post('/', authorize('Admin', 'Production'), bomController.createBoM);

// Get all BoMs - Admin, Manager, Production
router.get('/', authorize('Admin', 'Manager', 'Production'), bomController.getAllBoMs);

// Get BoM by ID - Admin, Manager, Production
router.get('/:id', authorize('Admin', 'Manager', 'Production'), bomController.getBoMById);

// Update BoM - Admin, Production
router.put('/:id', authorize('Admin', 'Production'), bomController.updateBoM);

// Delete BoM - Admin only
router.delete('/:id', authorize('Admin'), bomController.deleteBoM);

export default router;
