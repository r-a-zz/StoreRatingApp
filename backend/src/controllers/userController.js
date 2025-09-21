const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.getAllUsers = async (req, res) => {
  try {
    const { name, email, address, role } = req.query;
    let where = {};
    if (name) where.name = { [require("sequelize").Op.iLike]: `%${name}%` };
    if (email) where.email = { [require("sequelize").Op.iLike]: `%${email}%` };
    if (address)
      where.address = { [require("sequelize").Op.iLike]: `%${address}%` };
    if (role) where.role = role;
    const users = await User.findAll({
      where,
      order: [["name", "ASC"]],
      attributes: { exclude: ["password"] },
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
    });
    if (!user) return res.status(404).json({ message: "User not found." });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      address,
      role,
    });
    res.status(201).json({ message: "User created." });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { name, email, address, role } = req.body;
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found." });
    await user.update({ name, email, address, role });
    res.json(
      await User.findByPk(req.params.id, {
        attributes: { exclude: ["password"] },
      })
    );
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.destroy({ where: { id: req.params.id } });
    res.json({ message: "User deleted." });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getUserCount = async (req, res) => {
  try {
    const count = await User.count();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
