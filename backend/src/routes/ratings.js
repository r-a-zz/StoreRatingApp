const express = require("express");
const router = express.Router();
const ratingController = require("../controllers/ratingController");
const auth = require("../middleware/auth");
const role = require("../middleware/role");

router.get("/count", auth, role(["admin"]), ratingController.getRatingCount);
router.post("/", auth, ratingController.submitRating);
router.get("/my", auth, ratingController.getUserRatings);
router.put("/:id", auth, ratingController.updateRating);
router.delete("/:id", auth, ratingController.deleteRating);

module.exports = router;
