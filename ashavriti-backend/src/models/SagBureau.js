import mongoose from "mongoose";

const sagBureauSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    role: { type: String, default: "SAG" },
  },
  { timestamps: true }
);

export default mongoose.model("SagBureau", sagBureauSchema);
