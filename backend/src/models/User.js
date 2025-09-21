const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const User = sequelize.define(
  "User",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [20, 60] },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      validate: { len: [0, 400] },
    },
    role: {
      type: DataTypes.ENUM("admin", "user", "owner"),
      defaultValue: "user",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = User;
