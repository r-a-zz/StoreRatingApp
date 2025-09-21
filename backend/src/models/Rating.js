const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const User = require("./User");
const Store = require("./Store");

const Rating = sequelize.define(
  "Rating",
  {
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1, max: 5 },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Rating;
