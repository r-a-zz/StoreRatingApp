const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");
const role = require("../middleware/role");

// Admin only
router.get("/", auth, role(["admin"]), userController.getAllUsers);
router.get("/count", auth, role(["admin"]), userController.getUserCount);
router.get("/:id", auth, role(["admin"]), userController.getUserById);
router.post("/", auth, role(["admin"]), userController.createUser);
router.put("/:id", auth, role(["admin"]), userController.updateUser);
router.delete("/:id", auth, role(["admin"]), userController.deleteUser);

module.exports = router;
