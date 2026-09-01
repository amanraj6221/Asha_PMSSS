import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/* =========================================================
USER REGISTER (Teeno roles ke liye scalable)
========================================================= */
router.post("/register", async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Validate required fields
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Username, email and password are required",
      });
    }

    // Normalize data
    const normalizedUsername = username.trim().toLowerCase();
    const normalizedEmail = email.trim().toLowerCase();

    // Password validation
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    // Check existing user
    const existingUser = await User.findOne({
      $or: [
        { username: normalizedUsername },
        { email: normalizedEmail },
      ],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message:
          existingUser.username === normalizedUsername
            ? "Username already exists"
            : "Email already exists",
      });
    }

    // Dynamic role mapping (Default to USER if not specified)
    const assignedRole = role ? role.toUpperCase() : "USER";

    // Create new user (User.js pre-save hook automatically hash karega)
    const newUser = await User.create({
      username: normalizedUsername,
      email: normalizedEmail,
      password,
      role: assignedRole,
    });

    return res.status(201).json({
      success: true,
      message: `${assignedRole} Registered successfully`,
      user: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (err) {
    console.error("❌ User Register Error:", err);

    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Username or email already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server error during registration",
    });
  }
});

/* =========================================================
UNIVERSAL LOGIN (Supports Username/Email & Dynamic Roles)
========================================================= */
router.post("/login", async (req, res) => {
  try {
    const { identifier, password, role } = req.body; // identifier can be username OR email

    // Validate required fields
    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        message: "Username/Email and password are required",
      });
    }

    const sanitizedIdentifier = identifier.trim().toLowerCase();
    const expectedRole = role ? role.toUpperCase() : "USER";

    // Find user by username OR email AND matching requested role portal
    const user = await User.findOne({
      $or: [
        { email: sanitizedIdentifier },
        { username: sanitizedIdentifier }
      ],
      role: expectedRole
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: `Account not found or invalid credentials for role: ${expectedRole}`,
      });
    }

    // Compare entered password with hashed password using model instance method
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials (Password mismatch)",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET || "mySecretKey",
      {
        expiresIn: process.env.JWT_EXPIRES || "2h",
      }
    );

    return res.status(200).json({
      success: true,
      message: `Login successful as ${user.role}`,
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("❌ User Login Error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
});

/* =========================================================
GET USER PROFILE
========================================================= */
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    // req.user contains info from authMiddleware
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    console.error("❌ Get Profile Error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching profile",
    });
  }
});

/* =========================================================
PROFILE UPDATE
========================================================= */
router.put("/profile", authMiddleware, async (req, res) => {
  try {
    const { username, email, currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (username) {
      const normalizedUsername = username.trim().toLowerCase();
      const existingUsername = await User.findOne({
        username: normalizedUsername,
        _id: { $ne: user._id },
      });

      if (existingUsername) {
        return res.status(400).json({
          success: false,
          message: "Username already exists",
        });
      }
      user.username = normalizedUsername;
    }

    if (email) {
      const normalizedEmail = email.trim().toLowerCase();
      const existingEmail = await User.findOne({
        email: normalizedEmail,
        _id: { $ne: user._id },
      });

      if (existingEmail) {
        return res.status(400).json({
          success: false,
          message: "Email already exists",
        });
      }
      user.email = normalizedEmail;
    }

    if (newPassword) {
      if (!currentPassword) {
        return res.status(400).json({
          success: false,
          message: "Current password is required",
        });
      }

      const isMatch = await user.comparePassword(currentPassword);
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: "Current password is incorrect",
        });
      }

      if (newPassword.length < 6) {
        return res.status(400).json({
          success: false,
          message: "New password must be at least 6 characters",
        });
      }

      user.password = newPassword;
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("❌ Profile Update Error:", err);
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Username or email already exists",
      });
    }
    return res.status(500).json({
      success: false,
      message: "Server error while updating profile",
    });
  }
});

export default router;
