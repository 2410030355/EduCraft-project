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
    res.redirect(`${process.env.CLIENT_URL}/auth/success`);
  }
);

router.get("/success", (req, res) => {
  res.redirect(`${process.env.CLIENT_URL}/courses`);
});


router.get("/success", (req, res) => {
  res.redirect(`${process.env.CLIENT_URL}/courses`);
});



router.get("/user", (req, res) => {
  if (req.user) return res.status(200).json(req.user);
  res.status(401).json({ message: "Not logged in" });
});
router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) { return next(err); }
    req.session.destroy(() => {
      res.clearCookie("connect.sid", {
        path: "/",
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      res.status(200).json({ message: "Logged out" });
    });
  });
});


module.exports = router;
