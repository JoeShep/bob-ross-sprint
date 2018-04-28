"use strict";
module.exports = (sequelize, DataTypes) => {
  var Movie = sequelize.define(
    "Movie",
    {
      imdb_id: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
      rating: DataTypes.INTEGER
    },
    {tableName: "movies"}
  );
  Movie.associate = function(models) {
    Movie.belongsTo(models.User, {
      foreignKey: "user_id"
    });
  };
  return Movie;
};
