const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { authenticate } = require("../middleware/auth");

const router = express.Router();

// ✅ REGISTER User
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // ✅ Validate input fields
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long" });
    }

    // ✅ Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    // ✅ Hash password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // ✅ Create new user
    user = new User({ name, email, password: hashedPassword });
    await user.save();

    // ✅ Generate JWT Token
    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token, user: { id: user.id, name, email } });
  } catch (error) {
    console.error("❌ Register Error:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

// ✅ LOGIN User
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Validate input fields
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // ✅ Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // ✅ Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // ✅ Generate JWT Token
    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token, user: { id: user.id, name: user.name, email } });
  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

// ✅ LOGOUT User (Client-side will remove token)
router.post("/logout", authenticate, (req, res) => {
  res.json({ msg: "Logout successful" });
});

module.exports = router;
