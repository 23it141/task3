import express from 'express';
import auth from '../middleware/auth.js';
import { getHabits, addHabit, updateHabit, deleteHabit, checkInHabit } from '../controllers/habitController.js';

const router = express.Router();

router.get('/', auth, getHabits);
router.post('/', auth, addHabit);
router.put('/:id', auth, updateHabit);
router.delete('/:id', auth, deleteHabit);
router.post('/:id/checkin', auth, checkInHabit);

export default router;
