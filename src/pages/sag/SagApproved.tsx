import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, RefreshCw, User, Calendar, Hash } from "lucide-react";

interface Application {
  _id: string;
  schemeName: string;
  scholarshipName?: string;
  urnNumber?: string;       // Matches backend schema key perfectly
  referenceNo?: string;
  referenceNumber?: string;
  createdAt: string;       
  appliedDate?: string;
  applicantName?: string;   // Matches backend schema key perfectly
  personalDetails?: {       
    name: string;
  };
  status: string;
}

const SagApproved = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch approved applications from correct SAG endpoint
  const fetchApproved = async () => {
    setLoading(true);
    try {
      // 🛠️ FIXED ENDPOINT: Directly calling your backend file routing structure
      const resp = await fetch("http://localhost:5000/api/applications/sag/all", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || localStorage.getItem("sag_token")}`,
        },
      });
      const resData = await resp.json();
      
      if (resp.ok && resData.success && Array.isArray(resData.data)) {
        // 🔥 UNIFIED COMPATIBILITY FILTER ENGINE 🔥
        // Explicitly matches your exact backend database status string: "Approved by SAG"
        const approvedList = resData.data.filter((a: Application) => {
          const currentStatus = (a.status || "").trim();
          return (
            currentStatus === "Approved by SAG" || 
            currentStatus === "SAG_Approved" || 
            currentStatus.toUpperCase() === "APPROVED"
          );
        });
        setApplications(approvedList);
      } else {
        console.error("API Error format mismatch:", resData.message);
      }
    } catch (err) {
      console.error("❌ Network synchronization failure:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApproved();
  }, []);

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-2 animate-fadeIn">
      {/* Premium Elegant Header Banner */}
      <Card className="p-6 flex items-center justify-between bg-gradient-to-r from-emerald-50 via-teal-50/20 to-white border border-emerald-100/60 shadow-sm rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-500 p-2.5 rounded-xl text-white shadow-md shadow-emerald-500/10">
            <CheckCircle className="h-6 w-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-800 tracking-tight">Approved Scholarships Ledger</h2>
            <p className="text-xs font-semibold text-slate-400 mt-0.5">Verified & forwarded records to State Finance Bureau</p>
          </div>
        </div>
        <Button
          onClick={fetchApproved}
          disabled={loading}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-2 disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          <span>{loading ? "Syncing..." : "Refresh Feed"}</span>
        </Button>
      </Card>

      {/* Applications List View Component Block */}
      <Card className="p-6 shadow-sm rounded-2xl border border-slate-100 bg-white">
        {loading ? (
          <div className="text-center py-12 space-y-3">
            <RefreshCw className="h-8 w-8 text-emerald-500 animate-spin mx-auto" />
            <p className="font-medium text-slate-400 text-sm">Syncing cleared administrative matrix records...</p>
          </div>
        ) : applications.length === 0 ? (
          <div className="text-center py-16 space-y-2">
            <CheckCircle className="h-12 w-12 text-slate-200 mx-auto" />
            <p className="text-slate-700 font-bold text-base">No Records Manifested</p>
            <p className="text-gray-400 text-xs max-w-xs mx-auto">Applications approved under SAG status validation loops will show up instantly inside this section dashboard ledger.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {applications.map((app) => {
              // Extract variables seamlessly matching your original file variables array
              const displayScheme = app.schemeName || app.scholarshipName || "PMSSS Higher Education Grant";
              const displayRef = app.urnNumber || app.referenceNo || app.referenceNumber || "URN-PENDING";
              const displayApplicant = app.applicantName || app.personalDetails?.name || "Student Candidate";
              const displayDate = app.createdAt || app.appliedDate || new Date().toISOString();

              return (
                <div
                  key={app._id}
                  className="border border-slate-100 hover:border-emerald-200 p-5 rounded-2xl flex flex-col md:flex-row justify-between md:items-center hover:shadow-md transition-all gap-4 bg-gradient-to-br from-white to-slate-50/30"
                >
                  <div className="space-y-2 flex-1">
                    <p className="font-black text-slate-800 text-base md:text-lg tracking-tight">
                      {displayScheme}
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-1 gap-x-6 text-xs font-bold text-slate-500">
                      <div className="flex items-center gap-1.5 truncate">
                        <Hash className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                        <span>URN: <span className="text-slate-800 font-extrabold select-all">{displayRef}</span></span>
                      </div>
                      <div className="flex items-center gap-1.5 truncate">
                        <User className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                        <span>Applicant: <span className="text-blue-600 font-extrabold">{displayApplicant}</span></span>
                      </div>
                      <div className="flex items-center gap-1.5 truncate">
                        <Calendar className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                        <span>Approved On: <span className="text-slate-700 font-semibold">{new Date(displayDate).toLocaleDateString()}</span></span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-2 md:mt-0 flex items-center shrink-0">
                    <span className="px-4 py-1.5 text-xs font-black uppercase tracking-wider rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 shadow-sm">
                      Approved by SAG
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
};

export default SagApproved;
