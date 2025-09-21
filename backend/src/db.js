const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.POSTGRES_DB || "roxiler",
  process.env.POSTGRES_USER || "postgres",
  process.env.POSTGRES_PASSWORD || "",
  {
    host: process.env.POSTGRES_HOST || "localhost",
    dialect: "postgres",
    port: process.env.POSTGRES_PORT || 5432,
    logging: false,
  }
);

module.exports = sequelize;
