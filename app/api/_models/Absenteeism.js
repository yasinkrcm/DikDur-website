import mongoose from "mongoose";
const absenteeismSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  reason: { type: String },
  days: { type: Number },
  date: { type: Date, default: Date.now },
});
export default mongoose.models.Absenteeism || mongoose.model("Absenteeism", absenteeismSchema); 