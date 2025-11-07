
const mongoose = require("mongoose");
const ContributionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
  name: String,
  email: String,
  idea: String,
  filename: String,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model("Contribution", ContributionSchema);
