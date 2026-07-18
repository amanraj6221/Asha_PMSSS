import { Card } from "@/components/ui/card";
import { TrendingUp, Users, GraduationCap, Award, Target, BookOpen } from "lucide-react";

const StatsSection = () => {
  const stats = [
    {
      icon: Users,
      number: "50,312",
      label: "Students Enrolled",
      sublabel: "This Academic Year",
      gradient: "bg-gradient-primary",
      trend: "+12%"
    },
    {
      icon: GraduationCap,
      number: "1,247",
      label: "Partner Institutions",
      sublabel: "Across India",
      gradient: "bg-gradient-secondary",
      trend: "+8%"
    },
    {
      icon: Award,
      number: "₹5,240Cr",
      label: "Scholarships Awarded",
      sublabel: "Total Amount",
      gradient: "bg-gradient-success",
      trend: "+15%"
    },
    {
      icon: Target,
      number: "98.7%",
      label: "Success Rate",
      sublabel: "Completion Rate",
      gradient: "bg-gradient-modern",
      trend: "+2.3%"
    }
  ];

  const achievements = [
    {
      icon: BookOpen,
      title: "Quality Education Access",
      description: "Opening doors to premier institutions nationwide"
    },
    {
      icon: Users,
      title: "Comprehensive Support",
      description: "End-to-end guidance from application to graduation"
    },
    {
      icon: Award,
      title: "Merit-Based Selection",
      description: "Transparent and fair evaluation process"
    }
  ];

  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <Card key={index} className="p-8 hover:shadow-large transition-spring hover:-translate-y-2 group card-3d">
              <div className="flex items-center justify-between mb-6">
                <div className={`w-14 h-14 ${stat.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-spring`}>
                  <stat.icon className="h-7 w-7 text-white" />
                </div>
                <div className="flex items-center space-x-1 text-success text-sm font-medium">
                  <TrendingUp className="h-4 w-4" />
                  <span>{stat.trend}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-3xl font-bold text-foreground">{stat.number}</div>
                <div className="text-lg font-semibold text-foreground">{stat.label}</div>
                <div className="text-muted-foreground text-sm">{stat.sublabel}</div>
              </div>
            </Card>
          ))}
        </div>

        {/* Achievement Cards */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Why Students Choose PMSSS</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover the advantages that make our scholarship program the preferred choice for ambitious students
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {achievements.map((achievement, index) => (
            <Card key={index} className="p-8 text-center hover:shadow-medium transition-spring hover:-translate-y-1 group">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-spring">
                <achievement.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">{achievement.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{achievement.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;