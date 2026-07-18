// 📂 C:\Users\Aman Raj\PMSSS\src\pages\sag\SagApplications.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/api/axios";
import socket from "@/utils/socket";

const SagApplications = () => {
  const navigate = useNavigate();
  const [apps, setApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchApps = async () => {
    try {
      const res = await api.get("/applications/sag/pending");
      if (res.data?.success) setApps(res.data.data);
    } catch (err) {
      console.error("❌ SAG fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApps();

    socket.emit("joinRoom", "SAG");

    socket.on("newApplication", (app: any) => {
      setApps((prev) => {
        const exists = prev.some((p) => p._id === app._id);
        return exists ? prev : [app, ...prev];
      });
    });

    socket.on("sagAction", (updated: any) => {
      setApps((prev) => prev.filter((a) => a._id !== updated._id));
    });

    return () => {
      socket.off("newApplication");
      socket.off("sagAction");
    };
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Pending Applications</h1>
        <button
          onClick={fetchApps}
          className="text-sm text-blue-600 hover:underline"
        >
          🔄 Refresh
        </button>
      </div>

      <p className="text-gray-500 text-sm">
        Total Pending:{" "}
        <span className="font-semibold text-gray-700">{apps.length}</span>
      </p>

      {apps.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-5xl mb-4">📭</p>
          <p className="text-lg font-medium">No pending applications</p>
          <p className="text-sm">New applications will appear here in real-time</p>
        </div>
      ) : (
        <div className="space-y-4">
          {apps.map((app) => (
            <div
              key={app._id}
              className="bg-white rounded-xl shadow p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border border-gray-100 hover:border-blue-200 transition"
            >
              <div className="space-y-1">
                <p className="font-semibold text-gray-800 text-lg">
                  {app.applicantName}
                </p>
                <p className="text-sm text-gray-500">{app.schemeName}</p>
                <p className="text-xs text-blue-600 font-mono">{app.urnNumber}</p>
                <div className="flex gap-2 flex-wrap text-xs text-gray-400">
                  <span>📧 {app.email}</span>
                  <span>📱 {app.mobile}</span>
                  <span>
                    📅{" "}
                    {app.createdAt
                      ? new Date(app.createdAt).toLocaleDateString("en-IN")
                      : "—"}
                  </span>
                </div>
                <span className="inline-block px-2 py-0.5 rounded-full text-xs bg-yellow-100 text-yellow-700 font-medium">
                  ⏳ {app.status}
                </span>
              </div>
              <button
                onClick={() => navigate(`/sag/application/${app._id}`)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-semibold transition whitespace-nowrap"
              >
                View Details →
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SagApplications;