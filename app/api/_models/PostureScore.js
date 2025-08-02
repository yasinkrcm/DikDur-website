import mongoose from "mongoose";

const PostureScoreSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  score: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  analysisType: {
    type: String,
    enum: ['30_second_session', 'real_time'],
    default: '30_second_session'
  },
  sessionDuration: {
    type: Number,
    default: 30
  },
  totalScores: {
    type: Number,
    default: 1
  }
});

export default mongoose.models.PostureScore || mongoose.model('PostureScore', PostureScoreSchema); 