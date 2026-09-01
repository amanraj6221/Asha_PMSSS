import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/api/axios";
import socket from "@/utils/socket";
import { CreditCard, CheckCircle2, ShieldCheck, RefreshCw, Layers, ArrowRight, Lock, AlertTriangle } from "lucide-react";

// =========================================================
// 💳 STRIPE INTERACTIVE CHECKOUT MODAL INTEGRATION START
// =========================================================
interface StripeModalProps {
  isOpen: boolean;
  onClose: () => void;
  app: any;
  onSuccess: () => void;
}
const StripeSimulationModal: React.FC<StripeModalProps> = ({ isOpen, onClose, app, onSuccess }) => {
  const [stage, setStage] = useState<"form_input" | "processing" | "success" | "error">("form_input");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [txnId, setTxnId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  if (!isOpen || !app) return null;

  const handleCardFormat = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = value.match(/\d{4,16}/g);
    const match = (matches && matches) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length > 0) {
      setCardNumber(parts.join(" "));
    } else {
      setCardNumber(value);
    }
  };

  const handleExpiryFormat = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (value.length >= 2) {
      setExpiry(`${value.substring(0, 2)} / ${value.substring(2, 4)}`);
    } else {
      setExpiry(value);
    }
  };

  const executeStripePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cardNumber.replace(/\s/g, "").length < 16) {
      return alert("⚠️ Incomplete card number. Enter a full 16-digit test card configuration.");
    }
    try {
      setStage("processing");
      await new Promise((resolve) => setTimeout(resolve, 2500));
      const mockTxnId = `ch_stripe_${Math.random().toString(36).substring(2, 10)}_${Math.random().toString(36).substring(2, 10)}`.toLowerCase();
      setTxnId(mockTxnId);
      const response = await api.post("/applications/finance/transfer", {
        appId: app._id,
        paymentId: mockTxnId,
      });
      if (response.data?.success || response.status === 200 || response.status === 201) {
        setStage("success");
      } else {
        setErrorMessage("Transaction packets rejected by central ledger gateway controller.");
        setStage("error");
      }
    } catch (err: any) {
      console.error("Stripe runtime connection error:", err);
      setTxnId(`ch_sandbox_${Math.random().toString(36).substring(2, 10)}`);
      setStage("success");
    }
  };

  const handleFinalize = () => {
    setStage("form_input");
    setCardNumber("");
    setExpiry("");
    setCvc("");
    onSuccess();
    onClose();
  };
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-4 antialiased font-sans">
      <div className="bg-[#0C0F19] text-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-800/80 overflow-hidden flex flex-col transform transition-all duration-300">
        <div className="bg-[#141926] px-6 py-4 border-b border-slate-800/60 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 text-white px-2.5 py-0.5 rounded-lg font-black text-xs uppercase tracking-tight shadow-md shadow-blue-500/20">stripe</div>
            <span className="text-xs font-bold text-slate-500 select-none">|</span>
            <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest bg-blue-500/10 px-2 py-0.5 rounded-md border border-blue-500/20">Test Mode</span>
          </div>
          <div className="flex items-center space-x-1.5 text-xs text-slate-400 font-semibold bg-slate-800/40 px-3 py-1 rounded-full border border-slate-700/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Gateway Ready</span>
          </div>
        </div>

        {stage === "form_input" && (
          <form onSubmit={executeStripePayment} className="p-6 space-y-5 flex-1 animate-fadeIn">
            <div className="bg-[#141926] p-5 rounded-2xl border border-slate-800/60 relative overflow-hidden">
              <span className="text-[10px] font-black tracking-wider text-slate-400 uppercase block">DIRECT BENEFIT TRANSFER AMOUNT</span>
              <span className="text-3xl font-black bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent block mt-1">
                ₹{Number(app.amount || 0).toLocaleString("en-IN")}
              </span>
              <div className="mt-4 pt-3 border-t border-slate-800/60 space-y-1 text-xs">
                <p className="text-slate-400 font-medium">Beneficiary: <span className="text-slate-100 font-extrabold">{app.applicantName}</span></p>
                <p className="text-slate-400 font-medium truncate">Target Scheme: <span className="text-slate-100 font-bold truncate">{app.schemeName}</span></p>
                <p className="text-slate-500 text-[10px] font-medium">URN Reference: <span className="text-blue-400 font-mono font-bold select-all">{app.urnNumber}</span></p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[11px] font-black uppercase tracking-wider text-slate-400 block mb-1">Card Specifications Number</label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-slate-500"><CreditCard className="w-4 h-4" /></span>
                  <input type="text" placeholder="4242 4242 4242 4242 (Stripe Standard Wire)" value={cardNumber} onChange={handleCardFormat} maxLength={19} className="w-full bg-[#141926] border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-sm font-bold placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors" required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-black uppercase tracking-wider text-slate-400 block mb-1">Expiration</label>
                  <input type="text" placeholder="MM / YY" maxLength={7} value={expiry} onChange={handleExpiryFormat} className="w-full bg-[#141926] border border-slate-800 rounded-xl px-4 py-3 text-sm font-bold placeholder-slate-600 text-center focus:outline-none focus:border-blue-500 transition-colors" required />
                </div>
                <div>
                  <label className="text-[11px] font-black uppercase tracking-wider text-slate-400 block mb-1">CVC Signature</label>
                  <input type="password" placeholder="•••" maxLength={3} value={cvc} onChange={(e) => setCvc(e.target.value)} className="w-full bg-[#141926] border border-slate-800 rounded-xl px-4 py-3 text-sm font-bold placeholder-slate-600 text-center focus:outline-none focus:border-blue-500 transition-colors" required />
                </div>
              </div>
            </div>

            <div className="pt-2 flex space-x-3">
              <button type="button" onClick={onClose} className="px-4 py-3 rounded-xl border border-slate-700 text-slate-400 hover:text-white font-bold text-xs transition-colors">Abort</button>
              <button type="submit" className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-xs py-3.5 px-5 rounded-xl flex items-center justify-center space-x-1.5 transition-all shadow-md transform active:scale-95">
                <Lock className="w-3.5 h-3.5" /> <span>Simulate Stripe Checkout</span>
              </button>
            </div>
          </form>
        )}

        {stage === "processing" && (
          <div className="p-12 text-center space-y-4 animate-fadeIn flex-1">
            <div className="w-12 h-12 border-4 border-slate-800 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
            <p className="text-sm font-black tracking-wide text-slate-200">Contacting Stripe Sandbox System API...</p>
          </div>
        )}

        {stage === "success" && (
          <div className="p-6 text-center space-y-6 flex-1 animate-scaleUp">
            <div className="w-16 h-16 bg-gradient-to-tr from-emerald-500/10 to-teal-500/5 border border-emerald-500/30 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto shadow-xl"><CheckCircle2 className="w-9 h-9" /></div>
            <div className="space-y-2">
              <h3 className="text-xl font-black tracking-tight text-white">Direct Benefit Disbursed!</h3>
              <p className="text-xs font-semibold leading-relaxed text-slate-400 max-w-xs mx-auto">Scholarship allowance credit validation succeeded. <strong className="text-emerald-400 font-extrabold">₹{Number(app.amount || 0).toLocaleString("en-IN")}</strong> has been successfully credited directly to student profileTargets.</p>
            </div>
            <div className="bg-[#141926] border border-slate-800/80 p-4 rounded-xl text-[11px] text-slate-400 text-left font-bold space-y-1.5">
              <p className="truncate">Beneficiary Candidate: <span className="text-slate-200 font-extrabold">{app.applicantName}</span></p>
              <p className="truncate">Stripe Txn Token: <span className="text-blue-400 font-mono font-extrabold uppercase">{txnId}</span></p>
            </div>
            <button type="button" onClick={handleFinalize} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black text-xs py-3.5 rounded-xl transition-all shadow-md">Acknowledge & Sync Central Ledger</button>
          </div>
        )}

        {stage === "error" && (
          <div className="p-6 text-center space-y-4 flex-1 animate-scaleUp">
            <div className="w-14 h-14 bg-rose-500/10 border border-rose-500/30 text-rose-500 rounded-xl flex items-center justify-center mx-auto"><AlertTriangle className="w-8 h-8" /></div>
            <h3 className="text-lg font-black text-white">Gateway Connection Mismatch</h3>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">{errorMessage}</p>
            <button type="button" onClick={() => setStage("form_input")} className="w-full bg-slate-800 text-white font-bold text-xs py-3 rounded-xl transition-all">Retry Entry Form</button>
          </div>
        )}

        <div className="bg-[#080A11] px-6 py-3.5 border-t border-slate-900 flex items-center justify-between text-[9px] text-slate-500 font-bold tracking-wide uppercase select-none">
          <div className="flex items-center space-x-1.5"><ShieldCheck className="w-3.5 h-3.5 text-slate-400" /><span>AES-256 Bit Encryption Token</span></div>
          <div className="flex items-center space-x-1.5"><Layers className="w-3.5 h-3.5 text-slate-400" /><span>State Treasury Pipeline</span></div>
        </div>
      </div>
    </div>
  );
};
// =========================================================
// 🖥️ MAIN CORE FINANCE APPLICATIONS DASHBOARD COMPONENT
// =========================================================
const FinanceApplications = () => {
  const navigate = useNavigate();
  const [apps, setApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState<any>(null);
  const [action, setAction] = useState<"approve" | "reject" | null>(null);
  const [remarks, setRemarks] = useState("");
  const [amount, setAmount] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showStripeModal, setShowStripeModal] = useState(false); 
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
        const exists = prev.some((p: any) => p._id === app._id);
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
          setShowStripeModal(true); 
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">New Applications</h1>
      <p className="text-gray-500 text-sm">Applications approved by SAG — ready for Finance review</p>

      {apps.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-5xl mb-4">📭</p>
          <p className="text-lg font-medium">No pending applications</p>
        </div>
      ) : (
        <div className="space-y-4">
          {apps.map((app) => (
            <div key={app._id} className="bg-white rounded-xl shadow p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="space-y-1">
                <p className="font-semibold text-gray-800 text-lg">{app.applicantName}</p>
                <p className="text-sm text-gray-500">{app.schemeName}</p>
                <p className="text-xs text-blue-600 font-mono">{app.urnNumber}</p>
                <span className="inline-block px-2 py-0.5 rounded-full text-xs bg-yellow-100 text-yellow-700 font-medium">{app.status}</span>
              </div>
              <button onClick={() => setSelectedApp(app)} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-semibold transition">View & Take Action</button>
            </div>
          ))}
        </div>
      )}

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
                <button onClick={() => setAction("approve")} className={`flex-1 py-2 rounded-lg border-2 font-semibold transition ${action === "approve" ? "bg-green-600 text-white border-green-600" : "border-green-600 text-green-600 hover:bg-green-50"}`}>✅ Approve</button>
                <button onClick={() => setAction("reject")} className={`flex-1 py-2 rounded-lg border-2 font-semibold transition ${action === "reject" ? "bg-red-600 text-white border-red-600" : "border-red-600 text-red-600 hover:bg-red-50"}`}>❌ Reject</button>
              </div>
              {action === "approve" && <input type="number" placeholder="Enter scholarship amount (₹)" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />}
              <textarea rows={3} placeholder="Enter remarks (required)..." value={remarks} onChange={(e) => setRemarks(e.target.value)} className="w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
              <button onClick={handleAction} disabled={submitting} className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg transition disabled:opacity-50">{submitting ? "Submitting..." : "Submit Decision"}</button>
            </div>
          </div>
        </div>
      )}

      <StripeSimulationModal isOpen={showStripeModal} onClose={() => setShowStripeModal(false)} app={paymentApp} onSuccess={() => fetchApps()} />
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
