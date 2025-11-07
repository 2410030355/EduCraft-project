const express = require("express");
const passport = require("passport");
const router = express.Router();
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.CLIENT_URL}/`,
  }),
  (req, res) => {
    res.redirect(`${process.env.CLIENT_URL}/courses`);
  }
);

router.get("/user", (req, res) => {
  if (req.user) return res.status(200).json(req.user);
  res.status(401).json({ message: "Not logged in" });
});

router.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect(process.env.CLIENT_URL);
  });
});

module.exports = router;
