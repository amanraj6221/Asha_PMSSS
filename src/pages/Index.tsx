import Header from "@/components/Header";
import Hero from "@/components/Hero";
import StatsSection from "@/components/StatsSection";
import FeatureStats from "@/components/FeatureStats";
import NoticeBoard from "@/components/NoticeBoard";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />

        {/* 🔑 Login/Register Buttons */}
        <div className="flex justify-center gap-4 my-8">
          <Link
            to="/register/user"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
          >
            User Register
          </Link>

          <Link
            to="/login"
            className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
          >
            User Login
          </Link>
        </div>

        <StatsSection />
        <FeatureStats />
        <NoticeBoard />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
