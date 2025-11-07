
const mongoose = require("mongoose");
const QuizScoreSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
  classNo: String,
  subject: String,
  score: Number,
  total: Number,
  answers: Object,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model("QuizScore", QuizScoreSchema);
