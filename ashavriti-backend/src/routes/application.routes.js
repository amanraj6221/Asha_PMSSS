// C:\Users\Aman Raj\PMSSS\ashavriti-backend\src\routes\application.routes.js
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import Application from "../models/Application.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/* =========================================================
   🔹 Multer Setup
========================================================= */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "uploads/";
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.fieldname}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage });

/* =========================================================
   USER — Apply for Scholarship
========================================================= */
router.post(
  "/apply",
  authMiddleware("USER"),
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "signature", maxCount: 1 },
    { name: "tenthMarksheet", maxCount: 1 },
    { name: "twelfthMarksheet", maxCount: 1 },
    { name: "documents", maxCount: 10 },
  ]),
  async (req, res) => {
    try {
      const {
        schemeId, schemeName, applicantName, fatherName, motherName,
        dob, gender, mobile, familyIncome, guardianOccupation,
        bankAccount, ifscCode, email, address, casteCategory,
        religion, isMinority, aadharNumber,
      } = req.body;

      if (!schemeId || !schemeName || !applicantName)
        return res.status(400).json({ success: false, message: "Missing required fields" });

      const isMinorityValue = isMinority === "Yes" || isMinority === true;

      const urnNumber = `URN-${Date.now().toString(36).toUpperCase()}-${Math.random()
        .toString(36).substring(2, 8).toUpperCase()}`;

      const photo = req.files["photo"]?.[0]?.path || "";
      const signature = req.files["signature"]?.[0]?.path || "";
      const tenthMarksheet = req.files["tenthMarksheet"]?.[0]?.path || "";
      const twelfthMarksheet = req.files["twelfthMarksheet"]?.[0]?.path || "";
      const documents = req.files["documents"]?.map((f) => f.path) || [];

      const newApp = await Application.create({
        userId: req.user.id,
        schemeId, schemeName, applicantName, fatherName, motherName,
        dob, gender, mobile, familyIncome, guardianOccupation,
        bankAccount, ifscCode, email, address, casteCategory,
        religion, isMinority: isMinorityValue, aadharNumber,
        photo, signature, tenthMarksheet, twelfthMarksheet, documents,
        urnNumber,
        status: "Pending SAG",
        history: [{
          status: "Pending SAG",
          by: req.user.id,
          role: "USER",
          remarks: "Application submitted",
        }],
      });

      // 🔹 Notify SAG in real-time
      req.app.get("io")?.to("SAG").emit("newApplication", newApp);
      req.app.get("io")?.emit("newApplication", newApp);

      res.status(201).json({
        success: true,
        message: "Application submitted successfully",
        urn: urnNumber,
        data: newApp,
      });
    } catch (err) {
      console.error("❌ Application Error:", err);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
);

/* =========================================================
   USER — My Applications
========================================================= */
router.get("/user/:userId", authMiddleware("USER"), async (req, res) => {
  try {
    if (req.user.id !== req.params.userId)
      return res.status(403).json({ success: false, message: "Access denied" });

    const apps = await Application.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json({ success: true, data: apps });
  } catch (err) {
    console.error("❌ User Apps Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/* =========================================================
   SAG — Pending Applications
========================================================= */
router.get("/sag/pending", authMiddleware("SAG"), async (req, res) => {
  try {
    const apps = await Application.find({ status: "Pending SAG" })
      .populate("userId", "username email")
      .sort({ createdAt: -1 });
    res.json({ success: true, data: apps });
  } catch (err) {
    console.error("❌ SAG Pending Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/* =========================================================
   SAG — All Applications (for dashboard stats)
========================================================= */
router.get("/sag/all", authMiddleware("SAG"), async (req, res) => {
  try {
    const apps = await Application.find({})
      .populate("userId", "username email")
      .sort({ createdAt: -1 });
    res.json({ success: true, data: apps });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/* =========================================================
   SAG — Single Application Detail
========================================================= */
router.get("/sag/detail/:id", authMiddleware("SAG"), async (req, res) => {
  try {
    const app = await Application.findById(req.params.id).populate("userId", "username email");
    if (!app) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: app });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/* =========================================================
   SAG — Approve/Reject
========================================================= */
router.post("/sag/action", authMiddleware("SAG"), async (req, res) => {
  try {
    const { appId, action, remarks } = req.body;
    const app = await Application.findById(appId);
    if (!app) return res.status(404).json({ success: false, message: "Application not found" });

    const status = action === "approve" ? "Approved by SAG" : "Rejected by SAG";
    app.status = status;
    app.sagRemarks = remarks || "";
    app.history.push({ status, by: req.user.id, role: "SAG", remarks });
    await app.save();

    const io = req.app.get("io");
    io?.emit("sagAction", app);
    io?.to("USER").emit("applicationUpdated", app);
    io?.to("FINANCE").emit("newApplicationForFinance", app);

    res.json({ success: true, message: "SAG action completed", data: app });
  } catch (err) {
    console.error("❌ SAG Action Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/* =========================================================
   FINANCE — Pending Applications (SAG Approved)
========================================================= */
router.get("/finance/pending", authMiddleware("FINANCE"), async (req, res) => {
  try {
    const apps = await Application.find({ status: "Approved by SAG" })
      .populate("userId", "username email")
      .sort({ createdAt: -1 });
    res.json({ success: true, data: apps });
  } catch (err) {
    console.error("❌ Finance Pending Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/* =========================================================
   FINANCE — All Applications (for dashboard stats)
========================================================= */
router.get("/finance/all", authMiddleware("FINANCE"), async (req, res) => {
  try {
    const apps = await Application.find({
      status: { $in: ["Approved by SAG", "Approved by Finance", "Rejected by Finance", "Money Transferred"] }
    }).populate("userId", "username email").sort({ createdAt: -1 });
    res.json({ success: true, data: apps });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/* =========================================================
   FINANCE — Single Application Detail
========================================================= */
router.get("/finance/detail/:id", authMiddleware("FINANCE"), async (req, res) => {
  try {
    const app = await Application.findById(req.params.id).populate("userId", "username email");
    if (!app) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: app });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/* =========================================================
   FINANCE — Approve/Reject
========================================================= */
router.post("/finance/action", authMiddleware("FINANCE"), async (req, res) => {
  try {
    const { appId, action, remarks, amount } = req.body;
    const app = await Application.findById(appId);
    if (!app) return res.status(404).json({ success: false, message: "Application not found" });

    const status = action === "approve" ? "Approved by Finance" : "Rejected by Finance";
    app.status = status;
    app.financeRemarks = remarks || "";
    if (amount) app.amount = amount;
    app.history.push({ status, by: req.user.id, role: "FINANCE", remarks });
    await app.save();

    const io = req.app.get("io");
    io?.emit("financeAction", app);
    io?.to("USER").emit("applicationUpdated", app);

    res.json({ success: true, message: "Finance action completed", data: app });
  } catch (err) {
    console.error("❌ Finance Action Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/* =========================================================
   FINANCE — Transfer Funds (after Razorpay payment)
========================================================= */
router.post("/finance/transfer", authMiddleware("FINANCE"), async (req, res) => {
  try {
    const { appId, paymentId } = req.body;
    const app = await Application.findById(appId);
    if (!app) return res.status(404).json({ success: false, message: "Application not found" });

    if (app.status !== "Approved by Finance")
      return res.status(400).json({ success: false, message: "Application not approved by Finance yet" });

    app.status = "Money Transferred";
    app.paymentRemarks = `Payment transferred. Razorpay ID: ${paymentId || "TEST_MODE"}`;
    app.history.push({
      status: "Money Transferred",
      by: req.user.id,
      role: "FINANCE",
      remarks: `Razorpay Payment ID: ${paymentId || "TEST_MODE"}`,
    });
    await app.save();

    const io = req.app.get("io");
    io?.emit("moneyTransferred", app);
    io?.to("USER").emit("applicationUpdated", app);

    res.json({ success: true, message: "Payment transferred successfully", data: app });
  } catch (err) {
    console.error("❌ Transfer Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;