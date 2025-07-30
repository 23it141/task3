import mongoose from 'mongoose';

const habitSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: String,
  streak: { type: Number, default: 0 },
  lastChecked: Date,
  checkIns: [Date],
}, { timestamps: true });

const Habit = mongoose.model('Habit', habitSchema);
export default Habit;
