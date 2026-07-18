import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface Application {
  _id: string;
  schemeName: string;
  referenceNo: string;
  appliedDate: string;
  applicantName?: string;
  status: string;
}

const SagApproved = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch approved applications
  const fetchApproved = async () => {
    setLoading(true);
    try {
      const resp = await fetch("http://localhost:5000/api/sag/applications", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("sag_token")}`,
        },
      });
      const data = await resp.json();
      if (resp.ok) {
        // filter only approved
        setApplications(
          data.filter((a: Application) => a.status === "APPROVED")
        );
      } else {
        console.error("Error:", data.message);
      }
    } catch (err) {
      console.error("Network error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApproved();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6 flex items-center justify-between bg-green-50 border-green-100">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <CheckCircle className="h-6 w-6 text-green-600" />
          Approved Scholarships
        </h2>
        <Button
          onClick={fetchApproved}
          className="bg-green-600 hover:bg-green-700"
        >
          Refresh
        </Button>
      </Card>

      {/* Applications List */}
      <Card className="p-6">
        {loading ? (
          <p>Loading...</p>
        ) : applications.length === 0 ? (
          <p className="text-gray-600">No approved applications yet.</p>
        ) : (
          <div className="space-y-4">
            {applications.map((app) => (
              <div
                key={app._id}
                className="border p-4 rounded-lg flex flex-col md:flex-row justify-between md:items-center"
              >
                <div>
                  <p className="font-semibold text-gray-800">
                    {app.schemeName}
                  </p>
                  <p className="text-sm text-gray-600">
                    Ref No: {app.referenceNo}
                  </p>
                  <p className="text-sm text-gray-600">
                    Applied On:{" "}
                    {new Date(app.appliedDate).toLocaleDateString()}
                  </p>
                  {app.applicantName && (
                    <p className="text-sm text-gray-600">
                      Applicant: {app.applicantName}
                    </p>
                  )}
                </div>
                <div className="mt-3 md:mt-0">
                  <span className="px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-700">
                    Approved
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default SagApproved;
