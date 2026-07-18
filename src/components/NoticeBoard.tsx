import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bell, 
  Calendar, 
  FileText, 
  Users, 
  ExternalLink,
  AlertCircle,
  CheckCircle,
  Clock
} from "lucide-react";

const NoticeBoard = () => {
  const studentNotices = [
    {
      id: 1,
      title: "Application Portal Update - Biometric Authentication Required",
      date: "2024-12-20",
      type: "important",
      description: "All applicants must update their Aadhaar in NSP profiles before BioAuth. Any changes will nullify BioAuth and require re-authentication.",
      isNew: true
    },
    {
      id: 2,
      title: "National Scholarship Portal - Application Submission Guidelines",
      date: "2024-12-18",
      type: "deadline",
      description: "Students should keep their Aadhaar ready and link mobile number with Aadhaar for smooth application process.",
      isNew: true
    },
    {
      id: 3,
      title: "Merit List Publication for Academic Year 2024-25",
      date: "2024-12-15",
      type: "announcement",
      description: "First merit list has been published. Selected candidates must complete verification process within 7 days.",
      isNew: false
    },
    {
      id: 4,
      title: "Document Verification Schedule - Phase II",
      date: "2024-12-10",
      type: "info",
      description: "Physical verification of documents for shortlisted candidates. Check your registered email for detailed schedule.",
      isNew: false
    },
    {
      id: 5,
      title: "Scholarship Disbursement Status Update",
      date: "2024-12-05",
      type: "info",
      description: "Latest update on scholarship disbursement timeline and bank account verification requirements.",
      isNew: false
    }
  ];

  const instituteNotices = [
    {
      id: 1,
      title: "Institute Registration Process - Important Updates",
      date: "2024-12-19",
      type: "important",
      description: "New guidelines for institute registration and student enrollment procedures under PMSSS scheme.",
      isNew: true
    },
    {
      id: 2,
      title: "Academic Monitoring and Reporting Requirements",
      date: "2024-12-16",
      type: "deadline",
      description: "Monthly academic progress reports must be submitted by all participating institutions.",
      isNew: true
    },
    {
      id: 3,
      title: "Fee Structure Submission Guidelines",
      date: "2024-12-12",
      type: "announcement",
      description: "Updated fee structure templates and submission procedures for the upcoming academic session.",
      isNew: false
    }
  ];

  const nodalNotices = [
    {
      id: 1,
      title: "Regional Office Coordination Meeting",
      date: "2024-12-21",
      type: "important",
      description: "Monthly coordination meeting with all regional nodal officers scheduled for December 25, 2024.",
      isNew: true
    },
    {
      id: 2,
      title: "Policy Update - Scholarship Guidelines Amendment",
      date: "2024-12-17",
      type: "announcement",
      description: "Recent amendments to scholarship guidelines and implementation procedures across all regions.",
      isNew: true
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "important":
        return <AlertCircle className="h-4 w-4" />;
      case "deadline":
        return <Clock className="h-4 w-4" />;
      case "announcement":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeBadge = (type: string) => {
    const variants: { [key: string]: string } = {
      important: "bg-destructive text-destructive-foreground",
      deadline: "bg-secondary text-secondary-foreground",
      announcement: "bg-success text-success-foreground",
      info: "bg-primary text-primary-foreground"
    };
    return variants[type] || variants.info;
  };

  const NoticeCard = ({ notice }: { notice: any }) => (
    <Card className="p-6 hover:shadow-medium transition-spring group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${getTypeBadge(notice.type)}`}>
            {getTypeIcon(notice.type)}
          </div>
          <div>
            <Badge variant={notice.isNew ? "default" : "secondary"} className="mb-2">
              {notice.isNew ? "New" : "Active"}
            </Badge>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mr-1" />
              {new Date(notice.date).toLocaleDateString()}
            </div>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-smooth">
          <ExternalLink className="h-4 w-4" />
        </Button>
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-smooth">
        {notice.title}
      </h3>
      <p className="text-muted-foreground leading-relaxed">
        {notice.description}
      </p>
    </Card>
  );

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
            <Bell className="h-4 w-4 mr-2" />
            <span className="font-medium">Latest Updates</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Notice Board
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay updated with the latest announcements, deadlines, and important information 
            related to the scholarship program.
          </p>
        </div>

        {/* Notice Tabs */}
        <Tabs defaultValue="students" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto mb-12">
            <TabsTrigger value="students" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Students</span>
            </TabsTrigger>
            <TabsTrigger value="institutes" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Institutes</span>
            </TabsTrigger>
            <TabsTrigger value="nodal" className="flex items-center space-x-2">
              <Bell className="h-4 w-4" />
              <span>Nodal Officers</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="students" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {studentNotices.map((notice) => (
                <NoticeCard key={notice.id} notice={notice} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="institutes" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {instituteNotices.map((notice) => (
                <NoticeCard key={notice.id} notice={notice} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="nodal" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {nodalNotices.map((notice) => (
                <NoticeCard key={notice.id} notice={notice} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Archive Button */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="transition-spring hover:scale-105">
            View All Archived Notices
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NoticeBoard;