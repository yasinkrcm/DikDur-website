import mongoose from "mongoose";
const challengeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  scores: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, score: Number }],
  startDate: { type: Date },
  endDate: { type: Date },
  status: { type: String, enum: ["active", "completed"], default: "active" },
});
export default mongoose.models.Challenge || mongoose.model("Challenge", challengeSchema); 