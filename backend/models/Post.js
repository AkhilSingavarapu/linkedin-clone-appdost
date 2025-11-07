import mongoose from "mongoose";
const postSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  userName: String,
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});
export default mongoose.model("Post", postSchema);
