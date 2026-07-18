import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  GraduationCap, 
  BookOpen, 
  Users, 
  Trophy, 
  ArrowRight,
  CheckCircle,
  Clock,
  Star
} from "lucide-react";

const FeatureStats = () => {
  const features = [
    {
      icon: GraduationCap,
      title: "Quality Education",
      description: "Access to top-tier institutions across India",
      stats: "500+ Colleges",
      color: "bg-gradient-primary"
    },
    {
      icon: Trophy,
      title: "Merit-Based Selection",
      description: "Transparent and fair selection process",
      stats: "100% Merit",
      color: "bg-gradient-secondary"
    },
    {
      icon: Users,
      title: "Comprehensive Support",
      description: "End-to-end guidance and mentorship",
      stats: "24/7 Support",
      color: "bg-success"
    },
    {
      icon: BookOpen,
      title: "Diverse Courses",
      description: "Wide range of undergraduate programs",
      stats: "200+ Courses",
      color: "bg-primary-light"
    }
  ];

  const benefits = [
    "Full tuition fee coverage",
    "Maintenance allowance",
    "Book and equipment grants",
    "Digital learning resources",
    "Career guidance programs",
    "Alumni network access"
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
            <Star className="h-4 w-4 mr-2" />
            <span className="font-medium">Why Choose PMSSS</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Transforming Lives Through 
            <span className="text-primary"> Education</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The Prime Minister's Special Scholarship Scheme opens doors to quality higher education 
            for students from Jammu & Kashmir, fostering growth and opportunity.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <Card key={index} className="p-8 hover:shadow-large transition-spring hover:-translate-y-2 group">
              <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-spring`}>
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground mb-4">{feature.description}</p>
              <div className="text-2xl font-bold text-primary">{feature.stats}</div>
            </Card>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h3 className="text-3xl font-bold text-foreground mb-6">
              Comprehensive Benefits Package
            </h3>
            <p className="text-lg text-muted-foreground mb-8">
              Our scholarship program provides complete financial support to ensure 
              students can focus entirely on their academic excellence.
            </p>
            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-success flex-shrink-0" />
                  <span className="text-foreground font-medium">{benefit}</span>
                </div>
              ))}
            </div>
            <Button className="bg-gradient-primary text-primary-foreground shadow-glow transition-spring hover:scale-105 group">
              Learn More About Benefits
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-smooth" />
            </Button>
          </div>

          <div className="relative">
            <Card className="p-8 bg-gradient-card border-0 shadow-large">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 animate-glow">
                  <Clock className="h-10 w-10 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-foreground mb-4">
                  Application Deadline
                </h4>
                <div className="text-4xl font-bold text-primary mb-2">
                  March 31, 2025
                </div>
                <p className="text-muted-foreground mb-6">
                  Don't miss your chance to secure a scholarship for quality education
                </p>
                <Button size="lg" className="w-full bg-secondary hover:bg-secondary-light text-secondary-foreground font-semibold">
                  Apply Before Deadline
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureStats;