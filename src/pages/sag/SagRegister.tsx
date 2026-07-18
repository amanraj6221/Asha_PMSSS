// 📂 C:\Users\Aman Raj\PMSSS\src\pages\sag\SagRegister.tsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api/axios"; // ✅ axios instance
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ShieldPlus } from "lucide-react";

const SagRegister = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) return alert("Fill all fields");

    try {
      setLoading(true);
      const res = await api.post("/sag/auth/register", { username, password });

      if (res.status === 201 || res.status === 200) {
        alert("✅ SAG Registered! Please login");
        navigate("/sag/login"); // ✅ redirect to correct login
      }
    } catch (err: any) {
      console.error("Register error:", err);
      alert(err.response?.data?.message || "❌ Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-muted/20 py-20">
      <Card className="w-full max-w-md p-8 shadow-lg hover:shadow-xl transition">
        {/* Icon Header */}
        <div className="flex items-center justify-center mb-6">
          <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center">
            <ShieldPlus className="text-white h-7 w-7" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-6">
          SAG Bureau Registration
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
            disabled={loading}
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white"
          >
            {loading ? "Please wait..." : "Register"}
          </Button>
        </form>

        {/* Footer Links */}
        <p className="text-sm text-center mt-4 text-muted-foreground">
          Already have an account?{" "}
          <Link to="/sag/login" className="text-primary hover:underline">
            Login
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

export default SagRegister;
