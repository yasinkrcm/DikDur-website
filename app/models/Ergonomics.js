import mongoose from 'mongoose';

const ErgonomicsSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  sittingDuration: Number,
  movementFrequency: Number,
  recommendations: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Ergonomics || mongoose.model('Ergonomics', ErgonomicsSchema); 