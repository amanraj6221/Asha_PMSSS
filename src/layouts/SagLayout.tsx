// C:\Users\Aman Raj\PMSSS\src\layouts\SagLayout.tsx

import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";
import {
  Home,
  FileText,
  CheckCircle,
  Clock,
  IndianRupee,
  Users,
  BookOpen,
  Settings,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";

function SagLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Active route check (prefix match bhi allow kiya)
  const isActive = (path: string) => location.pathname.startsWith(path);

  // ✅ Logout handler
  const handleLogout = () => {
    try {
      localStorage.removeItem("sag_user");
      localStorage.removeItem("sag_token");
      navigate("/sag/login"); // direct sag login pe bhejo
    } catch (error) {
      console.error("Logout error:", error);
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* ---------------- Sidebar ---------------- */}
      <aside className="w-64 flex-shrink-0">
        <Card className="p-6 min-h-screen rounded-none flex flex-col">
          {/* SAG Officer Profile */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-800">SAG Bureau</h3>
            <p className="text-sm text-gray-600">Officer Dashboard</p>
          </div>

          {/* ---------------- Navigation ---------------- */}
          <nav className="space-y-2 flex-1">
            <button
              onClick={() => navigate("/sag/dashboard")}
              className={`w-full text-left flex items-center px-4 py-3 rounded-lg text-sm ${
                isActive("/sag/dashboard")
                  ? "bg-green-100 text-green-700 font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Home className="h-4 w-4 mr-3" />
              Dashboard Overview
            </button>

            <button
              onClick={() => navigate("/sag/applications")}
              className={`w-full text-left flex items-center px-4 py-3 rounded-lg text-sm ${
                isActive("/sag/applications")
                  ? "bg-green-100 text-green-700 font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <FileText className="h-4 w-4 mr-3" />
              Applications
            </button>

            <button
              onClick={() => navigate("/sag/approved")}
              className={`w-full text-left flex items-center px-4 py-3 rounded-lg text-sm ${
                isActive("/sag/approved")
                  ? "bg-green-100 text-green-700 font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <CheckCircle className="h-4 w-4 mr-3" />
              Approved Scholarships
            </button>

            <button
              onClick={() => navigate("/sag/pending")}
              className={`w-full text-left flex items-center px-4 py-3 rounded-lg text-sm ${
                isActive("/sag/pending")
                  ? "bg-green-100 text-green-700 font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Clock className="h-4 w-4 mr-3" />
              Waiting for Disbursement
            </button>

            <button
              onClick={() => navigate("/sag/disbursed")}
              className={`w-full text-left flex items-center px-4 py-3 rounded-lg text-sm ${
                isActive("/sag/disbursed")
                  ? "bg-green-100 text-green-700 font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <IndianRupee className="h-4 w-4 mr-3" />
              Disbursed Scholarships
            </button>

            <button
              onClick={() => navigate("/sag/schemes")}
              className={`w-full text-left flex items-center px-4 py-3 rounded-lg text-sm ${
                isActive("/sag/schemes")
                  ? "bg-green-100 text-green-700 font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <BookOpen className="h-4 w-4 mr-3" />
              Listed Schemes
            </button>

            <button
              onClick={() => navigate("/sag/settings")}
              className={`w-full text-left flex items-center px-4 py-3 rounded-lg text-sm ${
                isActive("/sag/settings")
                  ? "bg-green-100 text-green-700 font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Settings className="h-4 w-4 mr-3" />
              Settings
            </button>
          </nav>

          {/* ---------------- Logout Button ---------------- */}
          <div className="pt-6 border-t border-gray-200 mt-6">
            <Button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white"
            >
              <LogOut className="h-4 w-4" /> Logout
            </Button>
          </div>
        </Card>
      </aside>

      {/* ---------------- Main Content ---------------- */}
      <main className="flex-1 p-6 bg-white rounded-lg shadow-sm">
        <Outlet /> {/* ✅ Route child pages show honge yahan */}
      </main>
    </div>
  );
}

export default SagLayout;
