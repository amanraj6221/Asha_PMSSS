// C:\Users\Aman Raj\PMSSS\ashavriti-backend\src\routes\financeAuth.js
import express from "express";
import jwt from "jsonwebtoken";
import FinanceUser from "../models/FinanceUser.js";
import bcrypt from "bcryptjs";

const router = express.Router();

/* ===========================================================
   🔹 FINANCE REGISTER
=========================================================== */
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password)
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });

    const exist = await FinanceUser.findOne({
      $or: [
        { username: username.toLowerCase() },
        { email: email.toLowerCase() },
      ],
    });
    if (exist)
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });

    if (password.length < 6)
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });

    const newUser = await FinanceUser.create({
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password,
      role: "FINANCE",
    });

    return res.status(201).json({
      success: true,
      message: "Finance user registered successfully",
      user: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (err) {
    console.error("❌ Finance Register Error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

/* ===========================================================
   🔹 FINANCE LOGIN
=========================================================== */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });

    const user = await FinanceUser.findOne({ email: email.toLowerCase() });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "mySecretKey",
      { expiresIn: process.env.JWT_EXPIRES || "2h" }
    );

    return res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("❌ Finance Login Error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
