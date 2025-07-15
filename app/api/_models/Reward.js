import mongoose from "mongoose";
const rewardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  points: { type: Number, required: true },
  description: { type: String },
  available: { type: Boolean, default: true },
});
export default mongoose.models.Reward || mongoose.model("Reward", rewardSchema); 