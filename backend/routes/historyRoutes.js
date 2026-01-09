import express from 'express';
import {
  getHistory,
  getHistoryById,
  createHistory,
  updateHistory,
  deleteHistory,
  toggleFavorite,
  getStats,
} from '../controllers/historyController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All routes are protected
router.use(protect);

router.route('/')
  .get(getHistory)
  .post(createHistory);

router.get('/stats', getStats);

router.route('/:id')
  .get(getHistoryById)
  .put(updateHistory)
  .delete(deleteHistory);

router.patch('/:id/favorite', toggleFavorite);

export default router;
