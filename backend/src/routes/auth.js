const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const auth = require("../middleware/auth");

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/update-password", auth, authController.updatePassword);

// Add GET /me route for frontend dashboard
router.get("/me", auth, async (req, res) => {
  try {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
