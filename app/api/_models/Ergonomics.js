import mongoose from "mongoose";
const ergonomicsSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  sittingTime: { type: Number },
  movementFrequency: { type: Number },
  recommendations: { type: String },
  date: { type: Date, default: Date.now },
});
export default mongoose.models.Ergonomics || mongoose.model("Ergonomics", ergonomicsSchema); 