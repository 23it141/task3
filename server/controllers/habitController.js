import Habit from '../models/Habit.js';

export const getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ user: req.userId });
    res.json(habits);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addHabit = async (req, res) => {
  try {
    const { name, description } = req.body;
    const habit = new Habit({ user: req.userId, name, description });
    await habit.save();
    res.status(201).json(habit);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateHabit = async (req, res) => {
  try {
    const { name, description } = req.body;
    const habit = await Habit.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      { name, description },
      { new: true }
    );
    if (!habit) return res.status(404).json({ error: 'Habit not found' });
    res.json(habit);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteHabit = async (req, res) => {
  try {
    const habit = await Habit.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!habit) return res.status(404).json({ error: 'Habit not found' });
    res.json({ message: 'Habit deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const checkInHabit = async (req, res) => {
  try {
    const habit = await Habit.findOne({ _id: req.params.id, user: req.userId });
    if (!habit) return res.status(404).json({ error: 'Habit not found' });
    const today = new Date();
    today.setHours(0,0,0,0);
    if (habit.checkIns.some(date => new Date(date).setHours(0,0,0,0) === today.getTime())) {
      return res.status(400).json({ error: 'Already checked in today' });
    }
    habit.checkIns.push(today);
    habit.lastChecked = today;
    // Streak logic: if checked in yesterday, increment, else reset
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    if (habit.checkIns.some(date => new Date(date).setHours(0,0,0,0) === yesterday.getTime())) {
      habit.streak += 1;
    } else {
      habit.streak = 1;
    }
    await habit.save();
    res.json(habit);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
