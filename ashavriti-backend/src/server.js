// C:\Users\Aman Raj\PMSSS\ashavriti-backend\src\server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";
import { Server } from "socket.io";

// 🔹 Routes import
import authRoutes from "./routes/auth.routes.js";
import sagAuthRoutes from "./routes/sagAuth.routes.js";
import financeAuthRoutes from "./routes/financeAuth.js";
import applicationRoutes from "./routes/application.routes.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Allowed Frontend Origins
const allowedOrigins = [
  "http://localhost:8080",
  "http://localhost:8081",
  "http://localhost:5173",
];

// ✅ Socket.io Setup
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});
app.set("io", io);

// ✅ Middlewares
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: process.env.DB_NAME || "ashavriti",
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err.message));

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/sag/auth", sagAuthRoutes);
app.use("/api/finance/auth", financeAuthRoutes);
app.use("/api/applications", applicationRoutes);

// ✅ Basic route
app.get("/", (req, res) => {
  res.send("🚀 Ashavriti Scholarship API is running...");
});

// ✅ Socket.io listeners
io.on("connection", (socket) => {
  console.log("🔗 New client connected:", socket.id);

  // Join room based on role
  socket.on("joinRoom", (role) => {
    socket.join(role);
    console.log(`👤 Socket ${socket.id} joined room: ${role}`);
  });

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

// ✅ Error Handler
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});