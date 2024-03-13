var express = require("express");
var router = express.Router();

const passport = require("passport");
const User = require("../models/user");
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.render("users", { user: req.user });
});

router.get("/signup", function (req, res, next) {
  res.render("signup", { title: "Sign Up" });
});

router.post("/signup", async function (req, res, next) {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
    });
    const result = await user.save();
    res.redirect("/users");
  } catch (err) {
    return next(err);
  }
});

router.get("/login", function (req, res, next) {
  res.render("login", { title: "Log In" });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/users",
    failureRedirect: "/users",
  })
);

router.get("/logout", function (req, res, next) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/users");
  });
});

module.exports = router;
