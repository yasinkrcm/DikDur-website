import mongoose from "mongoose";
const therapistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  bio: { type: String },
  available: [{ type: Date }],
  imageUrl: { type: String },
  phone: { type: String },
});
export default mongoose.models.Therapist || mongoose.model("Therapist", therapistSchema); 