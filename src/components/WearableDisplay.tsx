import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Battery, Heart, MapPin, AlertTriangle, Wifi } from "lucide-react";

interface WearableDisplayProps {
  connected: boolean;
  batteryLevel: number;
  currentZone: string;
}

export const WearableDisplay = ({ connected, batteryLevel, currentZone }: WearableDisplayProps) => {
  const getBatteryColor = (level: number) => {
    if (level > 50) return "bg-safe";
    if (level > 20) return "bg-warning";
    return "bg-danger";
  };

  const getZoneColor = (zone: string) => {
    if (zone.includes("Safe") || zone.includes("Base")) return "status-safe";
    if (zone.includes("Rocky") || zone.includes("Medium")) return "status-warning";
    return "status-danger";
  };

  return (
    <div className="space-y-4">
      {/* Wearable Status */}
      <div className="p-4 bg-muted/30 rounded-lg border">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${connected ? 'bg-safe' : 'bg-danger'} animate-pulse`}></div>
            <span className="font-semibold text-sm">Smart Band Status</span>
          </div>
          <Badge variant={connected ? "default" : "destructive"}>
            {connected ? "Connected" : "Offline"}
          </Badge>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Battery className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Battery</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{Math.round(batteryLevel)}%</span>
              <div className="w-16">
                <Progress 
                  value={batteryLevel} 
                  className={`h-2 ${getBatteryColor(batteryLevel)}`} 
                />
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-danger" />
              <span className="text-sm">Heart Rate</span>
            </div>
            <span className="text-sm font-medium">78 BPM</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-sm">Location</span>
            </div>
            <Badge className={getZoneColor(currentZone)}>
              {currentZone}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wifi className="h-4 w-4 text-accent" />
              <span className="text-sm">GPS Signal</span>
            </div>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4].map((bar) => (
                <div 
                  key={bar}
                  className={`w-1 h-3 rounded ${
                    connected && bar <= 3 ? 'bg-safe' : 'bg-muted'
                  }`}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      

      {/* Device Info */}
      <div className="text-xs text-muted-foreground bg-muted/20 p-3 rounded">
        <div className="flex justify-between mb-1">
          <span>Device ID:</span>
          <span className="font-mono">WB-2024-7832</span>
        </div>
        <div className="flex justify-between mb-1">
          <span>Last Sync:</span>
          <span>2 minutes ago</span>
        </div>
        <div className="flex justify-between">
          <span>Emergency Contact:</span>
          <span>+91-9876543210</span>
        </div>
      </div>
    </div>
  );
};