"use strict";
module.exports = function(sequelize, DataTypes) {
  // TODO: Add sequelize validations to attributes
  var User = sequelize.define(
    "User",
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING
    },
    { timestamps: false, tableName: "users" }
  );
  User.associate = function(models) {
    User.hasMany(models.Movie, {
      foreignKey: "user_id"
    });
  };

  return User;
};
