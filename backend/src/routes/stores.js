const express = require("express");
const router = express.Router();
const storeController = require("../controllers/storeController");
const auth = require("../middleware/auth");
const role = require("../middleware/role");

// Admin only
router.get("/count", auth, role(["admin"]), storeController.getStoreCount);
router.post("/", auth, role(["admin"]), storeController.createStore);
router.put("/:id", auth, role(["admin"]), storeController.updateStore);
router.delete("/:id", auth, role(["admin"]), storeController.deleteStore);

// All users
router.get("/", auth, storeController.getAllStores);
router.get("/:id", auth, storeController.getStoreById);
router.get("/:id/ratings", auth, storeController.getStoreRatings);

// Owner only
router.get("/my", auth, role(["owner"]), storeController.getMyStores);

module.exports = router;
