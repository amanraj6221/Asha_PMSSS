// C:\Users\Aman Raj\PMSSS\src\layouts\UserLayout.tsx
import { Outlet, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import {
  Home,
  FileText,
  BookOpen,
  User,
  Bell,
  Settings,
  LogOut
} from "lucide-react";
import { useState } from "react";
import { useApplications } from "@/contexts/ApplicationContext";
import { Button } from "@/components/ui/button";

function UserLayout() {
  const navigate = useNavigate();
  const { applications } = useApplications();
  const [activeTab, setActiveTab] = useState("overview");

  const approvedCount = applications.filter(app => app.status === "approved").length;
  const pendingCount = applications.filter(app => app.status === "pending").length;

  // ✅ Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token"); // token clear
    navigate("/"); // redirect to homepage
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0">
        <Card className="p-6 min-h-screen rounded-none flex flex-col">
          {/* User Profile */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <User className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-800">Student User</h3>
            <p className="text-sm text-gray-600">Welcome to your dashboard</p>
          </div>

          {/* Navigation */}
          <nav className="space-y-2 flex-1">
            <button
              onClick={() => {
                setActiveTab("overview");
                navigate("/dashboard");
              }}
              className={`w-full text-left flex items-center px-4 py-3 rounded-lg text-sm ${
                activeTab === "overview"
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Home className="h-4 w-4 mr-3" />
              Dashboard Overview
            </button>

            <button
              onClick={() => navigate("/dashboard/recommend")}
              className="w-full text-left flex items-center px-4 py-3 rounded-lg text-sm text-gray-600 hover:bg-gray-100"
            >
              <BookOpen className="h-4 w-4 mr-3" />
              Browse Scholarships
            </button>

            <button
              onClick={() => navigate("/dashboard/history")}
              className="w-full text-left flex items-center px-4 py-3 rounded-lg text-sm text-gray-600 hover:bg-gray-100"
            >
              <FileText className="h-4 w-4 mr-3" />
              Application History
            </button>

            <button
              onClick={() => navigate("/dashboard/profile")}
              className="w-full text-left flex items-center px-4 py-3 rounded-lg text-sm text-gray-600 hover:bg-gray-100"
            >
              <User className="h-4 w-4 mr-3" />
              Profile Settings
            </button>

            <button
              onClick={() => {}}
              className="w-full text-left flex items-center px-4 py-3 rounded-lg text-sm text-gray-600 hover:bg-gray-100"
            >
              <Bell className="h-4 w-4 mr-3" />
              Notifications
            </button>

            <button
              onClick={() => {}}
              className="w-full text-left flex items-center px-4 py-3 rounded-lg text-sm text-gray-600 hover:bg-gray-100"
            >
              <Settings className="h-4 w-4 mr-3" />
              Settings
            </button>
          </nav>

          {/* ✅ Logout Button at bottom */}
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

      {/* Main content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}

export default UserLayout;
