import { Router } from 'express';
import * as rolesController from '../controllers/rolesController.js';

const router = Router();

router.get('/', rolesController.getAllRoles);

export default router;
