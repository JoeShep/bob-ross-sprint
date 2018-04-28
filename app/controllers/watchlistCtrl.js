"use strict";

module.exports.saveToWatchlist = ({ app, body: { user_id, imdb_id } }, res, next) => {
  let Movie = app.get("models").Movie;
  console.log("favorite in server ctrl", user_id, imdb_id);
  Movie.create({ user_id, imdb_id })
    .then(() => {
      res.status(201).end(); // 201 = new resource created
    })
    .catch(err => {
      next(err);
    });
};
