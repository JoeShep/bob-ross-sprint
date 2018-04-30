"use strict";

const { Router } = require("express");
const router = Router();

const {
  // displayRegister,
  register,
  // displayLogin,
  login,
  // welcome,
  logout
} = require("../controllers/authCtrl.js");

// new users
// router.get("/users", displayRegister);
router.post("/register", register);

// login existing users
// router.get("/login", displayLogin);
router.post("/login", login);

// router.get("/welcome", isLoggedIn, welcome);
router.post("/logout", logout);

// For checking if user is logged in. Angular app can call this on page refresh, etc
router.get("/status", (req, res) => {
  console.log("user in status get", req.user);
  if (!req.isAuthenticated()) {
    console.log("not authed in get status route")
    return res.status(200).json({user: null});
  }
  res.status(200).json({ username: req.user.username, id: req.user.id });
});

// function isLoggedIn(req, res, next) {
//   console.log("USER is logged in", req.user);
//   if (req.isAuthenticated()) return next();
//   res.redirect("/login");
// }

module.exports = router;
