const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const User = require("./User");

const Store = sequelize.define(
  "Store",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isEmail: true },
    },
    address: {
      type: DataTypes.STRING,
      validate: { len: [0, 400] },
    },
    averageRating: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Store;
