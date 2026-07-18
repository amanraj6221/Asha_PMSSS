import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import SagUser from "../models/SagUser.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/* =========================================================
   SAG REGISTER
========================================================= */
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password)
      return res.status(400).json({ success: false, message: "All fields are required" });

    if (password.length < 6)
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });

    const exist = await SagUser.findOne({
      $or: [{ username: username.toLowerCase() }, { email: email.toLowerCase() }],
    });
    if (exist)
      return res.status(400).json({ success: false, message: "SAG user already exists" });

    const newUser = await SagUser.create({
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password,
      role: "SAG",
    });

    return res.status(201).json({
      success: true,
      message: "SAG registered successfully",
      user: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (err) {
    console.error("❌ SAG Register Error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

/* =========================================================
   SAG LOGIN
========================================================= */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ success: false, message: "Email and password required" });

    const user = await SagUser.findOne({ email: email.toLowerCase() });
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
      message: "SAG login successful",
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("❌ SAG Login Error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

/* =========================================================
   SAG PROFILE UPDATE
========================================================= */
router.put("/profile", authMiddleware("SAG"), async (req, res) => {
  try {
    const { username, email, currentPassword, newPassword } = req.body;

    const user = await SagUser.findById(req.user.id);
    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    if (username) user.username = username.toLowerCase();
    if (email) user.email = email.toLowerCase();

    if (newPassword) {
      if (!currentPassword)
        return res.status(400).json({ success: false, message: "Current password required" });

      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch)
        return res.status(400).json({ success: false, message: "Current password incorrect" });

      if (newPassword.length < 6)
        return res.status(400).json({ success: false, message: "New password must be at least 6 characters" });

      user.password = newPassword;
    }

    await user.save();

    return res.json({
      success: true,
      message: "SAG profile updated",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("❌ SAG Profile Error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;