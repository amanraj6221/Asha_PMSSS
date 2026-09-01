// C:\Users\Aman Mehra\Edu_Hub\Asha_PMSSS\src\pages\finance\FinanceLogin.tsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreditCard, LogIn } from "lucide-react";

const FinanceLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      alert("⚠️ Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/finance/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        // ✅ Synchronizing session keys to satisfy all dynamic routing middleware validations
        localStorage.setItem("token", data.token);
        localStorage.setItem("finance_token", data.token);
        localStorage.setItem("role", "FINANCE");
        localStorage.setItem("finance_user", JSON.stringify(data.user));
        
        if (data.user && data.user._id) {
          localStorage.setItem("userId", data.user._id);
        }

        alert("✅ Login successful!");
        
        // 🔥 THE REDIRECTION PATH FIX LOCK 🔥
        // Points perfectly to your verified dashboard component route path map!
        navigate("/dashboard/finance"); 
      } else {
        alert("❌ " + (data.message || "Invalid credentials!"));
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("❌ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-green-600 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        {/* Icon Profile Badge Element */}
        <div className="flex items-center justify-center mb-6">
          <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-700 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/20">
            <CreditCard className="text-white h-7 w-7" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center text-slate-800 mb-1">
          Finance Bureau Login
        </h2>
        <p className="text-xs text-center text-green-600 font-bold uppercase tracking-wider mb-6">
          State Treasury Operations Department
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-xs font-bold text-slate-600 block mb-1">Official Authorized Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter official email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:border-green-500 font-medium text-sm transition-all"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-600 block mb-1">Secure Authorization Key</label>
            <input
              type="password"
              name="password"
              placeholder="Enter secure password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:border-green-500 font-medium text-sm transition-all"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 mt-2 rounded-xl transition-all shadow-md shadow-green-500/10 flex items-center justify-center gap-2"
          >
            <LogIn className="h-4 w-4" />
            <span>{loading ? "Verifying Session..." : "Login to Operations Desk"}</span>
          </Button>
        </form>

        <div className="text-center mt-6">
          <Link to="/" className="text-sm font-semibold text-muted-foreground hover:text-green-600 transition-colors">
            ⬅ Back to Central Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FinanceLogin;
