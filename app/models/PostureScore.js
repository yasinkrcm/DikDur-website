import mongoose from 'mongoose';

const PostureScoreSchema = new mongoose.Schema({
  department: { type: String, required: true },
  score: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.PostureScore || mongoose.model('PostureScore', PostureScoreSchema); 