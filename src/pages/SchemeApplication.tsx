// 📂 src/pages/SchemeApplication.tsx
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download } from "lucide-react";
import { useState } from "react";
import { schemes } from "./RecommendScheme";
import { useApplications } from "@/contexts/ApplicationContext";

function SchemeApplication() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { applyScheme } = useApplications();
  const scheme = schemes.find((s) => s.id === parseInt(id || "0"));

  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    motherName: "",
    dob: "",
    gender: "",
    mobile: "",
    familyIncome: "",
    guardianOccupation: "",
    bankAccount: "",
    ifscCode: "",
    photo: null as File | null,
    signature: null as File | null,
    address: "",
    email: "",
    casteCategory: "",
    religion: "",
    isMinority: "",
    aadharNumber: "",
    tenthMarksheet: null as File | null,
    twelfthMarksheet: null as File | null,
    documents: [] as File[],
  });

  const [submitted, setSubmitted] = useState(false);
  const [urn, setUrn] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Input Change
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 🔹 Single File Upload
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({
        ...prev,
        [field]: file,
      }));
    }
  };

  // 🔹 Multiple Documents Upload
  const handleDocumentsUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setFormData((prev) => ({
        ...prev,
        documents: files,
      }));
    }
  };

  // 🔹 Validation
  const validateForm = (): string | null => {
    if (!formData.name.trim()) return "Full Name is required.";
    if (!formData.fatherName.trim()) return "Father Name is required.";
    if (!formData.dob) return "Date of Birth is required.";
    if (!formData.photo) return "Photograph is required.";
    if (!formData.signature) return "Signature is required.";
    if (!/^[0-9]{12}$/.test(formData.aadharNumber))
      return "Aadhaar number must be 12 digits.";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      return "Valid Email is required.";
    if (!formData.mobile || !/^[0-9]{10}$/.test(formData.mobile))
      return "Valid Mobile number is required.";
    if (!formData.address.trim()) return "Address is required.";
    if (!formData.casteCategory) return "Caste Category is required.";
    if (!formData.religion) return "Religion is required.";
    if (!formData.isMinority) return "Minority option is required.";
    if (!formData.tenthMarksheet) return "10th Marksheet required.";
    if (!formData.twelfthMarksheet) return "12th Marksheet required.";
    if (formData.documents.length === 0)
      return "At least one extra document is required.";
    return null;
  };

  // 🔹 Submit Form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = validateForm();
    if (error) {
      alert("⚠️ " + error);
      return;
    }

    try {
      setLoading(true);

      const payload = new FormData();
      payload.append("schemeId", String(scheme?.id || 0));
      payload.append("schemeName", scheme?.name || "Unknown Scheme");
      payload.append("applicantName", formData.name);
      payload.append("fatherName", formData.fatherName);
      payload.append("motherName", formData.motherName);
      payload.append("dob", formData.dob);
      payload.append("gender", formData.gender);
      payload.append("mobile", formData.mobile);
      payload.append("familyIncome", formData.familyIncome);
      payload.append("guardianOccupation", formData.guardianOccupation);
      payload.append("bankAccount", formData.bankAccount);
      payload.append("ifscCode", formData.ifscCode);
      payload.append("email", formData.email);
      payload.append("address", formData.address);
      payload.append("casteCategory", formData.casteCategory);
      payload.append("religion", formData.religion);
      payload.append("isMinority", formData.isMinority);
      payload.append("aadharNumber", formData.aadharNumber);

      if (formData.photo) payload.append("photo", formData.photo);
      if (formData.signature) payload.append("signature", formData.signature);
      if (formData.tenthMarksheet)
        payload.append("tenthMarksheet", formData.tenthMarksheet);
      if (formData.twelfthMarksheet)
        payload.append("twelfthMarksheet", formData.twelfthMarksheet);
      formData.documents.forEach((doc) => payload.append("documents", doc));

      const res = await fetch("http://localhost:5000/api/applications/apply", {
        method: "POST",
        body: payload,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      });

      if (!res.ok) throw new Error("Server Error");

      const data = await res.json();

      if (data.urn) {
        setUrn(data.urn);
        setSubmitted(true);
      } else {
        throw new Error("URN not received from server");
      }
    } catch (err: any) {
      console.error("❌ Error submitting application:", err);
      alert("Failed to submit application: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Scheme not found
  if (!scheme) {
    return (
      <div className="p-6">
        <Button variant="outline" onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <p className="text-red-600 text-center py-10">❌ Scheme not found.</p>
      </div>
    );
  }

  // 🔹 After Submission
  if (submitted) {
    return (
      <div className="p-4 md:p-6 max-w-2xl mx-auto">
        <Button variant="outline" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        <Card className="p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-green-800 mb-4">
            Application Submitted Successfully!
          </h2>
          <p className="text-gray-600 mb-6">
            Your application for <b>{scheme.name}</b> has been submitted.
          </p>

          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h3 className="font-semibold text-gray-700 mb-2">
              Your Unique Reference Number
            </h3>
            <p className="text-2xl font-bold text-blue-800">{urn}</p>
            <p className="text-sm text-gray-600 mt-2">
              Please save this number for tracking status.
            </p>
          </div>

          <div className="space-y-4">
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              <Download className="mr-2 h-4 w-4" />
              Download Application Receipt
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/user-dashboard")}
              className="w-full"
            >
              Go to Dashboard
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // 🔹 Application Form
  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      <Button variant="outline" onClick={() => navigate(-1)} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      <Card className="p-6 mb-6">
        <h1 className="text-2xl font-bold text-blue-800 mb-2">
          Apply for {scheme.name}
        </h1>
        <p className="text-gray-600">
          Please fill out the application form completely. All fields are
          required.
        </p>
      </Card>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name + Parents */}
          <div>
            <label className="block text-sm font-medium">Full Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Father’s Name</label>
            <input
              name="fatherName"
              value={formData.fatherName}
              onChange={handleInputChange}
              required
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Mother’s Name</label>
            <input
              name="motherName"
              value={formData.motherName}
              onChange={handleInputChange}
              required
              className="w-full border rounded-md px-3 py-2"
            />
          </div>

          {/* DOB + Gender */}
          <div>
            <label className="block text-sm font-medium">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              required
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              required
              className="w-full border rounded-md px-3 py-2"
            >
              <option value="">-- Select --</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Aadhaar + Mobile */}
          <div>
            <label className="block text-sm font-medium">Aadhaar Number</label>
            <input
              name="aadharNumber"
              value={formData.aadharNumber}
              onChange={handleInputChange}
              required
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Mobile Number</label>
            <input
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              required
              className="w-full border rounded-md px-3 py-2"
            />
          </div>

          {/* Email + Address */}
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
              className="w-full border rounded-md px-3 py-2"
            />
          </div>

          {/* Caste + Religion + Minority */}
          <div>
            <label className="block text-sm font-medium">Caste Category</label>
            <select
              name="casteCategory"
              value={formData.casteCategory}
              onChange={handleInputChange}
              required
              className="w-full border rounded-md px-3 py-2"
            >
              <option value="">-- Select --</option>
              <option value="General">General</option>
              <option value="OBC">OBC</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Religion</label>
            <input
              name="religion"
              value={formData.religion}
              onChange={handleInputChange}
              required
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Are you Minority?
            </label>
            <select
              name="isMinority"
              value={formData.isMinority}
              onChange={handleInputChange}
              required
              className="w-full border rounded-md px-3 py-2"
            >
              <option value="">-- Select --</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          {/* Bank + Income + Guardian */}
          <div>
            <label className="block text-sm font-medium">Family Income</label>
            <input
              name="familyIncome"
              value={formData.familyIncome}
              onChange={handleInputChange}
              required
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Guardian Occupation
            </label>
            <input
              name="guardianOccupation"
              value={formData.guardianOccupation}
              onChange={handleInputChange}
              required
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Bank Account Number
            </label>
            <input
              name="bankAccount"
              value={formData.bankAccount}
              onChange={handleInputChange}
              required
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">IFSC Code</label>
            <input
              name="ifscCode"
              value={formData.ifscCode}
              onChange={handleInputChange}
              required
              className="w-full border rounded-md px-3 py-2"
            />
          </div>

          {/* File Uploads */}
          <div>
            <label className="block text-sm font-medium">Photograph</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e, "photo")}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Signature</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e, "signature")}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">10th Marksheet</label>
            <input
              type="file"
              accept="image/*,application/pdf"
              onChange={(e) => handleFileUpload(e, "tenthMarksheet")}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">12th Marksheet</label>
            <input
              type="file"
              accept="image/*,application/pdf"
              onChange={(e) => handleFileUpload(e, "twelfthMarksheet")}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Other Supporting Documents
            </label>
            <input
              type="file"
              multiple
              onChange={handleDocumentsUpload}
              required
            />
          </div>

          {/* Terms + Submit */}
          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-start mb-6">
              <input
                type="checkbox"
                id="terms"
                required
                className="mt-1 mr-2"
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I hereby declare that all the information provided by me is true
                and correct. Any false information may lead to cancellation of
                my application.
              </label>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 py-3 text-lg"
            >
              {loading ? "Submitting..." : "Submit Application"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default SchemeApplication;
