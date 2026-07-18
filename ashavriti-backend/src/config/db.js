// C:\Users\Aman Raj\PMSSS\ashavriti-backend\src\config\db.js
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    // ✅ Connection string build with DB_NAME
    const uri = `${process.env.MONGO_URI}/${process.env.DB_NAME}`;

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB connected: ${uri}`);
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1); // Stop server if DB fails
  }
};
