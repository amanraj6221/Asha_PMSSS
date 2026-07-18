// 📂 src/routes/auth.routes.js
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/* =========================================================
   USER REGISTER
========================================================= */
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password)
      return res.status(400).json({ success: false, message: "All fields are required" });

    if (password.length < 6)
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });

    const exist = await User.findOne({
      $or: [{ username: username.toLowerCase() }, { email: email.toLowerCase() }],
    });
    if (exist)
      return res.status(400).json({ success: false, message: "User already exists" });

    const newUser = await User.create({
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password,
      role: "USER",
    });

    return res.status(201).json({
      success: true,
      message: "Registered successfully",
      user: { _id: newUser._id, username: newUser.username, email: newUser.email, role: newUser.role },
    });
  } catch (err) {
    console.error("❌ Register Error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

/* =========================================================
   USER LOGIN
========================================================= */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ success: false, message: "Email and password required" });

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user)
      return res.status(400).json({ success: false, message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "mySecretKey",
      { expiresIn: process.env.JWT_EXPIRES || "2h" }
    );

    return res.json({
      success: true,
      message: "Login successful",
      token,
      user: { _id: user._id, username: user.username, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error("❌ Login Error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

/* =========================================================
   PROFILE UPDATE
========================================================= */
router.put("/profile", authMiddleware("USER"), async (req, res) => {
  try {
    const { username, email, currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id);
    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    if (username) user.username = username.toLowerCase();
    if (email) user.email = email.toLowerCase();

    if (newPassword) {
      if (!currentPassword)
        return res.status(400).json({ success: false, message: "Current password required" });

      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch)
        return res.status(400).json({ success: false, message: "Current password is incorrect" });

      if (newPassword.length < 6)
        return res.status(400).json({ success: false, message: "New password must be at least 6 characters" });

      user.password = newPassword;
    }

    await user.save();

    return res.json({
      success: true,
      message: "Profile updated successfully",
      user: { _id: user._id, username: user.username, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error("❌ Profile Update Error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;