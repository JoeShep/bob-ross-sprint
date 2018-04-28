'use strict';

const movieAPI = require("imdb-api");

module.exports.searchMovieAPI = (req, res, next) => {
  console.log("get movies called");
  console.log(req.query.keyword);

  movieAPI
    .search({ title: req.query.keyword }, { apiKey: "b3bd2b6a" })
    .then(data => {
      // console.log("movies?", data.results);
      return Promise.all([data, data.next()]);
    })
    .then(allTheData => {
      // spread operator is cool! But what if we decided to get more than x pages of results?
      // [...allTheData[0].results, ...allTheData[1].results];
      // This allows a dynaic number of results to be squished into one array
      const movies = [].concat(...allTheData.map(search => search.results));
      // console.log("all the movies", movies);
      res.status(200).json(movies);
    })
    .catch(err => {
      console.log("oops", err);
      next(err);
    });
};
