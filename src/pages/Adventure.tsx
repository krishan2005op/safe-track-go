import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Navigation } from "@/components/Navigation";
import { WearableDisplay } from "@/components/WearableDisplay";
import { GeofenceMap } from "@/components/GeofenceMap";

import { AlertTriangle, Mountain, Watch, MapPin, Shield, Zap, Wifi } from "lucide-react";
import { toast } from "sonner";
import QRCode from "react-qr-code";

const demoTourist = {
  id: "TST12345",
  name: "Aarav Mehta",
  age: 28,
  nationality: "Indian",
  bloodGroup: "B+",
  emergencyContact: "+91-9876543210",
  status: "Active"
};
type Tourist = {
  id: string;
  name: string;
  age: number;
  nationality: string;
  bloodGroup: string;
  emergencyContact: string;
  status: string;
};

export const QRCodeDisplay = ({ tourist }: { tourist: Tourist }) => {
  
  const qrData = JSON.stringify(tourist);

  return (
    <div className="flex justify-center items-center p-4 bg-white rounded-lg">
      <QRCode value={qrData} size={150} />
    </div>
  );
};

const Adventure = () => {
  const [wearableConnected, setWearableConnected] = useState(true);
  const [currentZone, setCurrentZone] = useState("Safe Zone");
  const [batteryLevel, setBatteryLevel] = useState(78);
  const [touristId] = useState("ADV-2024-3847");

  const zones = [
    { name: "Base Camp", risk: "Safe", color: "safe", description: "Well-equipped starting point with facilities" },
    { name: "Trail Path", risk: "Low", color: "safe", description: "Marked hiking trails with regular checkpoints" },
    { name: "Rocky Terrain", risk: "Medium", color: "warning", description: "Uneven surfaces, requires caution" },
    { name: "Cliff Edge", risk: "High", color: "danger", description: "Restricted area - experienced hikers only" },
    { name: "Weather Alert Zone", risk: "Critical", color: "danger", description: "Currently unsafe due to weather conditions" }
  ];

  useEffect(() => {
    // Simulate geo-fence alert
    const timer = setTimeout(() => {
      if (currentZone !== "Weather Alert Zone") {
        setCurrentZone("Rocky Terrain");
        toast.warning("⚠️ Geo-fence Alert: You are entering a Medium Risk zone. Please exercise caution and stay on marked paths.", {
          duration: 5000,
        });
      }
    }, 8000);

    // Simulate battery updates
    const batteryTimer = setInterval(() => {
      setBatteryLevel(prev => Math.max(20, prev - Math.random() * 2));
    }, 10000);

    return () => {
      clearTimeout(timer);
      clearInterval(batteryTimer);
    };
  }, [currentZone]);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Safe":
      case "Low":
        return "text-safe";
      case "Medium":
        return "text-warning";
      case "High":
      case "Critical":
        return "text-danger";
      default:
        return "text-muted-foreground";
    }
  };

  const getZoneBadge = (risk: string) => {
    switch (risk) {
      case "Safe":
      case "Low":
        return "default";
      case "Medium":
        return "secondary";
      default:
        return "destructive";
    }
  };

  const handleSOSAlert = () => {
    toast.error("🚨 SOS Alert Activated! Emergency coordinates sent to rescue team. Stay calm, help is on the way!", {
      duration: 6000,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header Section */}
      <section className="bg-gradient-primary text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-6">
            <Mountain className="h-8 w-8" />
            <div>
              <h1 className="text-3xl font-bold">Adventure & Trekking</h1>
              <p className="text-blue-100">Wearable integration and geo-fencing for outdoor activities</p>
            </div>
          </div>
          
          {/* Wearable Status */}
          <Card className="bg-white/10 border-white/20 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${wearableConnected ? 'bg-safe/20' : 'bg-danger/20'}`}>
                    <Watch className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-semibold">Smart Band Status</p>
                    <p className="text-sm text-blue-200">
                      {wearableConnected ? "Connected & Tracking" : "Connection Lost"}
                    </p>
                  </div>
                </div>
                
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Wearable & Tourist ID */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Watch className="h-5 w-5 text-primary" />
                  Wearable Device
                </CardTitle>
                <CardDescription>Real-time monitoring and emergency features</CardDescription>
              </CardHeader>
              <CardContent>
                <WearableDisplay 
                  connected={wearableConnected}
                  batteryLevel={batteryLevel}
                  currentZone={currentZone}
                />
              </CardContent>
            </Card>

               <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          Tourist ID
        </CardTitle>
        <CardDescription>QR-based identification and tracking</CardDescription>
      </CardHeader>

      <CardContent>
        {/* Digital Tourist ID + QR */}
        <div className="bg-gray-50 rounded-lg p-4 text-center mb-4">
          <div className="font-semibold">Digital Tourist ID</div>
          <Badge variant="secondary" className="mt-1">
            ID: {demoTourist.id}
          </Badge>
          <p className="text-xs text-gray-500 mt-2">
            Scan for instant verification and emergency information
          </p>

          {/* ✅ QR Code */}
          <div className="flex justify-center mt-4">
            <QRCode value={JSON.stringify(demoTourist)} size={120} />
          </div>
        </div>

        {/* ✅ Tourist Details below QR */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Tourist Name</span>
            <span className="font-semibold">{demoTourist.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Age</span>
            <span className="font-semibold">{demoTourist.age}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Nationality</span>
            <span className="font-semibold">{demoTourist.nationality}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Blood Group</span>
            <span className="font-semibold">{demoTourist.bloodGroup}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Emergency Contact</span>
            <span className="font-semibold">{demoTourist.emergencyContact}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Status</span>
            <span className="font-semibold">{demoTourist.status}</span>
          </div>
        </div>
      </CardContent>
    </Card>
            
            {/* Emergency Actions */}
            <Card className="shadow-card border-l-4 border-l-danger">
              <CardHeader>
                <CardTitle className="text-danger">Emergency Actions (this is shown on hiker app or band)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="destructive" 
                  className="w-full animate-pulse-glow"
                  onClick={handleSOSAlert}
                >
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  SOS Emergency
                </Button>
                <Button variant="outline" className="w-full">
                  <MapPin className="h-4 w-4 mr-2" />
                  Mark Safe Spot
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Geo-fencing Map */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Geo-fencing Safety Map (this is shown to admin)
                  </span>
                  <Badge variant="secondary" className="animate-pulse">Live Tracking</Badge>
                </CardTitle>
                <CardDescription>Color-coded safety zones with real-time location monitoring</CardDescription>
              </CardHeader>
              <CardContent>
                <GeofenceMap currentZone={currentZone} onZoneChange={setCurrentZone} />
              </CardContent>
            </Card>

            {/* Zone Information */}
            

            {/* Activity Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="shadow-card text-center">
                <CardContent className="pt-6">
                  <Zap className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold text-primary">4.2 km</div>
                  <div className="text-sm text-muted-foreground">Distance Covered</div>
                </CardContent>
              </Card>
              <Card className="shadow-card text-center">
                <CardContent className="pt-6">
                  <Watch className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold text-primary">2h 15m</div>
                  <div className="text-sm text-muted-foreground">Active Time</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Adventure;