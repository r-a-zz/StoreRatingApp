const Store = require("../models/Store");
const Rating = require("../models/Rating");
const User = require("../models/User");

exports.getAllStores = async (req, res) => {
  try {
    const { search, sort } = req.query;
    let where = {};
    if (search) {
      where[require("sequelize").Op.or] = [
        { name: { [require("sequelize").Op.iLike]: `%${search}%` } },
        { address: { [require("sequelize").Op.iLike]: `%${search}%` } },
      ];
    }
    let order = [["name", "ASC"]];
    if (sort === "rating") {
      order = [
        ["averageRating", "DESC"],
        ["name", "ASC"],
      ];
    }
    const stores = await Store.findAll({
      where,
      include: [
        { model: User, as: "owner", attributes: ["name", "email"] },
        {
          model: Rating,
          where: { UserId: req.user.id },
          required: false,
          attributes: ["rating"],
        },
      ],
      order,
    });
    res.json(stores);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getStoreById = async (req, res) => {
  try {
    const store = await Store.findByPk(req.params.id, {
      include: [{ model: User, as: "owner", attributes: ["name", "email"] }],
    });
    if (!store) return res.status(404).json({ message: "Store not found." });
    res.json(store);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createStore = async (req, res) => {
  try {
    const { name, email, address, owner } = req.body;
    const store = await Store.create({ name, email, address, ownerId: owner });
    res.status(201).json({ message: "Store created." });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateStore = async (req, res) => {
  try {
    const { name, email, address } = req.body;
    const store = await Store.findByPk(req.params.id);
    if (!store) return res.status(404).json({ message: "Store not found." });
    await store.update({ name, email, address });
    res.json(store);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteStore = async (req, res) => {
  try {
    await Store.destroy({ where: { id: req.params.id } });
    res.json({ message: "Store deleted." });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getStoreRatings = async (req, res) => {
  try {
    const ratings = await Rating.findAll({
      where: { StoreId: req.params.id },
      include: [{ model: User, attributes: ["name", "email"] }],
    });
    res.json(ratings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getStoreCount = async (req, res) => {
  try {
    const count = await Store.count();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMyStores = async (req, res) => {
  try {
    const stores = await Store.findAll({
      where: { ownerId: req.user.id },
      include: [
        {
          model: Rating,
          include: [{ model: User, attributes: ["name", "email"] }],
        },
      ],
    });
    res.json(stores);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
