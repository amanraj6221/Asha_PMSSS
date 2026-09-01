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

```
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

// Create new user
// Password User.js pre-save hook automatically hash karega
const newUser = await User.create({
  username: normalizedUsername,
  email: normalizedEmail,
  password,
  role: "USER",
});

return res.status(201).json({
  success: true,
  message: "Registered successfully",
  user: {
    _id: newUser._id,
    username: newUser.username,
    email: newUser.email,
    role: newUser.role,
  },
});
```

} catch (err) {
console.error("❌ User Register Error:", err);

```
// Duplicate key error
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
```

}
});

/* =========================================================
USER LOGIN
========================================================= */
router.post("/login", async (req, res) => {
try {
const { email, password } = req.body;

```
// Validate required fields
if (!email || !password) {
  return res.status(400).json({
    success: false,
    message: "Email and password are required",
  });
}

const normalizedEmail = email.trim().toLowerCase();

// Find user by email
const user = await User.findOne({
  email: normalizedEmail,
  role: "USER",
});

if (!user) {
  return res.status(400).json({
    success: false,
    message: "Invalid email or password",
  });
}

// Compare entered password with hashed password
const isMatch = await bcrypt.compare(password, user.password);

if (!isMatch) {
  return res.status(400).json({
    success: false,
    message: "Invalid email or password",
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
  message: "Login successful",
  token,
  user: {
    _id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
  },
});
```

} catch (err) {
console.error("❌ User Login Error:", err);

```
return res.status(500).json({
  success: false,
  message: "Server error during login",
});
```

}
});

/* =========================================================
GET USER PROFILE
========================================================= */
router.get("/profile", authMiddleware("USER"), async (req, res) => {
try {
const user = await User.findById(req.user.id).select("-password");

```
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
```

} catch (err) {
console.error("❌ Get Profile Error:", err);

```
return res.status(500).json({
  success: false,
  message: "Server error while fetching profile",
});
```

}
});

/* =========================================================
PROFILE UPDATE
========================================================= */
router.put("/profile", authMiddleware("USER"), async (req, res) => {
try {
const { username, email, currentPassword, newPassword } = req.body;

```
const user = await User.findById(req.user.id);

if (!user) {
  return res.status(404).json({
    success: false,
    message: "User not found",
  });
}

// Update username
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

// Update email
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

// Update password
if (newPassword) {
  if (!currentPassword) {
    return res.status(400).json({
      success: false,
      message: "Current password is required",
    });
  }

  // Verify current password
  const isMatch = await bcrypt.compare(
    currentPassword,
    user.password
  );

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

  // Plain password assign karo
  // User.js pre-save hook automatically hash karega
  user.password = newPassword;
}

// Save updated user
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
```

} catch (err) {
console.error("❌ Profile Update Error:", err);

```
// MongoDB duplicate key error
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
```

}
});

export default router;
