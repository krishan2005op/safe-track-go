import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { AlertsTimeline } from "@/components/AlertsTimeline";
import { IncidentMap } from "@/components/IncidentMap";
import { SituationalAwareness } from "@/components/SituationalAwareness";
import { AlertTriangle, Bell, Shield, Users, Clock, MapPin } from "lucide-react";
import { toast } from "sonner";

const Alerts = () => {
  const [activeAlerts, setActiveAlerts] = useState(2);
  const [responseTeams, setResponseTeams] = useState(4);
  
  const recentAlerts = [
    {
      id: 1,
      type: "Medical emergency",
      location: "Rocky Terrain",
      time: "2 minutes ago",
      severity: "Critical",
      status: "Active",
      description: "Tourist requires immediate medical assistance"
    },
    {
      id: 2,
      type: "Medical emergency",
      location: "Trial Path",
      time: "1 minutes ago",
      severity: "Critical",
      status: "Active",
      description: "Tourist requires immediate medical assistance"
    },
    {
      id: 3,
      type: "Weather Warning",
      location: "Himalayan Trek Route",
      time: "45 minutes ago",
      severity: "Medium",
      status: "Monitoring",
      description: "Heavy rainfall expected, route conditions deteriorating"
    }
  ];

  // Transform alerts for IncidentMap component
  const mapAlerts = recentAlerts.map((alert, index) => ({
    id: alert.id,
    x: [25, 65, 45][index] || 50, // Mock x coordinates
    y: [30, 20, 60][index] || 40, // Mock y coordinates
    description: alert.description
  }));

  useEffect(() => {
    // Simulate real-time alerts
    const interval = setInterval(() => {
      const alertTypes = ["Risky Zone Entry", "Emergency Help Sent", "Weather Alert", "Crowd Warning"];
      const randomAlert = alertTypes[Math.floor(Math.random() * alertTypes.length)];
      
      toast.warning(`🔔 ${randomAlert}: New incident detected in monitoring area. Response team dispatched.`, {
        duration: 4000,
      });
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical": return "bg-danger text-danger-foreground";
      case "High": return "bg-warning text-warning-foreground";
      case "Medium": return "bg-primary text-primary-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "destructive";
      case "Responding": return "default";
      case "Monitoring": return "secondary";
      default: return "outline";
    }
  };

  const handleQuickResponse = (alertId: number) => {
    toast.success(`🚀 Emergency response team dispatched for Alert #${alertId}. ETA: 8 minutes.`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header Section */}
      <section className="bg-gradient-danger text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-6">
            <AlertTriangle className="h-8 w-8" />
            <div>
              <h1 className="text-3xl font-bold">Alerts & Incident Response(this page is shown only to the admin)</h1>
              <p className="text-red-100">Real-time emergency monitoring and response coordination</p>
            </div>
          </div>
          
          {/* Active Status */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-white/10 border-white/20 text-white">
              <CardContent className="p-4 text-center">
                <AlertTriangle className="h-8 w-8 mx-auto mb-2" />
                <div className="text-2xl font-bold">{activeAlerts}</div>
                <div className="text-sm text-red-200">Active Alerts</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 border-white/20 text-white">
              <CardContent className="p-4 text-center">
                <Shield className="h-8 w-8 mx-auto mb-2" />
                <div className="text-2xl font-bold">{responseTeams}</div>
                <div className="text-sm text-red-200">Response Teams</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 border-white/20 text-white">
              <CardContent className="p-4 text-center">
                <Users className="h-8 w-8 mx-auto mb-2" />
                <div className="text-2xl font-bold">247</div>
                <div className="text-sm text-red-200">People Assisted</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 border-white/20 text-white">
              <CardContent className="p-4 text-center">
                <Clock className="h-8 w-8 mx-auto mb-2" />
                <div className="text-2xl font-bold">3.2m</div>
                <div className="text-sm text-red-200">Avg Response</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Recent Alerts */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary" />
                  Recent Alerts
                </CardTitle>
                <CardDescription>Latest incidents and their status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentAlerts.map((alert) => (
                  <div key={alert.id} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-sm">{alert.type}</h3>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                          <MapPin className="h-3 w-3" />
                          {alert.location}
                        </p>
                      </div>
                      <Badge className={getSeverityColor(alert.severity)}>
                        {alert.severity}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">{alert.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant={getStatusColor(alert.status)}>
                          {alert.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{alert.time}</span>
                      </div>
                      
                      {alert.status === "Active" && (
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleQuickResponse(alert.id)}
                        >
                          Respond
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Alert Timeline</CardTitle>
                <CardDescription>Chronological view of recent incidents</CardDescription>
              </CardHeader>
              <CardContent>
                <AlertsTimeline />
              </CardContent>
            </Card> */}
          </div>

          {/* Incident Map & Situational Awareness */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Incident Monitoring Map
                  </span>
                  <Badge variant="destructive" className="animate-pulse">
                    {activeAlerts} Active
                  </Badge>
                </CardTitle>
                <CardDescription>Real-time visualization of incidents and response teams</CardDescription>
              </CardHeader>
              <CardContent>
                <IncidentMap alerts={mapAlerts} />
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Situational Awareness Dashboard
                </CardTitle>
                <CardDescription>Live monitoring of system status and emergency readiness</CardDescription>
              </CardHeader>
              <CardContent>
                <SituationalAwareness />
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              
              <Button 
                variant="default" 
                className="h-20 flex flex-col gap-2"
                onClick={() => toast.success("📢 Public announcement broadcast to all monitoring zones.")}
              >
                <Bell className="h-6 w-6" />
                Broadcast Alert
              </Button>
              
              <Button 
                variant="secondary" 
                className="h-20 flex flex-col gap-2"
                onClick={() => toast.info("🚁 Additional emergency resources requested and en route.")}
              >
                <Shield className="h-6 w-6" />
                Call Backup
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alerts;