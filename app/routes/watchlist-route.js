'use strict';

const { Router } = require("express");
const router = Router();
const { saveToWatchlist } = require("../controllers/watchlistCtrl");

router.post("/watchlist", saveToWatchlist);

module.exports = router;
