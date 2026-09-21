import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Scale, Award, Users, Clock, BookOpen, Shield } from "lucide-react";

const milestones = [
  {
    year: "2016",
    title: "Founded",
    description: "LegalXpress was established with a mission to make legal services accessible to everyone.",
  },
  {
    year: "2019",
    title: "1,000+ Clients Served",
    description: "Reached our first major milestone, helping over a thousand individuals and businesses.",
  },
  {
    year: "2022",
    title: "Digital Transformation",
    description: "Launched our online platform, bringing legal services to clients across all provinces.",
  },
  {
    year: "2024",
    title: "AI-Powered Services",
    description: "Integrated cutting-edge AI technology for faster case analysis and better outcomes.",
  },
];

const values = [
  {
    icon: Shield,
    title: "Integrity First",
    description: "We uphold the highest ethical standards in every case we handle.",
  },
  {
    icon: Users,
    title: "Client-Centered",
    description: "Your needs and goals are at the heart of everything we do.",
  },
  {
    icon: Clock,
    title: "Responsive Service",
    description: "Quick turnaround times without compromising on quality.",
  },
  {
    icon: BookOpen,
    title: "Continuous Learning",
    description: "Staying ahead with the latest legal developments and technology.",
  },
];

export function ProfileHistory() {
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-secondary text-secondary">
            About Us
          </Badge>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Story & Mission
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Since 2016, we've been dedicated to providing exceptional legal services 
            that empower individuals and businesses to navigate complex legal challenges with confidence.
          </p>
        </div>

        {/* Bio Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Scale className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display text-2xl font-semibold text-foreground">
                Who We Are
              </h3>
            </div>
            <p className="font-body text-muted-foreground leading-relaxed text-lg">
              LegalXpress is a forward-thinking legal services firm committed to breaking down 
              barriers in the legal industry. We believe everyone deserves access to quality 
              legal representation, regardless of their background or budget.
            </p>
            <p className="font-body text-muted-foreground leading-relaxed text-lg">
              Our team combines decades of legal expertise with modern technology to deliver 
              efficient, transparent, and affordable legal solutions. From simple notarizations 
              to complex litigation, we're here to guide you every step of the way.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-2 bg-secondary/10 px-4 py-2 rounded-full">
                <Award className="h-5 w-5 text-secondary" />
                <span className="font-body text-sm font-medium text-foreground">Serving Clients Since 2016</span>
              </div>
              <div className="flex items-center gap-2 bg-secondary/10 px-4 py-2 rounded-full">
                <Users className="h-5 w-5 text-secondary" />
                <span className="font-body text-sm font-medium text-foreground">5,000+ Happy Clients</span>
              </div>
            </div>
          </div>

          {/* Values Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {values.map((value, index) => (
              <Card key={index} className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-secondary/50 transition-all duration-300">
                <CardContent className="p-5">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <value.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h4 className="font-display font-semibold text-foreground mb-2">{value.title}</h4>
                  <p className="font-body text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Timeline Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="font-display text-2xl font-semibold text-foreground mb-2">
              Our Journey
            </h3>
            <p className="font-body text-muted-foreground">
              Key milestones that shaped who we are today
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary/50 transform md:-translate-x-1/2" />

            {/* Timeline Items */}
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`relative flex items-center gap-6 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 h-4 w-4 rounded-full bg-secondary border-4 border-background transform -translate-x-1/2 z-10" />

                  {/* Content Card */}
                  <div className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}>
                    <Card className="bg-card/70 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-5">
                        <Badge className="mb-2 bg-primary/10 text-primary border-0 font-display">
                          {milestone.year}
                        </Badge>
                        <h4 className="font-display font-semibold text-foreground mb-2">
                          {milestone.title}
                        </h4>
                        <p className="font-body text-sm text-muted-foreground">
                          {milestone.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
