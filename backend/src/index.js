const express = require("express");
const sequelize = require("./db");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());

app.use(cors());

// Import and use routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const storeRoutes = require("./routes/stores");
const ratingRoutes = require("./routes/ratings");

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/stores", storeRoutes);

app.use("/api/ratings", ratingRoutes);

// Import associations
require("./associations");

// Import seeder
const seedDemoUser = require("./seeders/demoUser");

sequelize
  .sync()
  .then(async () => {
    // Seed demo user
    await seedDemoUser();
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("PostgreSQL connection error:", err);
  });
