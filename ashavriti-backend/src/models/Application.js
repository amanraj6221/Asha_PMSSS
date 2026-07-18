import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
  {
    status: { type: String, required: true },
    by: { type: mongoose.Schema.Types.ObjectId },
    role: { type: String, enum: ["USER", "SAG", "FINANCE"] },
    remarks: { type: String, default: "" },
  },
  { timestamps: true }
);

const applicationSchema = new mongoose.Schema(
  {
    // 🔹 User Reference
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // 🔹 Scheme Info
    schemeId: { type: String, required: true },
    schemeName: { type: String, required: true },
    urnNumber: { type: String, unique: true },

    // 🔹 Personal Info
    applicantName: { type: String, required: true },
    fatherName: { type: String, default: "" },
    motherName: { type: String, default: "" },
    dob: { type: String, default: "" },
    gender: { type: String, default: "" },
    mobile: { type: String, default: "" },
    email: { type: String, default: "" },
    address: { type: String, default: "" },
    aadharNumber: { type: String, default: "" },

    // 🔹 Category Info
    casteCategory: { type: String, default: "" },
    religion: { type: String, default: "" },
    isMinority: { type: Boolean, default: false },

    // 🔹 Financial Info
    familyIncome: { type: String, default: "" },
    guardianOccupation: { type: String, default: "" },
    bankAccount: { type: String, default: "" },
    ifscCode: { type: String, default: "" },

    // 🔹 Documents
    photo: { type: String, default: "" },
    signature: { type: String, default: "" },
    tenthMarksheet: { type: String, default: "" },
    twelfthMarksheet: { type: String, default: "" },
    documents: [{ type: String }],

    // 🔹 Status
    status: {
      type: String,
      enum: [
        "Pending SAG",
        "Approved by SAG",
        "Rejected by SAG",
        "Approved by Finance",
        "Rejected by Finance",
        "Money Transferred",
      ],
      default: "Pending SAG",
    },

    // 🔹 Remarks
    sagRemarks: { type: String, default: "" },
    financeRemarks: { type: String, default: "" },
    paymentRemarks: { type: String, default: "" },

    // 🔹 Amount
    amount: { type: String, default: "" },

    // 🔹 History Timeline
    history: [historySchema],
  },
  { timestamps: true }
);

// Auto generate URN before save
applicationSchema.pre("save", function (next) {
  if (!this.urnNumber) {
    this.urnNumber = `URN-${Date.now().toString(36).toUpperCase()}-${Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase()}`;
  }
  next();
});

const Application = mongoose.model("Application", applicationSchema);
export default Application;