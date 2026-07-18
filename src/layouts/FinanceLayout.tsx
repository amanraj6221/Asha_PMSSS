// 📂 src/layouts/FinanceLayout.tsx
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Home,
  FileText,
  CheckCircle,
  XCircle,
  IndianRupee,
  Settings,
  List,
  LogOut,
} from "lucide-react";
import { useEffect } from "react";

function FinanceLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  // ---------------- Active Sidebar Link ----------------
  const isActive = (path: string) => location.pathname === path;

  // ---------------- Logout ----------------
  const handleLogout = () => {
    localStorage.removeItem("finance_user");
    localStorage.removeItem("finance_token");
    navigate("/login/finance");
  };

  // ---------------- Redirect to Dashboard Overview if first login ----------------
  useEffect(() => {
    const token = localStorage.getItem("finance_token");
    if (!token) {
      navigate("/login/finance");
    } else if (
      location.pathname === "/dashboard/finance" ||
      location.pathname === "/dashboard/finance/"
    ) {
      // default dashboard, no action needed
      return;
    }
  }, [location.pathname, navigate]);

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* ---------------- Sidebar ---------------- */}
      <aside className="w-64 flex-shrink-0">
        <Card className="p-6 min-h-screen rounded-none flex flex-col">
          {/* Profile */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <IndianRupee className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-800">Finance Bureau</h3>
            <p className="text-sm text-gray-600">Admin Dashboard</p>
          </div>

          {/* Navigation */}
          <nav className="space-y-2 flex-1">
            <button
              onClick={() => navigate("/dashboard/finance")}
              className={`w-full text-left flex items-center px-4 py-3 rounded-lg text-sm ${
                isActive("/dashboard/finance")
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Home className="h-4 w-4 mr-3" />
              Dashboard Overview
            </button>

            <button
              onClick={() =>
                navigate("/dashboard/finance/finance-applications")
              }
              className={`w-full text-left flex items-center px-4 py-3 rounded-lg text-sm ${
                isActive("/dashboard/finance/finance-applications")
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <FileText className="h-4 w-4 mr-3" />
              Applications
            </button>

            <button
              onClick={() => navigate("/dashboard/finance/approved")}
              className={`w-full text-left flex items-center px-4 py-3 rounded-lg text-sm ${
                isActive("/dashboard/finance/approved")
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <CheckCircle className="h-4 w-4 mr-3" />
              Approved Scholarships
            </button>

            <button
              onClick={() => navigate("/dashboard/finance/waiting")}
              className={`w-full text-left flex items-center px-4 py-3 rounded-lg text-sm ${
                isActive("/dashboard/finance/waiting")
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <XCircle className="h-4 w-4 mr-3" />
              Waiting for Disbursement
            </button>

            <button
              onClick={() => navigate("/dashboard/finance/disbursed")}
              className={`w-full text-left flex items-center px-4 py-3 rounded-lg text-sm ${
                isActive("/dashboard/finance/disbursed")
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <IndianRupee className="h-4 w-4 mr-3" />
              Disbursed Scholarships
            </button>

            <button
              onClick={() => navigate("/dashboard/finance/schemes")}
              className={`w-full text-left flex items-center px-4 py-3 rounded-lg text-sm ${
                isActive("/dashboard/finance/schemes")
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <List className="h-4 w-4 mr-3" />
              Listed Schemes
            </button>

            <button
              onClick={() => navigate("/dashboard/finance/settings")}
              className={`w-full text-left flex items-center px-4 py-3 rounded-lg text-sm ${
                isActive("/dashboard/finance/settings")
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Settings className="h-4 w-4 mr-3" />
              Settings
            </button>
          </nav>

          {/* Logout */}
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
        <Outlet /> {/* Child routes render here */}
      </main>
    </div>
  );
}

export default FinanceLayout;
