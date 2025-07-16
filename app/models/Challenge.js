import mongoose from 'mongoose';

const ChallengeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  team: String,
  exercise: String,
  completedAt: { type: Date, default: Date.now }
});

export default mongoose.models.Challenge || mongoose.model('Challenge', ChallengeSchema); 