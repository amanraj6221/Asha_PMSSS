import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      lowercase: true,
      minlength: [3, "Username must be at least 3 characters long"]
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"]
    },
    role: {
      type: String,
      enum: ["USER", "SAG", "FINANCE"],
      default: "USER"
    }
  },
  {
    timestamps: true
  }
);

// 🔒 Pre-save Hook: Hash password ONLY if it's modified or new
userSchema.pre("save", async function (next) {
  try {
    // Agar password modify nahi hua hai to agle middleware par bhej do
    if (!this.isModified("password")) {
      return next();
    }

    // Salt generation aur absolute encryption matching logic
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    next();
  } catch (error) {
    next(error);
  }
});

// 🔑 Instance method: Plain-text ko encrypted string se securely match karne ke liye
userSchema.methods.comparePassword = async function (enteredPassword) {
  // Always use await inside your controller while calling this async method
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
