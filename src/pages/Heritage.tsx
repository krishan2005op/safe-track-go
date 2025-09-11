import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Navigation } from "@/components/Navigation";
import { CrowdHeatmap } from "@/components/CrowdHeatmap";
import { TicketBooking } from "@/components/TicketBooking";
import { AlertTriangle, MapPin, Users, Wifi, Shield, CreditCard } from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const Heritage = () => {
  const [selectedSite, setSelectedSite] = useState("Red Fort Delhi");
  const [rfidId] = useState("RFID-2024-0891");

  const sites = [
    { name: "Red Fort Delhi", crowd: "High", safety: "Safe", visitors: 1247 },
    { name: "Qutub Minar", crowd: "Medium", safety: "Safe", visitors: 892 },
    { name: "India Gate", crowd: "Low", safety: "Safe", visitors: 456 },
    { name: "Lotus Temple", crowd: "Medium", safety: "Caution", visitors: 723 }
  ];

  const handleSOSAlert = (type: string) => {
  toast.error(`🚨 SOS Alert Triggered! (${type}) Emergency services have been notified. Help is on the way!`, {
    duration: 5000,
  });
};

  const getCrowdBadgeVariant = (level: string) => {
    switch (level) {
      case "High": return "destructive";
      case "Medium": return "default";
      default: return "secondary";
    }
  };

  const getSafetyBadgeVariant = (status: string) => {
    switch (status) {
      case "Safe": return "default";
      case "Caution": return "secondary";
      default: return "destructive";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header Section */}
      <section className="bg-gradient-primary text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-6">
            <MapPin className="h-8 w-8" />
            <div>
              <h1 className="text-3xl font-bold">Heritage & Religious Sites</h1>
              <p className="text-blue-100">Crowd monitoring and safety management for cultural sites</p>
            </div>
          </div>
          
          {/* RFID Band Display */}
          <Card className="bg-white/10 border-white/20 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Wifi className="h-6 w-6 text-blue-200" />
                  <div>
                    <p className="font-semibold">Smart Band Connected</p>
                    <p className="text-sm text-blue-200">ID: {rfidId}</p>
                  </div>
                </div>
                <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button 
      variant="destructive" 
      size="sm"
      className="animate-pulse-glow"
    >
      <AlertTriangle className="h-4 w-4 mr-2" />
      SOS
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-64">
    <DropdownMenuItem onClick={() => handleSOSAlert("Medical Emergency")}>
      Medical Emergency
    </DropdownMenuItem>
    <DropdownMenuItem onClick={() => handleSOSAlert("Women Safety Concern")}>
      Women Safety Concern
    </DropdownMenuItem>
    <DropdownMenuItem onClick={() => handleSOSAlert("Elderly / Child in Danger")}>
      Elderly / Child in Danger
    </DropdownMenuItem>
    <DropdownMenuItem onClick={() => handleSOSAlert("Fire Emergency")}>
      Fire Emergency
    </DropdownMenuItem>
    <DropdownMenuItem onClick={() => handleSOSAlert("Police Assistance")}>
      Police Assistance
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Ticket Booking Section */}
          <div className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Ticket Booking (this is shown only to user)
                </CardTitle>
                <CardDescription>Book tickets for heritage sites with crowd-aware pricing</CardDescription>
              </CardHeader>
              <CardContent>
                <TicketBooking />
              </CardContent>
            </Card>

            {/* Site Selection */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Select Heritage Site (this is shown only to user)</CardTitle>
                <CardDescription>Choose from available heritage and religious sites</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {sites.map((site, index) => (
                  <div
                    key={index}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors hover:bg-muted/50 ${
                      selectedSite === site.name ? "border-primary bg-primary/5" : "border-border"
                    }`}
                    onClick={() => setSelectedSite(site.name)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{site.name}</h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        {site.visitors}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant={getCrowdBadgeVariant(site.crowd)}>
                        {site.crowd} Crowd
                      </Badge>
                      <Badge variant={getSafetyBadgeVariant(site.safety)} className="status-safe">
                        {site.safety}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Crowd Monitoring Section */}
          <div className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Crowd Heatmap - {selectedSite}  (this is shown to admin)
                  </span>
                  <Badge variant="secondary">Live</Badge>
                </CardTitle>
                <CardDescription>Real-time crowd density monitoring across site zones</CardDescription>
              </CardHeader>
              <CardContent>
                <CrowdHeatmap siteName={selectedSite} />
              </CardContent>
            </Card>

            {/* Current Status */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Current Site Status (this is shown to admin)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-safe/10 rounded-lg border border-safe/20">
                    <div className="text-2xl font-bold text-safe mb-1">Safe</div>
                    <div className="text-sm text-muted-foreground">Overall Status</div>
                  </div>
                  <div className="text-center p-4 bg-warning/10 rounded-lg border border-warning/20">
                    <div className="text-2xl font-bold text-warning mb-1">Medium</div>
                    <div className="text-sm text-muted-foreground">Crowd Level</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Entry Gate</span>
                    <Badge className="status-safe">Clear</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Main Courtyard</span>
                    <Badge className="status-warning">Moderate</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Exhibition Hall</span>
                    <Badge className="status-safe">Light</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Exit Points</span>
                    <Badge className="status-safe">Clear</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Information
            <Card className="shadow-card border-l-4 border-l-primary">
              <CardHeader>
                <CardTitle className="text-primary">Emergency Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-primary" />
                    <span className="text-sm">Emergency exits clearly marked</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    <span className="text-sm">Security personnel on-site: 12</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wifi className="h-4 w-4 text-primary" />
                    <span className="text-sm">Your location is being tracked for safety</span>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-gradient-primary">
                  View Site Safety Plan
                </Button>
              </CardContent>
            </Card> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Heritage;