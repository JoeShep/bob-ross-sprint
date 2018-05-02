"use strict";

module.exports.saveToWatchlist = (
  { app, body: { user_id, imdb_id } },
  res,
  next
) => {
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

module.exports.getWatchlist = ({ app, query: { user } }, res, next) => {
  console.log("getWatchlist called in wl ctrl", user);
  let Movie = app.get("models").Movie;
  if (!user) {
    res.send(null);
  }
  Movie.findAll({
    raw: true,
    where: { user_id: user }
  })
    .then(movies => {
      console.log("movies", movies);
      if (!movies[0]) {
        res.json(null);
      }
      res.json(movies);
    })
    .catch(err => {
      next(err);
    });
};
