"use strict";

const { Router } = require("express");
const router = Router();
const { searchMovieAPI } = require("../controllers/movie-apiCtrl");

router.get("/movies", searchMovieAPI);

module.exports = router;
