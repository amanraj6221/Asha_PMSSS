// 📂 C:\Users\Aman Raj\PMSSS\src\pages\UserDashboard.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApplications } from "@/contexts/ApplicationContext";

const statusColor: Record<string, string> = {
  "Pending SAG": "bg-yellow-100 text-yellow-700",
  "Approved by SAG": "bg-blue-100 text-blue-700",
  "Rejected by SAG": "bg-red-100 text-red-700",
  "Approved by Finance": "bg-green-100 text-green-700",
  "Rejected by Finance": "bg-red-100 text-red-700",
  "Money Transferred": "bg-purple-100 text-purple-700",
};

const UserDashboard = () => {
  const navigate = useNavigate();
  const { applications, refreshApplications } = useApplications();
  const userId = localStorage.getItem("userId") || "";
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    if (userId) refreshApplications(userId);
  }, [userId]);

  const active = applications.filter(
    (a) => a.status !== "Rejected by SAG" && a.status !== "Rejected by Finance"
  );
  const transferred = applications.filter(
    (a) => a.status === "Money Transferred"
  );
  const pending = applications.filter((a) => a.status === "Pending SAG");
  const latest = applications[0];

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome, {user?.username || user?.name || "Student"} 👋
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Track your scholarship applications in real-time
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Applied" value={applications.length} color="blue" icon="📋" />
        <StatCard label="Active" value={active.length} color="green" icon="✅" />
        <StatCard label="Pending" value={pending.length} color="yellow" icon="⏳" />
        <StatCard label="Disbursed" value={transferred.length} color="purple" icon="💰" />
      </div>

      {/* Latest Status */}
      {latest && (
        <div className="bg-white rounded-xl shadow p-5 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            Latest Application
          </h2>
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <p className="font-semibold text-gray-800">{latest.schemeName}</p>
              <p className="text-xs text-blue-600 font-mono mt-1">
                {latest.urnNumber}
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                statusColor[latest.status] || "bg-gray-100 text-gray-600"
              }`}
            >
              {latest.status}
            </span>
          </div>
          {latest.status === "Money Transferred" && (
            <div className="mt-3 bg-purple-50 border border-purple-200 rounded-lg p-3 text-center">
              <p className="text-purple-700 font-semibold text-sm">
                🎉 Scholarship amount credited to your account!
              </p>
            </div>
          )}
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ActionCard
          icon="🎓"
          title="Browse Scholarships"
          desc="Explore available scholarship schemes and apply"
          color="blue"
          onClick={() => navigate("/dashboard/recommend")}
        />
        <ActionCard
          icon="📄"
          title="Application History"
          desc="View all your applications and real-time status"
          color="green"
          onClick={() => navigate("/dashboard/history")}
        />
      </div>

      {/* Recent Applications */}
      {applications.length > 0 && (
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-700">
              Recent Applications
            </h2>
            <button
              onClick={() => navigate("/dashboard/history")}
              className="text-sm text-blue-600 hover:underline"
            >
              View All →
            </button>
          </div>
          <div className="space-y-3">
            {applications.slice(0, 4).map((app) => (
              <div
                key={app._id}
                className="flex items-center justify-between py-2 border-b last:border-0"
              >
                <div>
                  <p className="font-medium text-gray-800 text-sm">
                    {app.schemeName}
                  </p>
                  <p className="text-xs text-gray-400 font-mono">
                    {app.urnNumber}
                  </p>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    statusColor[app.status] || "bg-gray-100 text-gray-600"
                  }`}
                >
                  {app.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard = ({
  label,
  value,
  color,
  icon,
}: {
  label: string;
  value: number;
  color: string;
  icon: string;
}) => {
  const colors: Record<string, string> = {
    blue: "bg-blue-50 border-blue-200 text-blue-700",
    yellow: "bg-yellow-50 border-yellow-200 text-yellow-700",
    green: "bg-green-50 border-green-200 text-green-700",
    purple: "bg-purple-50 border-purple-200 text-purple-700",
  };
  return (
    <div className={`rounded-xl border p-4 ${colors[color]}`}>
      <p className="text-2xl">{icon}</p>
      <p className="text-3xl font-bold mt-2">{value}</p>
      <p className="text-xs font-medium mt-1 opacity-80">{label}</p>
    </div>
  );
};

const ActionCard = ({
  icon,
  title,
  desc,
  color,
  onClick,
}: {
  icon: string;
  title: string;
  desc: string;
  color: string;
  onClick: () => void;
}) => {
  const colors: Record<string, string> = {
    blue: "hover:border-blue-400 hover:bg-blue-50",
    green: "hover:border-green-400 hover:bg-green-50",
  };
  return (
    <button
      onClick={onClick}
      className={`w-full text-left bg-white rounded-xl shadow p-5 border border-gray-100 transition ${colors[color]}`}
    >
      <p className="text-3xl mb-2">{icon}</p>
      <p className="font-semibold text-gray-800">{title}</p>
      <p className="text-sm text-gray-500 mt-1">{desc}</p>
    </button>
  );
};

export default UserDashboard;