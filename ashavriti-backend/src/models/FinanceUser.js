// C:\Users\Aman Raj\PMSSS\ashavriti-backend\src\models\FinanceUser.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const FinanceUserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    role: { type: String, default: "FINANCE" },
  },
  { timestamps: true }
);

// ✅ Hash password before saving
FinanceUserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// ✅ Compare password method
FinanceUserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("FinanceUser", FinanceUserSchema);
