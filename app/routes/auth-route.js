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

// function isLoggedIn(req, res, next) {
//   console.log("USER is logged in", req.user);
//   if (req.isAuthenticated()) return next();
//   res.redirect("/login");
// }

module.exports = router;
