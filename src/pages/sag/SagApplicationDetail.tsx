import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "@/api/axios";
 
const SagApplicationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [app, setApp] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [action, setAction] = useState<"approve" | "reject" | null>(null);
  const [remarks, setRemarks] = useState("");
  const [submitting, setSubmitting] = useState(false);
 
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await api.get(`/applications/sag/detail/${id}`);
        if (res.data?.success) setApp(res.data.data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);
 
  const handleAction = async () => {
    if (!action) return alert("Please select Approve or Reject");
    if (!remarks.trim()) return alert("Please enter remarks");
    setSubmitting(true);
    try {
      const res = await api.post("/applications/sag/action", {
        appId: id,
        action,
        remarks,
      });
      if (res.data?.success) {
        alert(
          `Application ${action === "approve" ? "Approved" : "Rejected"} successfully!`
        );
        navigate("/sag/applications");
      }
    } catch (err: any) {
      alert(err?.response?.data?.message || "Action failed");
    } finally {
      setSubmitting(false);
    }
  };
 
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
 
  if (!app) {
    return (
      <div className="p-8 text-center text-red-500 font-semibold">
        Application not found.
      </div>
    );
  }
 
  const BASE_URL =
    import.meta.env.VITE_API_URL?.replace("/api", "") || "http://localhost:5000";
 
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:underline flex items-center gap-1"
        >
          Back
        </button>
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
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
 
      <h1 className="text-2xl font-bold text-gray-800">Application Detail</h1>
 
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-600 font-medium">URN Number</p>
        <p className="text-lg font-bold text-blue-800">{app.urnNumber}</p>
      </div>
 
      <div className="bg-white rounded-xl shadow p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">
          Personal Information
        </h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <Detail label="Applicant Name" value={app.applicantName} />
          <Detail label="Father Name" value={app.fatherName} />
          <Detail label="Mother Name" value={app.motherName} />
          <Detail label="Date of Birth" value={app.dob?.substring(0, 10)} />
          <Detail label="Gender" value={app.gender} />
          <Detail label="Mobile" value={app.mobile} />
          <Detail label="Email" value={app.email} />
          <Detail label="Aadhar Number" value={app.aadharNumber} />
          <Detail label="Caste Category" value={app.casteCategory} />
          <Detail label="Religion" value={app.religion} />
          <Detail label="Minority" value={app.isMinority ? "Yes" : "No"} />
          <Detail label="Family Income" value={app.familyIncome} />
          <Detail label="Guardian Occupation" value={app.guardianOccupation} />
        </div>
        <Detail label="Address" value={app.address} />
      </div>
 
      <div className="bg-white rounded-xl shadow p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">
          Scheme Information
        </h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <Detail label="Scheme Name" value={app.schemeName} />
          <Detail label="Scheme ID" value={String(app.schemeId)} />
        </div>
      </div>
 
      <div className="bg-white rounded-xl shadow p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">
          Bank Details
        </h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <Detail label="Bank Account" value={app.bankAccount} />
          <Detail label="IFSC Code" value={app.ifscCode} />
        </div>
      </div>
 
      <div className="bg-white rounded-xl shadow p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">
          Uploaded Documents
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {app.photo && (
            <DocLink label="Photo" url={`${BASE_URL}/${app.photo}`} />
          )}
          {app.signature && (
            <DocLink label="Signature" url={`${BASE_URL}/${app.signature}`} />
          )}
          {app.tenthMarksheet && (
            <DocLink
              label="10th Marksheet"
              url={`${BASE_URL}/${app.tenthMarksheet}`}
            />
          )}
          {app.twelfthMarksheet && (
            <DocLink
              label="12th Marksheet"
              url={`${BASE_URL}/${app.twelfthMarksheet}`}
            />
          )}
          {app.documents?.map((doc: string, i: number) => (
            <DocLink
              key={i}
              label={`Document ${i + 1}`}
              url={`${BASE_URL}/${doc}`}
            />
          ))}
        </div>
      </div>
 
      <div className="bg-white rounded-xl shadow p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">
          Status History
        </h2>
        {app.history?.map((h: any, i: number) => (
          <div key={i} className="flex items-start gap-3 text-sm">
            <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5"></div>
            <div>
              <p className="font-medium">{h.status}</p>
              <p className="text-gray-500">{h.remarks}</p>
              <p className="text-gray-400 text-xs">{h.role}</p>
            </div>
          </div>
        ))}
      </div>
 
      {app.status === "Pending SAG" && (
        <div className="bg-white rounded-xl shadow p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">
            Take Action
          </h2>
          <div className="flex gap-4">
            <button
              onClick={() => setAction("approve")}
              className={`flex-1 py-2 rounded-lg border-2 font-semibold transition ${
                action === "approve"
                  ? "bg-green-600 text-white border-green-600"
                  : "border-green-600 text-green-600 hover:bg-green-50"
              }`}
            >
              Approve
            </button>
            <button
              onClick={() => setAction("reject")}
              className={`flex-1 py-2 rounded-lg border-2 font-semibold transition ${
                action === "reject"
                  ? "bg-red-600 text-white border-red-600"
                  : "border-red-600 text-red-600 hover:bg-red-50"
              }`}
            >
              Reject
            </button>
          </div>
          <textarea
            rows={3}
            placeholder="Enter remarks (required)..."
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            className="w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleAction}
            disabled={submitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Submit Decision"}
          </button>
        </div>
      )}
    </div>
  );
};
 
const Detail = ({
  label,
  value,
}: {
  label: string;
  value?: string;
}) => {
  return (
    <div>
      <p className="text-gray-500 text-xs">{label}</p>
      <p className="font-medium text-gray-800">{value || "-"}</p>
    </div>
  );
};
 
const DocLink = ({
  label,
  url,
}: {
  label: string;
  url: string;
}) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 text-blue-600 hover:underline text-sm"
    >
      {label}
    </a>
  );
};
 
export default SagApplicationDetail;