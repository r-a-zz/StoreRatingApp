const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;
    if (!name || name.length < 20 || name.length > 60)
      return res
        .status(400)
        .json({ message: "Name must be 20-60 characters." });
    if (!address || address.length > 400)
      return res.status(400).json({ message: "Address max 400 characters." });
    if (
      !password ||
      !/(?=.*[A-Z])(?=.*[!@#$%^&*])/.test(password) ||
      password.length < 8 ||
      password.length > 16
    )
      return res.status(400).json({
        message: "Password must be 8-16 chars, 1 uppercase, 1 special.",
      });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      address,
      role,
    });
    res.status(201).json({ message: "User registered." });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: "Invalid credentials." });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid)
      return res.status(400).json({ message: "Invalid credentials." });
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found." });
    const valid = await bcrypt.compare(oldPassword, user.password);
    if (!valid)
      return res.status(400).json({ message: "Old password incorrect." });
    if (
      !newPassword ||
      !/(?=.*[A-Z])(?=.*[!@#$%^&*])/.test(newPassword) ||
      newPassword.length < 8 ||
      newPassword.length > 16
    )
      return res.status(400).json({
        message: "Password must be 8-16 chars, 1 uppercase, 1 special.",
      });
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({ message: "Password updated." });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
