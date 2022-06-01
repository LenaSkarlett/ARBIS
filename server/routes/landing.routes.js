import { Router } from 'express';
import landingController from './../controllers/landing.controller.js';
import authMiddleware from './../middlewares/auth.middleware.js';

const router = Router();

router.route('/:landingName')
  .post(authMiddleware, landingController.saveLandingInfo)
  .get(landingController.getLandingInfo);

export default router;
