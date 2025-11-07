
const express = require("express");
const router = express.Router();
const QuizScore = require("../models/quizscore");
router.post("/save", async (req, res) => {
  try {
    const { classNo, subject, score, total, answers } = req.body;
    const userId = req.user ? req.user._id : null;
    const saved = await QuizScore.create({ userId, classNo, subject, score, total, answers });
    res.json({ message: "Saved", id: saved._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;
