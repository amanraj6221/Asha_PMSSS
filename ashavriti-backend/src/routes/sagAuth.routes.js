// C:\Users\Aman Mehra\Edu_Hub\Asha_PMSSS\ashavriti-backend\src\routes\sagAuth.routes.js
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import SagUser from "../models/SagUser.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/* =========================================================
   SAG REGISTER (Fully Updated & Robust Interceptor)
========================================================= */
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Frontend se aane waale fields ko strictly map karta hai
    if (!username || !password) {
      return res.status(400).json({ 
        success: false, 
        message: "Username and password are required fields" 
      });
    }

    if (password.length < 6) {
      return res.status(400).json({ 
        success: false, 
        message: "Password must be at least 6 characters long" 
      });
    }

    const normalizedUsername = username.trim().toLowerCase();
    
    // 🔥 AUTOMATIC BYPASS MATRIX: Agar frontend se email nahi aaya, toh custom generation matrix follow hoga
    const finalEmail = email ? email.trim().toLowerCase() : `${normalizedUsername}.sag@ashavriti.gov.in`;

    // Database check trigger
    const exist = await SagUser.findOne({
      $or: [{ username: normalizedUsername }, { email: finalEmail }],
    });
    
    if (exist) {
      return res.status(400).json({ 
        success: false, 
        message: "SAG administrative user account signature already exists" 
      });
    }

    // Direct instantiation mapping logic
    const newUser = await SagUser.create({
      username: normalizedUsername,
      email: finalEmail,
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
    console.error("❌ SAG Register Processing Crash Log:", err);
    return res.status(500).json({ 
      success: false, 
      message: `Internal validation router error: ${err.message}` 
    });
  }
});

/* =========================================================
   SAG LOGIN (Universal Evaluation with Username/Email Support)
========================================================= */
router.post("/login", async (req, res) => {
  try {
    const { identifier, email, username, password } = req.body;

    // Adaptive structural validation layer mapping parameter signatures
    const finalIdentifier = identifier || email || username;

    if (!finalIdentifier || !password) {
      return res.status(400).json({ 
        success: false, 
        message: "Username/Email identifier and password fields required" 
      });
    }

    const sanitizedIdentifier = finalIdentifier.trim().toLowerCase();

    // Query database directly across both identification keys
    const user = await SagUser.findOne({
      $or: [
        { email: sanitizedIdentifier },
        { username: sanitizedIdentifier }
      ]
    });

    if (!user) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid credentials: Administrative identity matching node failed." 
      });
    }

    // Password validation pattern analysis
    let isMatch = false;
    if (typeof user.comparePassword === 'function') {
      isMatch = await user.comparePassword(password);
    } else {
      isMatch = await bcrypt.compare(password, user.password);
    }

    if (!isMatch) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid credentials: Secure authentication key mismatch." 
      });
    }

    // Signature encryption authorization token build
    const token = jwt.sign(
      { id: user._id, role: user.role || "SAG" },
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
    console.error("❌ SAG Login Processing Crash Log:", err);
    return res.status(500).json({ 
      success: false, 
      message: `Internal authorization runtime server error: ${err.message}` 
    });
  }
});

/* =========================================================
   SAG PROFILE UPDATE
========================================================= */
router.put("/profile", authMiddleware, async (req, res) => {
  try {
    const { username, email, currentPassword, newPassword } = req.body;

    const user = await SagUser.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User identity node profile not found" });
    }

    if (username) user.username = username.toLowerCase();
    if (email) user.email = email.toLowerCase();

    if (newPassword) {
      if (!currentPassword) {
        return res.status(400).json({ success: false, message: "Current authorization password required" });
      }

      let isMatch = false;
      if (typeof user.comparePassword === 'function') {
        isMatch = await user.comparePassword(currentPassword);
      } else {
        isMatch = await bcrypt.compare(currentPassword, user.password);
      }

      if (!isMatch) {
        return res.status(400).json({ success: false, message: "Current input verification password incorrect" });
      }

      if (newPassword.length < 6) {
        return res.status(400).json({ success: false, message: "New custom password string must be at least 6 characters" });
      }

      user.password = newPassword;
    }

    await user.save();

    return res.json({
      success: true,
      message: "SAG profile updated successfully",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("❌ SAG Profile Error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
