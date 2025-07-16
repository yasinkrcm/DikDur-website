import mongoose from 'mongoose';

const RewardSchema = new mongoose.Schema({
  name: String,
  points: Number,
  description: String,
  partners: [String]
});

export default mongoose.models.Reward || mongoose.model('Reward', RewardSchema); 