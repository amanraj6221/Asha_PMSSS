import { Button } from "@/components/ui/button";
import { ArrowRight, Award, BookOpen, Users, GraduationCap } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden">
      {/* Modern Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(120,119,198,0.15)_1px,transparent_0)] bg-[length:40px_40px]"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100/40 rounded-3xl animate-float opacity-40"></div>
      <div
        className="absolute top-40 right-20 w-24 h-24 bg-purple-100/40 rounded-2xl animate-float opacity-50"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute bottom-40 left-20 w-16 h-16 bg-indigo-100/50 rounded-xl animate-float"
        style={{ animationDelay: "4s" }}
      ></div>
      <div
        className="absolute top-60 left-1/4 w-12 h-12 bg-blue-200/30 rounded-full animate-float"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute bottom-60 right-1/4 w-8 h-8 bg-purple-200/40 rounded-full animate-float"
        style={{ animationDelay: "3s" }}
      ></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
          {/* Left Content */}
          <div className="animate-fade-in">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-blue-100/80 backdrop-blur-sm border border-blue-200/50 mb-8 animate-bounce-in">
              <Award className="h-5 w-5 text-blue-600 mr-2" />
              <span className="text-blue-800 font-medium">
                Applications Open for Academic Year 2024-25
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-800 mb-6 leading-tight">
              Smarter Education
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                in Your Future
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-700 mb-8 max-w-xl leading-relaxed">
              Education isn't just knowledge, it's the power to build a future,
              support a mission, and create real change in the world.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-10 py-4 text-lg transition-all duration-300 hover:scale-105 shadow-md group rounded-full"
              >
                Apply Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-blue-200 text-blue-700 hover:bg-blue-50 px-10 py-4 text-lg transition-all duration-300 hover:scale-105 rounded-full"
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Contact Us
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 max-w-md">
              <input
                type="email"
                placeholder="Your Email here"
                className="flex-1 px-6 py-4 rounded-full bg-white/80 border border-blue-200 text-slate-800 placeholder:text-slate-500 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <Button className="px-8 py-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 hover:scale-105">
                Get Started Free
              </Button>
            </div>

            <div className="flex gap-12 mt-16">
              <div>
                <div className="text-4xl font-bold text-slate-800 mb-1">50.3K</div>
                <div className="text-slate-600 text-sm">
                  Students Benefited Today
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold text-slate-800 mb-1">1000+</div>
                <div className="text-slate-600 text-sm">
                  Education Made Human
                </div>
              </div>
            </div>

            {/* Partner Logos */}
            <div className="w-full text-center mt-12 animate-fade-in">
              <p className="text-slate-600 mb-6">
                Trusted by leading educational institutions
              </p>
              <div className="flex flex-wrap justify-center items-center gap-10">
                <div className="w-40 h-24 flex items-center justify-center bg-white/80 backdrop-blur-sm border border-blue-100 rounded-xl shadow-sm p-4">
                  <img src="/logos/aicte.jpeg" alt="AICTE" className="max-h-16 object-contain" />
                </div>
                <div className="w-40 h-24 flex items-center justify-center bg-white/80 backdrop-blur-sm border border-blue-100 rounded-xl shadow-sm p-4">
                  <img src="/logos/ugc.jpeg" alt="UGC" className="max-h-16 object-contain" />
                </div>
                <div className="w-40 h-24 flex items-center justify-center bg-white/80 backdrop-blur-sm border border-blue-100 rounded-xl shadow-sm p-4">
                  <img src="/logos/moe.jpeg" alt="Ministry of Education" className="max-h-16 object-contain" />
                </div>
                <div className="w-40 h-24 flex items-center justify-center bg-white/80 backdrop-blur-sm border border-blue-100 rounded-xl shadow-sm p-4">
                  <img src="/logos/digital-india.png" alt="Digital India" className="max-h-16 object-contain" />
                </div>
                <div className="w-40 h-24 flex items-center justify-center bg-white/80 backdrop-blur-sm border border-blue-100 rounded-xl shadow-sm p-4">
                  <img src="/logos/nsp.png" alt="NSP" className="max-h-16 object-contain" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative animate-scale-in">
            <div className="relative">
              <div className="w-full max-w-md mx-auto bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-blue-100">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl p-6 mb-6">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
                    <GraduationCap className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-white font-bold text-xl mb-2">
                    Scholarship Portal
                  </h3>
                  <p className="text-white/80 text-sm">
                    Access quality education nationwide
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-blue-50/60 rounded-xl">
                    <span className="text-slate-800 font-medium">
                      Application Status
                    </span>
                    <span className="text-green-600 font-bold">Active</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-blue-50/60 rounded-xl">
                    <span className="text-slate-800 font-medium">Merit Position</span>
                    <span className="text-blue-600 font-bold">#1,247</span>
                  </div>
                </div>
              </div>

              <div
                className="absolute -top-6 -right-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-md animate-float"
                style={{ animationDelay: "1s" }}
              >
                <div className="text-2xl font-bold text-slate-800">₹5000Cr+</div>
                <div className="text-slate-600 text-xs">Awarded</div>
              </div>

              <div
                className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-md animate-float"
                style={{ animationDelay: "2s" }}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Users className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <div className="text-slate-800 font-bold text-sm">
                      500+ Colleges
                    </div>
                    <div className="text-slate-600 text-xs">Nationwide</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;