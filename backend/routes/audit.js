import { Router } from 'express';
const router = Router();

router.all('*', (req, res) => {
  res.status(200).json({ message: 'Module under development' });
});

export default router;
