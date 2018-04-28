"use strict";

const { Router } = require("express");
const router = Router();

router.use(require("./auth-route"));
router.use(require("./movie-api-route"));
router.use(require("./watchlist-route"));

// Any routes needed after auth
// router.get("/movies", (req, res, next) => {
//   console.log("payment types have user?", req.user);
// });

module.exports = router;
