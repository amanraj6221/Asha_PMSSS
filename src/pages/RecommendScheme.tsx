// 📂 src/pages/RecommendScheme.tsx
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const schemes = [
  {
    id: 0,
    name: "Prime Minister's Special Scholarship Scheme (PMSSS)",
    type: "AICTE",
    grade: "Undergraduate Students",
    lastDate: "2025-04-30",
    published: "2023-04-01 00:00:00",
    description: "Scholarship for students from Jammu & Kashmir and Ladakh to pursue higher education outside their home territories.",
    benefits: {
      "General Degree": "₹30,000 tuition + ₹1 lakh allowance",
      "Professional Courses": "₹1.25 lakh tuition + ₹1 lakh allowance",
      "Medical Courses": "₹3 lakh tuition + ₹1 lakh allowance"
    },
    colorScheme: "yellow"
  },
  {
    id: 1,
    name: "PG INDIRA GANDHI SCHOLARSHIP FOR SINGLE GIRL CHILD",
    type: "AICTE",
    grade: "Postgraduate",
    lastDate: "2025-12-23",
    published: "2023-07-07 10:51:24",
    description: "This scholarship supports postgraduate education for single girl children to promote higher education among women.",
    benefits: {
      "Tuition Fee": "Up to ₹30,000 per annum",
      "Maintenance": "₹2,000 per month",
      "Other Benefits": "Book allowance and travel expenses"
    },
    colorScheme: "purple"
  },
  {
    id: 2,
    name: "Graduate INDIRA GANDHI SCHOLARSHIP FOR SINGLE GIRL CHILD",
    type: "State",
    grade: "Graduate",
    lastDate: "2025-12-02",
    published: "2023-07-07 10:51:24",
    description: "Scholarship for single girl child pursuing graduation in recognized institutions.",
    benefits: {
      "Financial Support": "Up to ₹36,000 per annum",
      "Duration": "For the entire course period",
      "Eligibility": "Only for single girl children"
    },
    colorScheme: "pink"
  },
  {
    id: 3,
    name: "Chatra Kalyan Yojana",
    type: "Central",
    grade: "Undergraduate Students",
    lastDate: "2025-04-12",
    published: "2023-12-19 20:13:40",
    description: "Financial aid scheme for underprivileged undergraduate students.",
    benefits: {
      "Tuition Fee": "Full tuition coverage",
      "Maintenance": "₹5,000 per semester",
      "Additional Support": "Book grant and hostel fee waiver"
    },
    colorScheme: "blue"
  },
  {
    id: 4,
    name: "Medhavi Scholarship - Digital India Programme",
    type: "Central",
    grade: "High School Students",
    lastDate: "2024-08-12",
    published: "2023-12-19 23:08:44",
    description: "Merit-based scholarship for high school students under Digital India Programme.",
    benefits: {
      "Scholarship Amount": "₹10,000 one-time award",
      "Eligibility": "Class 12 passed with 80%+ marks",
      "Special Focus": "Students pursuing digital literacy courses"
    },
    colorScheme: "green"
  },
  {
    id: 5,
    name: "Rajasthan Unati Scholarship",
    type: "State",
    grade: "Undergraduate Students",
    lastDate: "2025-03-09",
    published: "2023-12-19 23:16:34",
    description: "Scholarship for Rajasthan state students pursuing undergraduate courses.",
    benefits: {
      "Financial Aid": "Up to ₹25,000 per year",
      "Eligibility": "Rajasthan domicile with family income < ₹2.5L",
      "Renewal": "Based on academic performance"
    },
    colorScheme: "orange"
  },
  {
    id: 6,
    name: "Indra Gandhi Pragati Yojana for Women",
    type: "AICTE",
    grade: "Undergraduate Students",
    lastDate: "2025-04-05",
    published: "2023-12-19 23:32:58",
    description: "Special scheme to promote higher education among women by providing financial aid.",
    benefits: {
      "Tuition Fee": "Up to ₹30,000 per annum",
      "Additional Benefits": "₹2,000 per month for incidentals",
      "Eligibility": "Female students with 50%+ marks"
    },
    colorScheme: "red"
  },
];

function RecommendScheme() {
  const navigate = useNavigate();

  // Function to determine color scheme
  const getColorScheme = (color: string) => {
    switch (color) {
      case "yellow":
        return {
          bg: "bg-yellow-50",
          border: "border-yellow-400",
          text: "text-yellow-700",
          light: "bg-yellow-100",
          dark: "bg-yellow-500",
          button: "bg-yellow-500 hover:bg-yellow-600"
        };
      case "purple":
        return {
          bg: "bg-purple-50",
          border: "border-purple-400",
          text: "text-purple-700",
          light: "bg-purple-100",
          dark: "bg-purple-500",
          button: "bg-purple-500 hover:bg-purple-600"
        };
      case "pink":
        return {
          bg: "bg-pink-50",
          border: "border-pink-400",
          text: "text-pink-700",
          light: "bg-pink-100",
          dark: "bg-pink-500",
          button: "bg-pink-500 hover:bg-pink-600"
        };
      case "blue":
        return {
          bg: "bg-blue-50",
          border: "border-blue-400",
          text: "text-blue-700",
          light: "bg-blue-100",
          dark: "bg-blue-500",
          button: "bg-blue-500 hover:bg-blue-600"
        };
      case "green":
        return {
          bg: "bg-green-50",
          border: "border-green-400",
          text: "text-green-700",
          light: "bg-green-100",
          dark: "bg-green-500",
          button: "bg-green-500 hover:bg-green-600"
        };
      case "orange":
        return {
          bg: "bg-orange-50",
          border: "border-orange-400",
          text: "text-orange-700",
          light: "bg-orange-100",
          dark: "bg-orange-500",
          button: "bg-orange-500 hover:bg-orange-600"
        };
      case "red":
        return {
          bg: "bg-red-50",
          border: "border-red-400",
          text: "text-red-700",
          light: "bg-red-100",
          dark: "bg-red-500",
          button: "bg-red-500 hover:bg-red-600"
        };
      default:
        return {
          bg: "bg-gray-50",
          border: "border-gray-400",
          text: "text-gray-700",
          light: "bg-gray-100",
          dark: "bg-gray-500",
          button: "bg-gray-500 hover:bg-gray-600"
        };
    }
  };

  // Function to determine badge color based on scholarship type
  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case "AICTE":
        return "bg-purple-100 text-purple-800";
      case "State":
        return "bg-blue-100 text-blue-800";
      case "Central":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Function to determine urgency of deadline
  const getDateUrgency = (lastDate: string) => {
    const today = new Date();
    const deadline = new Date(lastDate);
    const diffTime = Math.abs(deadline.getTime() - today.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 30) return "text-red-600 font-bold";
    if (diffDays < 60) return "text-orange-600 font-semibold";
    return "text-gray-700";
  };

  return (
    <section className="p-4 md:p-6">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Available Scholarship Schemes</h2>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {schemes.map((s) => {
          const colors = getColorScheme(s.colorScheme);
          return (
            <Card
              key={s.id}
              className={`p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 overflow-hidden relative ${colors.bg} ${colors.border}`}
            >
              {/* Type Badge */}
              <div className={`absolute top-4 right-4 text-xs px-2 py-1 rounded-full ${getTypeBadgeColor(s.type)}`}>
                {s.type}
              </div>
              
              {/* Scholarship Icon */}
              <div className="flex justify-center mb-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${colors.light}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${colors.text}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>

              <div className="mb-4">
                {/* Title */}
                <h3 className={`text-xl font-bold line-clamp-2 h-14 ${colors.text}`}>
                  {s.name}
                </h3>
                
                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 h-16">
                  {s.description}
                </p>
                
                {/* Benefits section for all scholarships */}
                <div className="mb-3 p-3 rounded-lg border">
                  <p className="text-xs font-semibold text-gray-800 mb-1">Benefits include:</p>
                  <ul className="text-xs text-gray-700 space-y-1">
                    {Object.entries(s.benefits).map(([key, value]) => (
                      <li key={key}>• {key}: {value}</li>
                    ))}
                  </ul>
                </div>
                
                {/* Details */}
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="text-gray-500">Grade: </span>
                    <span className="font-medium ml-1">{s.grade}</span>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-500">Last Date: </span>
                    <span className={`font-medium ml-1 ${getDateUrgency(s.lastDate)}`}>
                      {s.lastDate}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <Button
                className={`mt-4 w-full py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg text-white ${colors.button}`}
                onClick={() => navigate(`/scheme/${s.id}`)}
              >
                View Details
              </Button>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

export default RecommendScheme;