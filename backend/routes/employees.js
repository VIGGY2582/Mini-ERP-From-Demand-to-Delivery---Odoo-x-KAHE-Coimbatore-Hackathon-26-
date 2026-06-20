import { authorize } from '../middleware/authorize.js';
import * as employeesController from '../controllers/employeesController.js';

router.use(authorize('Admin'));


router.get('/', employeesController.getAllEmployees);
router.post('/', employeesController.createEmployee);
router.put('/:id', employeesController.updateEmployee);
router.delete('/:id', employeesController.deleteEmployee);

export default router;
