import express from "express";
import Application from "../models/Application.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Get all SAG-approved applications
router.get("/pending", authMiddleware("finance"), async (req, res) => {
  try {
    const apps = await Application.find({ status: "SAG_APPROVED" }).populate("userId", "username email");
    res.json({ success: true, applications: apps });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Approve/Reject by Finance
router.post("/action", authMiddleware("finance"), async (req, res) => {
  try {
    const { appId, action, remarks } = req.body;

    const app = await Application.findById(appId);
    if (!app) return res.status(404).json({ success: false, message: "Application not found" });

    if (action === "approve") {
      app.status = "FINANCE_APPROVED";
      app.financeRemarks = remarks;
    } else if (action === "reject") {
      app.status = "FINANCE_REJECTED";
      app.financeRemarks = remarks;
    }

    await app.save();
    res.json({ success: true, message: `Application ${action}d by Finance` });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Mark as Disbursed
router.post("/transfer", authMiddleware("finance"), async (req, res) => {
  try {
    const { appId } = req.body;

    const app = await Application.findById(appId);
    if (!app) return res.status(404).json({ success: false, message: "Application not found" });

    if (app.status !== "FINANCE_APPROVED") {
      return res.status(400).json({ success: false, message: "Application not approved yet" });
    }

    app.status = "DISBURSED";
    await app.save();

    res.json({ success: true, message: "Payment disbursed successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
