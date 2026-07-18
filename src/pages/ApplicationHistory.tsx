// C:\Users\Aman Raj\PMSSS\src\pages\ApplicationHistory.tsx
import { useEffect } from "react";
import { useApplications } from "@/contexts/ApplicationContext";

const statusColor: Record<string, string> = {
  "Pending SAG": "bg-yellow-100 text-yellow-700",
  "Approved by SAG": "bg-blue-100 text-blue-700",
  "Rejected by SAG": "bg-red-100 text-red-700",
  "Approved by Finance": "bg-green-100 text-green-700",
  "Rejected by Finance": "bg-red-100 text-red-700",
  "Money Transferred": "bg-purple-100 text-purple-700",
};

const statusIcon: Record<string, string> = {
  "Pending SAG": "⏳",
  "Approved by SAG": "✅",
  "Rejected by SAG": "❌",
  "Approved by Finance": "✅",
  "Rejected by Finance": "❌",
  "Money Transferred": "💰",
};

const ApplicationHistory = () => {
  const { applications, refreshApplications } = useApplications();
  const userId = localStorage.getItem("userId") || "";

  useEffect(() => {
    if (userId) refreshApplications(userId);
  }, [userId]);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Application History</h1>
        <button
          onClick={() => refreshApplications(userId)}
          className="text-sm text-blue-600 hover:underline"
        >
          🔄 Refresh
        </button>
      </div>

      {applications.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-5xl mb-4">📄</p>
          <p className="text-lg font-medium">No applications yet</p>
          <p className="text-sm">Browse scholarships and apply to get started</p>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div
              key={app._id}
              className="bg-white rounded-xl shadow p-5 space-y-4 border border-gray-100"
            >
              {/* Top Row */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-gray-800 text-lg">{app.schemeName}</p>
                  <p className="text-xs text-blue-600 font-mono mt-1">{app.urnNumber}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                    statusColor[app.status] || "bg-gray-100 text-gray-600"
                  }`}
                >
                  {statusIcon[app.status]} {app.status}
                </span>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                <Detail label="Applicant" value={app.applicantName} />
                <Detail
                  label="Applied On"
                  value={
                    app.appliedDate
                      ? new Date(app.appliedDate).toLocaleDateString("en-IN")
                      : app.createdAt
                      ? new Date(app.createdAt).toLocaleDateString("en-IN")
                      : "—"
                  }
                />
                {app.amount && (
                  <Detail label="Scholarship Amount" value={`₹${app.amount}`} />
                )}
              </div>

              {/* Remarks */}
              {(app.sagRemarks || app.financeRemarks || app.paymentRemarks) && (
                <div className="bg-gray-50 rounded-lg p-3 space-y-1 text-sm">
                  {app.sagRemarks && (
                    <p>
                      <span className="font-medium text-gray-600">SAG Remarks:</span>{" "}
                      {app.sagRemarks}
                    </p>
                  )}
                  {app.financeRemarks && (
                    <p>
                      <span className="font-medium text-gray-600">Finance Remarks:</span>{" "}
                      {app.financeRemarks}
                    </p>
                  )}
                  {app.paymentRemarks && (
                    <p>
                      <span className="font-medium text-gray-600">Payment:</span>{" "}
                      {app.paymentRemarks}
                    </p>
                  )}
                </div>
              )}

              {/* Status Timeline */}
              {app.history && app.history.length > 0 && (
                <div className="border-t pt-3">
                  <p className="text-xs font-semibold text-gray-500 mb-2 uppercase">
                    Status Timeline
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {app.history.map((h: any, i: number) => (
                      <div key={i} className="flex items-center gap-1 text-xs text-gray-500">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            h.status.includes("Rejected")
                              ? "bg-red-400"
                              : h.status.includes("Transferred")
                              ? "bg-purple-400"
                              : "bg-green-400"
                          }`}
                        ></span>
                        {h.status}
                        {i < app.history.length - 1 && (
                          <span className="text-gray-300 ml-1">→</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Money Transferred Banner */}
              {app.status === "Money Transferred" && (
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 text-center">
                  <p className="text-purple-700 font-semibold text-sm">
                    🎉 Congratulations! Scholarship amount has been credited to your account!
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Detail = ({ label, value }: { label: string; value?: string }) => (
  <div>
    <p className="text-gray-400 text-xs">{label}</p>
    <p className="font-medium text-gray-800">{value || "—"}</p>
  </div>
);

export default ApplicationHistory;