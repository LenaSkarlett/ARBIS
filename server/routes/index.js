import { Router } from 'express';
import usersRoutes from './users.routes.js';
import authRoutes from './auth.routes.js';
import refreshRoutes from './refresh.routes.js';
import workersRoutes from './workers.routes.js';
import landingRoutes from './landing.routes.js';

const router = Router();

router.use('/users', usersRoutes);
router.use('/auth', authRoutes);
router.use('/refresh', refreshRoutes);
router.use('/workers', workersRoutes);
router.use('/landing', landingRoutes)

export default router;
