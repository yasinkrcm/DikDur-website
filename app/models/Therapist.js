import mongoose from 'mongoose';

const TherapistSchema = new mongoose.Schema({
  name: String,
  city: String,
  region: String,
  availability: [
    {
      day: String,
      slots: [String]
    }
  ],
  appointments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      date: Date,
      type: { type: String, enum: ['online', 'in-person'] }
    }
  ]
});

export default mongoose.models.Therapist || mongoose.model('Therapist', TherapistSchema); 