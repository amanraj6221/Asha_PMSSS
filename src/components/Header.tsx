import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-blue-100 bg-gradient-to-br from-blue-50/95 via-indigo-50/95 to-purple-50/95 backdrop-blur-sm">
      {/* Modern Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(120,119,198,0.15)_1px,transparent_0)] bg-[length:40px_40px]"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-5 left-5 w-20 h-20 bg-blue-100/40 rounded-3xl animate-float opacity-30"></div>
      <div
        className="absolute top-10 right-10 w-16 h-16 bg-purple-100/40 rounded-2xl animate-float opacity-40"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800">ASHAVRITI</h1>
                <p className="text-sm text-slate-600">PMSSS Portal</p>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link
              to="/"
              className="text-slate-700 hover:text-blue-600 transition-smooth font-medium"
            >
              Home
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-1 text-slate-700 hover:text-blue-600 transition-smooth font-medium">
                <span>Features</span>
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white/95 backdrop-blur-sm border border-blue-100">
                <DropdownMenuItem className="cursor-pointer hover:bg-blue-50">PMSSS Overview</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer hover:bg-blue-50">Eligibility Criteria</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer hover:bg-blue-50">Application Process</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer hover:bg-blue-50">Important Dates</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              to="/solutions"
              className="text-slate-700 hover:text-blue-600 transition-smooth font-medium"
            >
              Solutions
            </Link>
            <Link
              to="/resources"
              className="text-slate-700 hover:text-blue-600 transition-smooth font-medium"
            >
              Resources
            </Link>
            <Link
              to="/contact"
              className="text-slate-700 hover:text-blue-600 transition-smooth font-medium"
            >
              Contact Us
            </Link>

            {/* Extra Links */}
            <Link
              to="/schemes"
              className="text-slate-700 hover:text-blue-600 transition-smooth font-medium"
            >
              Schemes
            </Link>

            {/* SAG Bureau Links */}
            <Link
              to="/sag/register"
              className="px-4 py-2 rounded-full border border-blue-200 text-blue-700 hover:bg-blue-50 transition-spring"
            >
              SAG Register
            </Link>

            <Link
              to="/register/finance"
              className="px-4 py-2 rounded-full border border-blue-200 text-blue-700 hover:bg-blue-50 transition-spring"
            >
              Finance Bureau
            </Link>

            {/* Only User Registration Button */}
            <Link
              to="/register"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md transition-spring hover:scale-105 font-semibold"
            >
              User Registration
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-slate-700 hover:text-blue-600 transition-smooth"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden pb-4 border-t border-blue-100 mt-4 bg-white/95 backdrop-blur-sm rounded-lg">
            <nav className="flex flex-col space-y-4 pt-4">
              <Link 
                to="/" 
                className="text-slate-700 hover:text-blue-600 font-medium px-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/schemes"
                className="text-slate-700 hover:text-blue-600 font-medium px-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Schemes
              </Link>

              {/* SAG Bureau Links (Mobile) */}
              <Link
                to="/sag/register"
                className="text-slate-700 hover:text-blue-600 font-medium px-4"
                onClick={() => setIsMenuOpen(false)}
              >
                SAG Register
              </Link>

              <Link
                to="/register/finance"
                className="text-slate-700 hover:text-blue-600 font-medium px-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Finance Bureau
              </Link>
              <div className="pt-4 px-4">
                <Link
                  to="/register"
                  className="block px-4 py-3 text-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md hover:scale-105 font-semibold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  User Registration
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;