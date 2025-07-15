import mongoose from "mongoose";
const postureSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  score: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  department: { type: String },
});
export default mongoose.models.Posture || mongoose.model("Posture", postureSchema); 