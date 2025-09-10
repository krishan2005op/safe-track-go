import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { AlertTriangle, MapPin, Mountain, Shield, Brain, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [activeAlert] = useState("2 active incidents reported");

  const modules = [
    {
      title: "Heritage & Religious Sites",
      description: "Crowd monitoring, ticket booking, and safety management for cultural sites",
      icon: MapPin,
      path: "/heritage",
      status: "Active",
      users: "1,247"
    },
    {
      title: "State Exploration",
      description: "GPS tracking, safe routes, and real-time safety scores across regions",
      icon: Shield,
      path: "/exploration", 
      status: "Monitoring",
      users: "892"
    },
    {
      title: "Adventure & Trekking",
      description: "Geo-fencing, wearable integration, and emergency response for outdoor activities",
      icon: Mountain,
      path: "/adventure",
      status: "Live Tracking",
      users: "456"
    },
    {
      title: "Alerts & Incident Response",
      description: "Real-time emergency alerts, situation monitoring, and response coordination",
      icon: AlertTriangle,
      path: "/alerts",
      status: "Active Alerts",
      users: "24/7"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-hero py-20 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Smart Tourist Safety
              <br />
              <span className="text-blue-200">Monitoring System</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-blue-100">
              Advanced monitoring and incident response platform ensuring tourist safety across heritage sites, exploration routes, and adventure activities
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                variant="secondary"
                className="bg-white text-primary hover:bg-blue-50 shadow-glow"
                onClick={() => navigate('/alerts')}
              >
                <AlertTriangle className="mr-2 h-5 w-5" />
                View Live Alerts
              </Button>
              <Badge variant="destructive" className="animate-pulse-glow">
                {activeAlert}
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="text-center shadow-card">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">2,595</div>
                <div className="text-muted-foreground">Active Tourists</div>
              </CardContent>
            </Card>
            <Card className="text-center shadow-card">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-safe mb-2">98.7%</div>
                <div className="text-muted-foreground">Safety Score</div>
              </CardContent>
            </Card>
            <Card className="text-center shadow-card">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-warning mb-2">12</div>
                <div className="text-muted-foreground">Zones Monitored</div>
              </CardContent>
            </Card>
            <Card className="text-center shadow-card">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-accent mb-2">24/7</div>
                <div className="text-muted-foreground">Emergency Response</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Modules */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">System Modules</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive safety monitoring across different tourism segments with real-time tracking and emergency response capabilities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {modules.map((module, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-elevated transition-all duration-300 cursor-pointer border-l-4 border-l-primary/20 hover:border-l-primary"
                onClick={() => navigate(module.path)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <module.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="group-hover:text-primary transition-colors">
                          {module.title}
                        </CardTitle>
                        <Badge variant="secondary" className="mt-1">
                          {module.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        {module.users}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">
                    {module.description}
                  </CardDescription>
                  <Button variant="outline" size="sm" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    Access Module
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Innovation Highlight */}
      <section className="py-16 bg-gradient-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <Brain className="h-16 w-16 mx-auto mb-6 text-blue-200" />
            <h2 className="text-3xl font-bold mb-4">Innovation Showcase</h2>
            <p className="text-xl mb-8 text-blue-100">
              Powered by blockchain-backed identification, AI anomaly detection, and end-to-end encrypted communications with multilingual accessibility
            </p>
            <Button 
              variant="secondary" 
              size="lg" 
              className="bg-white text-primary hover:bg-blue-50"
              onClick={() => navigate('/innovation')}
            >
              Explore Technologies
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;