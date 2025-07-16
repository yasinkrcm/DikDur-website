import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  type: { type: String, enum: ['webinar', 'group', 'private'] },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  link: String
});

export default mongoose.models.Event || mongoose.model('Event', EventSchema); 