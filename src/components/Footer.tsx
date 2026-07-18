import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Send
} from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { name: "Home", href: "#" },
    { name: "About PMSSS", href: "#" },
    { name: "Schemes", href: "#" },
    { name: "Eligibility", href: "#" },
    { name: "Application Process", href: "#" },
    { name: "Important Dates", href: "#" },
    { name: "Contact Us", href: "#" },
    { name: "FAQ", href: "#" }
  ];

  const importantLinks = [
    { name: "National Scholarship Portal", href: "#" },
    { name: "Ministry of Education", href: "#" },
    { name: "AICTE", href: "#" },
    { name: "Digital India", href: "#" },
    { name: "MyGov", href: "#" },
    { name: "Scholarship Portal", href: "#" }
  ];

  const contactInfo = [
    {
      icon: MapPin,
      title: "Address",
      details: ["Room No. 623-A", "Wing Shastri", "Bhawan New Delhi"]
    },
    {
      icon: Phone,
      title: "Phone",
      details: ["+7896541236", "+91-11-23062120"]
    },
    {
      icon: Mail,
      title: "Email",
      details: ["mos2.mje@gov.in", "support@pmsss.gov.in"]
    }
  ];

  return (
    <footer className="bg-gradient-to-b from-foreground to-foreground/95 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="h-12 w-12 bg-gradient-secondary rounded-xl flex items-center justify-center">
                <span className="text-foreground font-bold text-xl">A</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">ASHAVRITI</h3>
                <p className="text-white/70 text-sm">PMSSS Portal</p>
              </div>
            </div>
            <p className="text-white/80 mb-6 leading-relaxed">
              Empowering dreams and transforming futures through quality education. 
              The Prime Minister's Special Scholarship Scheme opens doors to excellence.
            </p>
            <div className="flex space-x-4">
              <Button size="sm" variant="ghost" className="p-2 hover:bg-white/10">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button size="sm" variant="ghost" className="p-2 hover:bg-white/10">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button size="sm" variant="ghost" className="p-2 hover:bg-white/10">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button size="sm" variant="ghost" className="p-2 hover:bg-white/10">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-white/80 hover:text-secondary transition-smooth flex items-center group"
                  >
                    <span>{link.name}</span>
                    <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-smooth" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Important Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Important Links</h4>
            <ul className="space-y-3">
              {importantLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-white/80 hover:text-secondary transition-smooth flex items-center group"
                  >
                    <span>{link.name}</span>
                    <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-smooth" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Information</h4>
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="p-2 bg-secondary/20 rounded-lg">
                    <info.icon className="h-4 w-4 text-secondary" />
                  </div>
                  <div>
                    <h5 className="font-medium mb-1">{info.title}</h5>
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-white/80 text-sm">{detail}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-16 p-8 bg-white/5 rounded-2xl border border-white/10">
          <div className="text-center mb-6">
            <h4 className="text-2xl font-bold mb-2">Stay Updated</h4>
            <p className="text-white/80">Subscribe to get latest updates and notifications</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input 
              placeholder="Enter your email" 
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
            />
            <Button className="bg-secondary hover:bg-secondary-light text-secondary-foreground shrink-0">
              <Send className="h-4 w-4 mr-2" />
              Subscribe
            </Button>
          </div>
        </div>
      </div>

      <Separator className="bg-white/20" />

      {/* Bottom Footer */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-white/80 text-sm">
            © 2024 ASHAVRITI - Prime Minister's Special Scholarship Scheme. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-white/80 hover:text-secondary transition-smooth">
              Privacy Policy
            </a>
            <a href="#" className="text-white/80 hover:text-secondary transition-smooth">
              Terms of Service
            </a>
            <a href="#" className="text-white/80 hover:text-secondary transition-smooth">
              Accessibility
            </a>
            <a href="#" className="text-white/80 hover:text-secondary transition-smooth">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;