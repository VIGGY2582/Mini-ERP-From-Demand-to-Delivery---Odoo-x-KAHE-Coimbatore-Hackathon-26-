import { Router } from 'express';
import * as employeesController from '../controllers/employeesController.js';

const router = Router();

router.get('/', employeesController.getAllEmployees);
router.post('/', employeesController.createEmployee);
router.put('/:id', employeesController.updateEmployee);
router.delete('/:id', employeesController.deleteEmployee);

export default router;
