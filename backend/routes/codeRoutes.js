import express from 'express';
import {
  generateCode,
  fixCode,
  explainCode,
  optimizeCode,
  convertCode,
} from '../controllers/codeController.js';
import { protect } from '../middleware/auth.js';
import { validateCodeGeneration, validateCodeFix } from '../middleware/validation.js';

const router = express.Router();

// All routes are protected
router.use(protect);

router.post('/generate', validateCodeGeneration, generateCode);
router.post('/fix', validateCodeFix, fixCode);
router.post('/explain', explainCode);
router.post('/optimize', optimizeCode);
router.post('/convert', convertCode);

export default router;
