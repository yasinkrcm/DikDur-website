import mongoose from "mongoose";
const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  type: { type: String, enum: ["group", "webinar", "one-on-one"], default: "group" },
});
export default mongoose.models.Event || mongoose.model("Event", eventSchema); 