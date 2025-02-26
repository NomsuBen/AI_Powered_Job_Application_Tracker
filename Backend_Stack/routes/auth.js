const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// @route   POST /api/login
// @desc    Authenticate user & return token
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email & password exist
    if (!email || !password) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }

    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ msg: "Invalid credentials", redirectTo: "/register" });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ msg: "Invalid credentials", redirectTo: "/register" });
    }

    // Generate JWT Token
    const payload = { user: { id: user.id } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error("Error in login:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
