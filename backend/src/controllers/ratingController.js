const Rating = require("../models/Rating");
const Store = require("../models/Store");

exports.submitRating = async (req, res) => {
  try {
    const { storeId, rating } = req.body;
    if (rating < 1 || rating > 5)
      return res.status(400).json({ message: "Rating must be 1-5." });
    let userRating = await Rating.findOne({
      where: { UserId: req.user.id, StoreId: storeId },
    });
    if (userRating) {
      await userRating.update({ rating });
    } else {
      userRating = await Rating.create({
        UserId: req.user.id,
        StoreId: storeId,
        rating,
      });
    }
    // Update store average rating
    const ratings = await Rating.findAll({ where: { StoreId: storeId } });
    const avg = ratings.length
      ? ratings.reduce((acc, r) => acc + r.rating, 0) / ratings.length
      : 0;
    const store = await Store.findByPk(storeId);
    await store.update({ averageRating: avg });
    res.json({ message: "Rating submitted.", averageRating: avg });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getUserRatings = async (req, res) => {
  try {
    const ratings = await Rating.findAll({
      where: { UserId: req.user.id },
      include: [{ model: Store, attributes: ["name", "address"] }],
    });
    res.json(ratings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getRatingCount = async (req, res) => {
  try {
    const count = await Rating.count();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateRating = async (req, res) => {
  try {
    const { rating } = req.body;
    if (rating < 1 || rating > 5)
      return res.status(400).json({ message: "Rating must be 1-5." });
    const userRating = await Rating.findByPk(req.params.id);
    if (!userRating || userRating.UserId !== req.user.id)
      return res.status(404).json({ message: "Rating not found." });
    await userRating.update({ rating });
    // Update store average
    const store = await Store.findByPk(userRating.StoreId);
    const ratings = await Rating.findAll({
      where: { StoreId: userRating.StoreId },
    });
    const avg = ratings.length
      ? ratings.reduce((acc, r) => acc + r.rating, 0) / ratings.length
      : 0;
    await store.update({ averageRating: avg });
    res.json({ message: "Rating updated.", averageRating: avg });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteRating = async (req, res) => {
  try {
    const userRating = await Rating.findByPk(req.params.id);
    if (!userRating || userRating.UserId !== req.user.id)
      return res.status(404).json({ message: "Rating not found." });
    const storeId = userRating.StoreId;
    await userRating.destroy();
    // Update store average
    const ratings = await Rating.findAll({ where: { StoreId: storeId } });
    const avg = ratings.length
      ? ratings.reduce((acc, r) => acc + r.rating, 0) / ratings.length
      : 0;
    const store = await Store.findByPk(storeId);
    await store.update({ averageRating: avg });
    res.json({ message: "Rating deleted.", averageRating: avg });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
