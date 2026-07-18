// 📂 src/pages/SchemeDetails.tsx
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Calendar,
  DollarSign,
  FileText,
  UserCheck,
  BookOpen,
  Download,
  Info,
  Phone,
  Globe,
  Mail,
} from "lucide-react";

// 🔹 All Schemes Details
const schemeDetails: any = {
  0: {
    name: "Prime Minister's Special Scholarship Scheme (PMSSS)",
    type: "AICTE",
    grade: "Undergraduate Students",
    year: "2024-25",
    category: "Students from Jammu & Kashmir and Ladakh",
    criteria:
      "Domicile J&K/Ladakh, 12th passed, merit-based; 5000 seats; UG in general/professional/medical streams",
    lastDate: "2025-04-30",
    documents: [
      "Domicile certificate",
      "12th mark sheet",
      "Income certificate (family income < ₹8L)",
      "Aadhar card",
      "Bank account details",
    ],
    description:
      "Scholarship for students from J&K and Ladakh to pursue higher education outside their home territories.",
    amount:
      "Varies by course: General (₹30K tuition + ₹1L allowance), Professional (₹1.25L tuition + ₹1L allowance), Medical (₹3L tuition + ₹1L allowance)",
    benefits: "Full tuition coverage + maintenance allowance",
    eligibility:
      "Domicile of J&K/Ladakh, family income < ₹8L, passed Class 12 from JKBOSE or CBSE schools in the region",
    duration: "Entire course duration, renewable yearly based on academic performance",
    application:
      "Online through AICTE PMSSS portal, merit-based selection, centralized counseling",
    source: "AICTE",
    officialWebsite: "https://www.aicte-pmsss.org",
    contact: "pmsss-help@aicte.in",
    phone: "011-29581316",
  },
  // 🔹 add other schemes here (same as your current dataset)...
};

function SchemeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("overview");

  const scheme = schemeDetails[id as keyof typeof schemeDetails];

  if (!scheme) {
    return (
      <div className="p-6">
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <p className="text-red-600 text-center py-10">
          ❌ Scheme details not found.
        </p>
      </div>
    );
  }

  // ✅ Smooth scroll with active state
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen p-4 md:p-6 gap-6 max-w-7xl mx-auto">
      {/* Sidebar Navigation */}
      <div className="w-full md:w-64 flex-shrink-0 mb-6 md:mb-0">
        <Card className="p-4 sticky top-6">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="mb-4 w-full"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Scholarships
          </Button>

          <h3 className="font-semibold mb-3 text-gray-700">
            Quick Navigation
          </h3>
          <nav className="space-y-1">
            {[
              { id: "overview", label: "Overview", icon: <BookOpen className="h-4 w-4" /> },
              { id: "eligibility", label: "Eligibility", icon: <UserCheck className="h-4 w-4" /> },
              { id: "benefits", label: "Benefits", icon: <DollarSign className="h-4 w-4" /> },
              { id: "documents", label: "Documents", icon: <FileText className="h-4 w-4" /> },
              { id: "application", label: "How to Apply", icon: <Calendar className="h-4 w-4" /> },
              { id: "contact", label: "Contact Info", icon: <Info className="h-4 w-4" /> },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-full text-left flex items-center px-3 py-2 rounded-md text-sm transition ${
                  activeSection === item.id
                    ? "bg-blue-100 text-blue-700 font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <h3 className="font-semibold mb-2 text-gray-700">Key Dates</h3>
            <div className="flex items-center text-sm text-red-600 font-medium">
              <Calendar className="h-4 w-4 mr-2" />
              Deadline: {scheme.lastDate}
            </div>
          </div>

          <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">
            <Download className="h-4 w-4 mr-2" />
            Download Brochure
          </Button>
        </Card>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <Card className="p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-blue-800 mb-2">
                {scheme.name}
              </h1>
              <p className="text-gray-600 mb-4">{scheme.description}</p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {scheme.type}
                </span>
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {scheme.grade}
                </span>
                <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {scheme.source}
                </span>
              </div>
            </div>

            {/* ✅ Apply Button fixed */}
            <Button
              className="bg-green-600 hover:bg-green-700 text-white px-6"
              onClick={() => navigate(`/apply/${id}`)}
            >
              Apply Now
            </Button>
          </div>
        </Card>

        {/* ✅ Sections (same UI as your code, just cleaned) */}
        {/* Overview */}
        <section id="overview" className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
            <BookOpen className="h-5 w-5 mr-2 text-blue-600" /> Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card className="p-4 bg-blue-50">
              <h3 className="font-semibold text-blue-800 mb-2">Academic Year</h3>
              <p>{scheme.year}</p>
            </Card>
            <Card className="p-4 bg-green-50">
              <h3 className="font-semibold text-green-800 mb-2">Category</h3>
              <p>{scheme.category}</p>
            </Card>
            <Card className="p-4 bg-amber-50">
              <h3 className="font-semibold text-amber-800 mb-2">Duration</h3>
              <p>{scheme.duration}</p>
            </Card>
            <Card className="p-4 bg-purple-50">
              <h3 className="font-semibold text-purple-800 mb-2">Scholarship Amount</h3>
              <p className="text-green-700 font-medium">{scheme.amount}</p>
            </Card>
          </div>
        </section>

        {/* Eligibility */}
        <section id="eligibility" className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
            <UserCheck className="h-5 w-5 mr-2 text-blue-600" /> Eligibility Criteria
          </h2>
          <Card className="p-6">
            <div className="mb-4">
              <h3 className="font-semibold text-gray-700 mb-2">Basic Criteria</h3>
              <p className="text-gray-600">{scheme.criteria}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Detailed Eligibility</h3>
              <p className="text-gray-600">{scheme.eligibility}</p>
            </div>
          </Card>
        </section>

        {/* Benefits */}
        <section id="benefits" className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
            <DollarSign className="h-5 w-5 mr-2 text-blue-600" /> Benefits
          </h2>
          <Card className="p-6 bg-amber-50 border-amber-200">
            <h3 className="font-semibold text-amber-800 mb-3">What You'll Receive</h3>
            <p className="mb-4">{scheme.benefits}</p>
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-medium mb-2 text-gray-700">Financial Breakdown</h4>
              <p className="text-green-700 font-medium">{scheme.amount}</p>
            </div>
          </Card>
        </section>

        {/* Documents */}
        <section id="documents" className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
            <FileText className="h-5 w-5 mr-2 text-blue-600" /> Required Documents
          </h2>
          <Card className="p-6">
            <ul className="list-disc list-inside space-y-2 pl-2">
              {scheme.documents.map((doc: string, idx: number) => (
                <li key={idx} className="text-gray-700">
                  {doc}
                </li>
              ))}
            </ul>
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                <strong>Note:</strong> All documents should be scanned clearly and
                uploaded in the specified format (usually PDF or JPG).
              </p>
            </div>
          </Card>
        </section>

        {/* Application */}
        <section id="application" className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-blue-600" /> How to Apply
          </h2>
          <Card className="p-6">
            <div className="mb-4">
              <h3 className="font-semibold text-gray-700 mb-2">Application Process</h3>
              <p className="text-gray-600">{scheme.application}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2 text-blue-800">Important Notes:</h4>
              <ul className="list-disc list-inside space-y-1 pl-2 text-sm text-blue-700">
                <li>Apply before the deadline - {scheme.lastDate}</li>
                <li>Ensure all documents are ready before starting application</li>
                <li>Keep scanned copies of all documents (PDF format recommended)</li>
                <li>Double-check all information before submission</li>
                <li>Save your application number for future reference</li>
              </ul>
            </div>
          </Card>
        </section>

        {/* Contact */}
        <section id="contact" className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
            <Info className="h-5 w-5 mr-2 text-blue-600" /> Contact Information
          </h2>
          <Card className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-gray-700 mb-2 flex items-center">
                  <Globe className="h-4 w-4 mr-2 text-blue-600" /> Official Website
                </h3>
                <a
                  href={scheme.officialWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {scheme.officialWebsite}
                </a>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 mb-2 flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-blue-600" /> Email
                </h3>
                <a
                  href={`mailto:${scheme.contact}`}
                  className="text-blue-600 hover:underline"
                >
                  {scheme.contact}
                </a>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 mb-2 flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-blue-600" /> Helpline
                </h3>
                <p className="text-gray-600">{scheme.phone}</p>
              </div>
            </div>
          </Card>
        </section>

        {/* CTA */}
        <div className="text-center mt-8 p-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white">
          <h3 className="text-xl font-bold mb-2">Ready to Apply?</h3>
          <p className="mb-4">Don't miss this opportunity. Apply now before the deadline!</p>

          <Button
            className="bg-white text-blue-700 hover:bg-gray-100 px-8 py-3 text-lg"
            onClick={() => navigate(`/apply/${id}`)}
          >
            Apply for Scholarship
          </Button>

          <p className="text-sm mt-4 text-blue-100">Deadline: {scheme.lastDate}</p>
        </div>
      </div>
    </div>
  );
}

export default SchemeDetails;
