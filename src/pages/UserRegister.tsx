import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

function UserRegister() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/register", {
        username,
        email,
        password,
      });

      if (res.data.success) {
        alert("Registered successfully!");
        navigate("/login");
      }
    } catch (err: any) {
      console.error("Register error:", err);
      alert(err.response?.data?.message || "Error registering user");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-muted/20 py-20">
      <Card className="w-full max-w-md p-8 shadow-lg hover:shadow-xl transition">
        <div className="flex items-center justify-center mb-6">
          <div className="w-14 h-14 bg-gradient-success rounded-2xl flex items-center justify-center">
            <UserPlus className="text-white h-7 w-7" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Enter Password (min 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" className="w-full bg-gradient-success">
            Register
          </Button>
        </form>

        <p className="text-sm text-center mt-4 text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Login
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

export default UserRegister;