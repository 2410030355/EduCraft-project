
const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  googleId: { type: String, default: null },
  name: String,
  email: { type: String, unique: true, sparse: true },
  picture: String,
  password: String, // hashed for manual accounts
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model("User", UserSchema);
