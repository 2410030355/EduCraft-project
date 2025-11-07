const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Contribution = require("../models/contribution");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });
router.post("/create", upload.single("file"), async (req, res) => {
  try {
    const { name, email, idea } = req.body;
    const file = req.file ? req.file.filename : null;

    if (!name || !email || !idea) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const userId = req.user ? req.user._id : null;

    const saved = await Contribution.create({
      userId,
      name,
      email,
      idea,
      file,
    });

    res.json({ message: "Contribution saved", id: saved._id });
  } catch (err) {
    console.error("Error while saving contribution:", err);
    res.status(500).json({ message: err.message });
  }
});
router.get("/recent", async (req, res) => {
  try {
    const list = await Contribution.find().sort({ createdAt: -1 }).limit(20);
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
