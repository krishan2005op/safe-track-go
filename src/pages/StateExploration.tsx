import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Navigation } from "@/components/Navigation";
import { SafetyMap } from "@/components/SafetyMap";
import { SafetyChart } from "@/components/SafetyChart";
import { AlertTriangle, MapPin, Shield, TrendingUp, Navigation2, Clock } from "lucide-react";
import { toast } from "sonner";

const StateExploration = () => {
  const [currentSafetyScore, setCurrentSafetyScore] = useState(87);
  const [activeRoute, setActiveRoute] = useState("Delhi Heritage Circuit");

  const routes = [
    { 
      name: "Delhi Heritage Circuit", 
      safety: 87, 
      distance: "15.2 km", 
      duration: "4.5 hours",
      status: "Recommended" 
    },
    { 
      name: "Rajasthan Desert Trail", 
      safety: 72, 
      distance: "45.8 km", 
      duration: "8 hours",
      status: "Caution" 
    },
    { 
      name: "Kerala Backwaters", 
      safety: 92, 
      distance: "28.6 km", 
      duration: "6 hours",
      status: "Safe" 
    },
    { 
      name: "Himalayan Foothills", 
      safety: 65, 
      distance: "67.3 km", 
      duration: "12 hours",
      status: "High Risk" 
    }
  ];

  useEffect(() => {
    // Simulate emergency alert
    const timer = setTimeout(() => {
      toast.error("🚨 Emergency Alert: Heavy rainfall reported on Himalayan Foothills route. Consider alternative paths.", {
        duration: 6000,
        action: {
          label: "View Details",
          onClick: () => console.log("View emergency details")
        }
      });
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const getSafetyColor = (score: number) => {
    if (score >= 85) return "text-safe";
    if (score >= 70) return "text-warning";
    return "text-danger";
  };

  const getSafetyBadge = (status: string) => {
    switch (status) {
      case "Safe":
      case "Recommended":
        return "default";
      case "Caution":
        return "secondary";
      default:
        return "destructive";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header Section */}
      <section className="bg-gradient-primary text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-6">
            <Navigation2 className="h-8 w-8" />
            <div>
              <h1 className="text-3xl font-bold">State Exploration</h1>
              <p className="text-blue-100">GPS tracking and safety monitoring for regional tourism</p>
            </div>
          </div>
          
          {/* Current Safety Score */}
          <Card className="bg-white/10 border-white/20 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-200">Current Route Safety Score</p>
                  <p className="text-3xl font-bold">{currentSafetyScore}%</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-blue-200">Active Route</p>
                  <p className="font-semibold">{activeRoute}</p>
                </div>
                <Shield className="h-12 w-12 text-blue-200" />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Route Selection */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Available Routes</CardTitle>
                <CardDescription>Select your exploration route with safety recommendations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {routes.map((route, index) => (
                  <div
                    key={index}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors hover:bg-muted/50 ${
                      activeRoute === route.name ? "border-primary bg-primary/5" : "border-border"
                    }`}
                    onClick={() => {
                      setActiveRoute(route.name);
                      setCurrentSafetyScore(route.safety);
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-sm">{route.name}</h3>
                      <Badge variant={getSafetyBadge(route.status)}>
                        {route.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Safety Score</span>
                        <span className={`font-semibold ${getSafetyColor(route.safety)}`}>
                          {route.safety}%
                        </span>
                      </div>
                      <Progress value={route.safety} className="h-2" />
                      
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {route.distance}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {route.duration}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Current Location Status */}
            <Card className="shadow-card border-l-4 border-l-primary">
              <CardHeader>
                <CardTitle className="text-primary">Your Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-safe rounded-full animate-pulse"></div>
                    <span className="text-sm">GPS tracking active</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    <span className="text-sm">Emergency contacts synced</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Navigation2 className="h-4 w-4 text-primary" />
                    <span className="text-sm">Route optimization enabled</span>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-gradient-danger" size="sm">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Emergency SOS
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Map and Charts */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Interactive Safety Map - {activeRoute}
                  </span>
                  <Badge variant="secondary" className="animate-pulse">Live</Badge>
                </CardTitle>
                <CardDescription>Real-time route visualization with safety zones and checkpoints</CardDescription>
              </CardHeader>
              <CardContent>
                <SafetyMap routeName={activeRoute} />
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Safety Trends
                  </CardTitle>
                  <CardDescription>Hourly and weekly safety score analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <SafetyChart type="hourly" />
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Weekly Overview</CardTitle>
                  <CardDescription>7-day safety score pattern</CardDescription>
                </CardHeader>
                <CardContent>
                  <SafetyChart type="weekly" />
                </CardContent>
              </Card>
            </div>

            {/* Route Checkpoints */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Route Checkpoints</CardTitle>
                <CardDescription>Key stops and safety points along your route</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-safe/10 rounded-lg border border-safe/20">
                    <div>
                      <h3 className="font-semibold">Start Point - Tourism Office</h3>
                      <p className="text-sm text-muted-foreground">Registration and safety briefing</p>
                    </div>
                    <Badge className="status-safe">Completed</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg border border-primary/20">
                    <div>
                      <h3 className="font-semibold">Checkpoint 1 - Heritage Museum</h3>
                      <p className="text-sm text-muted-foreground">Rest area with emergency facilities</p>
                    </div>
                    <Badge variant="default">Current</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div>
                      <h3 className="font-semibold">Checkpoint 2 - Scenic Viewpoint</h3>
                      <p className="text-sm text-muted-foreground">Photo stop with safety barrier</p>
                    </div>
                    <Badge variant="secondary">Upcoming</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div>
                      <h3 className="font-semibold">End Point - Cultural Center</h3>
                      <p className="text-sm text-muted-foreground">Final check-out and feedback</p>
                    </div>
                    <Badge variant="secondary">Pending</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StateExploration;