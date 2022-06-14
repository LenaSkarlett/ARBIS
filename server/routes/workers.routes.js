import { Router } from 'express';
import workersController from './../controllers/workers.controller.js';
import path from 'node:path';
import multer from 'multer';
import authMiddleware from './../middlewares/auth.middleware.js';
import fs from 'fs';

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    fs.mkdirSync('public', {recursive: true});
    cb(null, 'public/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({storage: storage});


router.route('/')
  .get(authMiddleware, workersController.getAll)
  .post(authMiddleware, upload.single('photo'), workersController.add);
  

router.route('/:id')
  .delete(authMiddleware, workersController.delete)
  .put(authMiddleware, upload.single('photo'), workersController.edit);


export default router;
