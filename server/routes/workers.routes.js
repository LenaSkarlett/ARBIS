import { Router } from 'express';
import workersController from './../controllers/workers.controller.js';
import path from 'path';
import multer from 'multer';
import authMiddleware from './../middlewares/auth.middleware.js';

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public');
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({storage: storage});


router.route('/')
  .get(authMiddleware, workersController.getAll)
  .post(authMiddleware, upload.single('photo'), workersController.add);
  

router.route('/:id')
  .get(authMiddleware, workersController.get)
  .delete(authMiddleware, workersController.delete)
  .put(authMiddleware, upload.single('photo'), workersController.edit);


export default router;
