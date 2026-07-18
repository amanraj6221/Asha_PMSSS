// 📂 src/pages/finance/FinanceApplications.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/api/axios";
import socket from "@/utils/socket";

const FinanceApplications = () => {
  const navigate = useNavigate();
  const [apps, setApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState<any>(null);
  const [action, setAction] = useState<"approve" | "reject" | null>(null);
  const [remarks, setRemarks] = useState("");
  const [amount, setAmount] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showRazorpay, setShowRazorpay] = useState(false);
  const [paymentApp, setPaymentApp] = useState<any>(null);

  const fetchApps = async () => {
    try {
      const res = await api.get("/applications/finance/pending");
      if (res.data?.success) setApps(res.data.data);
    } catch (err) {
      console.error("❌ Finance fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApps();

    socket.emit("joinRoom", "FINANCE");

    socket.on("newApplicationForFinance", (app: any) => {
      setApps((prev) => {
        const exists = prev.some((p) => p._id === app._id);
        return exists ? prev : [app, ...prev];
      });
    });

    socket.on("financeAction", (updated: any) => {
      setApps((prev) => prev.filter((a) => a._id !== updated._id));
    });

    return () => {
      socket.off("newApplicationForFinance");
      socket.off("financeAction");
    };
  }, []);

  const handleAction = async () => {
    if (!action) return alert("Please select Approve or Reject");
    if (!remarks.trim()) return alert("Please enter remarks");
    if (action === "approve" && !amount.trim()) return alert("Please enter scholarship amount");

    setSubmitting(true);
    try {
      const res = await api.post("/applications/finance/action", {
        appId: selectedApp._id,
        action,
        remarks,
        amount,
      });
      if (res.data?.success) {
        alert(`✅ Application ${action === "approve" ? "Approved" : "Rejected"}!`);
        if (action === "approve") {
          setPaymentApp(res.data.data);
          setShowRazorpay(true);
        }
        setSelectedApp(null);
        setAction(null);
        setRemarks("");
        setAmount("");
        fetchApps();
      }
    } catch (err: any) {
      alert(err?.response?.data?.message || "Action failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleRazorpay = (app: any) => {
    const options = {
      key: "rzp_test_rzp_test_SjZkI7ti8pbeWn", // 🔑 
      amount: Number(app.amount || 10000) * 100,
      currency: "INR",
      name: "Ashavriti Scholarship",
      description: `Scholarship for ${app.applicantName}`,
      image: "/logo.png",
      handler: async function (response: any) {
        try {
          await api.post("/applications/finance/transfer", {
            appId: app._id,
            paymentId: response.razorpay_payment_id,
          });
          setShowRazorpay(false);
          alert(`🎉 Congratulations! Scholarship amount has been credited to student's account!\nPayment ID: ${response.razorpay_payment_id}`);
        } catch (err) {
          alert("Payment recorded but transfer update failed. Contact admin.");
        }
      },
      prefill: {
        name: app.applicantName,
        email: app.email,
        contact: app.mobile,
      },
      theme: { color: "#2563eb" },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">New Applications</h1>
      <p className="text-gray-500 text-sm">
        Applications approved by SAG — ready for Finance review
      </p>

      {apps.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-5xl mb-4">📭</p>
          <p className="text-lg font-medium">No pending applications</p>
          <p className="text-sm">New applications will appear here in real-time</p>
        </div>
      ) : (
        <div className="space-y-4">
          {apps.map((app) => (
            <div
              key={app._id}
              className="bg-white rounded-xl shadow p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div className="space-y-1">
                <p className="font-semibold text-gray-800 text-lg">{app.applicantName}</p>
                <p className="text-sm text-gray-500">{app.schemeName}</p>
                <p className="text-xs text-blue-600 font-mono">{app.urnNumber}</p>
                <span className="inline-block px-2 py-0.5 rounded-full text-xs bg-yellow-100 text-yellow-700 font-medium">
                  {app.status}
                </span>
              </div>
              <button
                onClick={() => setSelectedApp(app)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-semibold transition"
              >
                View & Take Action
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-5">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Application Details</h2>
              <button onClick={() => setSelectedApp(null)} className="text-gray-400 hover:text-gray-700 text-2xl">✕</button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <Detail label="Name" value={selectedApp.applicantName} />
              <Detail label="Scheme" value={selectedApp.schemeName} />
              <Detail label="URN" value={selectedApp.urnNumber} />
              <Detail label="DOB" value={selectedApp.dob?.substring(0, 10)} />
              <Detail label="Email" value={selectedApp.email} />
              <Detail label="Mobile" value={selectedApp.mobile} />
              <Detail label="Aadhar" value={selectedApp.aadharNumber} />
              <Detail label="Category" value={selectedApp.casteCategory} />
              <Detail label="Bank Account" value={selectedApp.bankAccount} />
              <Detail label="IFSC" value={selectedApp.ifscCode} />
              <Detail label="Family Income" value={selectedApp.familyIncome} />
              <Detail label="SAG Remarks" value={selectedApp.sagRemarks} />
            </div>
            <Detail label="Address" value={selectedApp.address} />

            <div className="space-y-3 border-t pt-4">
              <h3 className="font-semibold text-gray-700">Take Action</h3>
              <div className="flex gap-3">
                <button
                  onClick={() => setAction("approve")}
                  className={`flex-1 py-2 rounded-lg border-2 font-semibold transition ${
                    action === "approve"
                      ? "bg-green-600 text-white border-green-600"
                      : "border-green-600 text-green-600 hover:bg-green-50"
                  }`}
                >
                  ✅ Approve
                </button>
                <button
                  onClick={() => setAction("reject")}
                  className={`flex-1 py-2 rounded-lg border-2 font-semibold transition ${
                    action === "reject"
                      ? "bg-red-600 text-white border-red-600"
                      : "border-red-600 text-red-600 hover:bg-red-50"
                  }`}
                >
                  ❌ Reject
                </button>
              </div>

              {action === "approve" && (
                <input
                  type="number"
                  placeholder="Enter scholarship amount (₹)"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              )}

              <textarea
                rows={3}
                placeholder="Enter remarks (required)..."
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                className="w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <button
                onClick={handleAction}
                disabled={submitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition disabled:opacity-50"
              >
                {submitting ? "Submitting..." : "Submit Decision"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Razorpay Payment Modal */}
      {showRazorpay && paymentApp && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center space-y-6">
            <div className="text-5xl">🎓</div>
            <h2 className="text-2xl font-bold text-gray-800">Disburse Scholarship</h2>
            <p className="text-gray-500">
              Application approved! Now transfer scholarship amount to student's account.
            </p>
            <div className="bg-blue-50 rounded-lg p-4 text-left space-y-2">
              <p className="text-sm"><span className="font-medium">Student:</span> {paymentApp.applicantName}</p>
              <p className="text-sm"><span className="font-medium">Scheme:</span> {paymentApp.schemeName}</p>
              <p className="text-sm"><span className="font-medium">Amount:</span> ₹{paymentApp.amount}</p>
              <p className="text-sm"><span className="font-medium">Bank:</span> {paymentApp.bankAccount}</p>
            </div>
            <button
              onClick={() => handleRazorpay(paymentApp)}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition text-lg"
            >
              💳 Pay Now via Razorpay
            </button>
            <button
              onClick={() => setShowRazorpay(false)}
              className="text-gray-400 hover:text-gray-600 text-sm"
            >
              Skip for now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const Detail = ({ label, value }: { label: string; value?: string }) => (
  <div>
    <p className="text-gray-400 text-xs">{label}</p>
    <p className="font-medium text-gray-800 text-sm">{value || "—"}</p>
  </div>
);

export default FinanceApplications;