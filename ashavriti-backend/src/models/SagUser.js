import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const sagUserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, lowercase: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, default: "SAG" },
  },
  { timestamps: true }
);

sagUserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const SagUser = mongoose.model("SagUser", sagUserSchema);
export default SagUser;