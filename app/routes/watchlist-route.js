'use strict';

const { Router } = require("express");
const router = Router();
const { saveToWatchlist, getWatchlist } = require("../controllers/watchlistCtrl");

router.post("/watchlist", saveToWatchlist);
router.get("/watchlist", getWatchlist);

module.exports = router;
