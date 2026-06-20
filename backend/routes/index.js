import { Router } from 'express';
import authRouter from './auth.js';
import employeesRouter from './employees.js';
import rolesRouter from './roles.js';
import productsRouter from './products.js';
import categoriesRouter from './categories.js';
import customersRouter from './customers.js';
import vendorsRouter from './vendors.js';
import inventoryRouter from './inventory.js';
import salesRouter from './sales.js';
import purchaseRouter from './purchase.js';
import bomRouter from './bom.js';
import manufacturingRouter from './manufacturing.js';
import stockLedgerRouter from './stock-ledger.js';
import auditRouter from './audit.js';
import dashboardRouter from './dashboard.js';
import reportsRouter from './reports.js';

const router = Router();

// Mount modules
router.use('/auth', authRouter);
router.use('/employees', employeesRouter);
router.use('/roles', rolesRouter);
router.use('/products', productsRouter);
router.use('/categories', categoriesRouter);
router.use('/customers', customersRouter);
router.use('/vendors', vendorsRouter);
router.use('/inventory', inventoryRouter);
router.use('/sales', salesRouter);
router.use('/purchase', purchaseRouter);
router.use('/bom', bomRouter);
router.use('/manufacturing', manufacturingRouter);
router.use('/stock-ledger', stockLedgerRouter);
router.use('/audit', auditRouter);
router.use('/dashboard', dashboardRouter);
router.use('/reports', reportsRouter);

export default router;
