import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  message: String,
  type: String,
  scheduledFor: Date,
  sentAt: Date
});

export default mongoose.models.Notification || mongoose.model('Notification', NotificationSchema); 