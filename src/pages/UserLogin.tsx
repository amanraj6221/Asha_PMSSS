// 📂 src/pages/UserLogin.tsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

function UserLogin() {
  const [identifier, setIdentifier] = useState(""); // Change variable to represent both Username/Email
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // ✅ Payload map includes universal identifier key and dynamic role validation parameters
      const res = await api.post("/auth/login", { 
        identifier: identifier, 
        password: password,
        role: "USER" // 👈 Dynamic Role parameter back-validation system map
      });
      
      const data = res.data;

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", "USER");
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("userId", data.user._id);
        }
      }

      alert("Login successful!");
      navigate("/dashboard"); // Redirect to the student workbench area
    } catch (err: any) {
      console.error("Login error:", err);
      // 🔥 Server se aane waale strict explicit validation trace logs pop-up dikhayega 🔥
      alert(err.response?.data?.message || "Error logging in");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-muted/20 py-20">
      <Card className="w-full max-w-md p-8 shadow-lg hover:shadow-xl transition">
        <div className="flex items-center justify-center mb-6">
          <div className="w-14 h-14 bg-gradient-primary rounded-2xl flex items-center justify-center">
            <LogIn className="text-white h-7 w-7" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center mb-6">User Login</h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          {/* ✅ Type shifted from 'email' to 'text' to accept username as identifier smoothly without browser pop-up validation checks */}
          <Input
            type="text"
            placeholder="Enter Username or Email"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" className="w-full bg-gradient-primary">
            Login
          </Button>
        </form>

        <p className="text-sm text-center mt-4 text-muted-foreground">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary hover:underline">
            Register
          </Link>
        </p>

        <div className="text-center mt-6">
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
            Back to Home
          </Link>
        </div>
      </Card>
    </section>
  );
}

export default UserLogin;
