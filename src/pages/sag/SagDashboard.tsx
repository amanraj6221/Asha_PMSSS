// C:\Users\Aman Raj\PMSSS\src\pages\sag\SagDashboard.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/api/axios";
import socket from "@/utils/socket";

const SagDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });
  const [recentApps, setRecentApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const res = await api.get("/applications/sag/all");
      if (res.data?.success) {
        const all = res.data.data;
        setStats({
          total: all.length,
          pending: all.filter((a: any) => a.status === "Pending SAG").length,
          approved: all.filter((a: any) => a.status === "Approved by SAG").length,
          rejected: all.filter((a: any) => a.status === "Rejected by SAG").length,
        });
        setRecentApps(all.slice(0, 5));
      }
    } catch (err) {
      console.error("❌ SAG Dashboard error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    socket.emit("joinRoom", "SAG");

    socket.on("newApplication", () => fetchStats());
    socket.on("sagAction", () => fetchStats());

    return () => {
      socket.off("newApplication");
      socket.off("sagAction");
    };
  }, []);

  const sagUser = JSON.parse(localStorage.getItem("sag_user") || "{}");

  if (loading)
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome, {sagUser?.username || "SAG Officer"} 👋
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          SAG Bureau Dashboard — Real-time scholarship review panel
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          label="Total Applications"
          value={stats.total}
          color="blue"
          icon="📋"
        />
        <StatCard
          label="Pending Review"
          value={stats.pending}
          color="yellow"
          icon="⏳"
        />
        <StatCard
          label="Approved"
          value={stats.approved}
          color="green"
          icon="✅"
        />
        <StatCard
          label="Rejected"
          value={stats.rejected}
          color="red"
          icon="❌"
        />
      </div>

      {/* Quick Action */}
      {stats.pending > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 flex items-center justify-between">
          <div>
            <p className="font-semibold text-blue-800">
              {stats.pending} application{stats.pending > 1 ? "s" : ""} waiting for review
            </p>
            <p className="text-sm text-blue-600">
              Review and take action to forward to Finance Bureau
            </p>
          </div>
          <button
            onClick={() => navigate("/sag/applications")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold transition"
          >
            Review Now →
          </button>
        </div>
      )}

      {/* Recent Applications */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Recent Applications
        </h2>
        {recentApps.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-8">
            No applications yet
          </p>
        ) : (
          <div className="space-y-3">
            {recentApps.map((app) => (
              <div
                key={app._id}
                className="flex items-center justify-between py-2 border-b last:border-0"
              >
                <div>
                  <p className="font-medium text-gray-800 text-sm">
                    {app.applicantName}
                  </p>
                  <p className="text-xs text-gray-400">{app.schemeName}</p>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    app.status === "Pending SAG"
                      ? "bg-yellow-100 text-yellow-700"
                      : app.status === "Approved by SAG"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {app.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
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
    red: "bg-red-50 border-red-200 text-red-700",
  };

  return (
    <div className={`rounded-xl border p-4 ${colors[color]}`}>
      <p className="text-2xl">{icon}</p>
      <p className="text-3xl font-bold mt-2">{value}</p>
      <p className="text-xs font-medium mt-1 opacity-80">{label}</p>
    </div>
  );
};

export default SagDashboard;