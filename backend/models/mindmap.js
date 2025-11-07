
const mongoose = require("mongoose");
const MindmapSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
  topic: String,
  result: String,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model("Mindmap", MindmapSchema);
