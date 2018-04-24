"use strict";

let models = require("./app/models");
// let { directors } = require("./seeders/data/directors");
// let { shows } = require("./seeders/data/shows");
// let { users } = require("./seeders/data/users");
// { force: true }

models.sequelize
  .sync({ force: true })
  .then(() => {
    return models.User.create({
      username: "bubba",
      email: "b@b.com",
      password: "$2a$08$rWixXpFPoh.XV1kIxo7iSubp9qV0r0kEQRiHSDXnYzNDKoqr7SeMi"
    });
  })
  .then(() => {
    process.exit();
  });
