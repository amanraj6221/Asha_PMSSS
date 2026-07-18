// 📂 src/pages/sag/SagLogin.tsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api/axios"; // ✅ axios instance
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";

const SagLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      alert("⚠️ Please fill in both fields");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/sag/auth/login", { username, password });
      const data = res.data;

      // ✅ Save SAG token & user info in localStorage
      if (data.token) {
        localStorage.setItem("sag_token", data.token);
      }
      if (data.user) {
        localStorage.setItem("sag_user", JSON.stringify(data.user));
      }

      console.log("✅ SAG Login successful:", data);
      alert("✅ Login successful");

      // ✅ Redirect to dashboard
      navigate("/sag/dashboard", { replace: true });
    } catch (err: any) {
      console.error("❌ Login error:", err);
      alert(err.response?.data?.message || "❌ Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-muted/20 py-20">
      <Card className="w-full max-w-md p-8 shadow-lg hover:shadow-xl transition">
        {/* Icon Header */}
        <div className="flex items-center justify-center mb-6">
          <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center">
            <ShieldCheck className="text-white h-7 w-7" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-6">
          SAG Bureau Login
        </h2>

        {/* Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            {loading ? "Please wait..." : "Login"}
          </Button>
        </form>

        {/* Footer Links */}
        <p className="text-sm text-center mt-4 text-muted-foreground">
          Don’t have an account?{" "}
          <Link to="/sag/register" className="text-primary hover:underline">
            Register
          </Link>
        </p>

        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-sm text-muted-foreground hover:text-primary"
          >
            ⬅ Back to Home
          </Link>
        </div>
      </Card>
    </section>
  );
};

export default SagLogin;
