import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";

interface GeofenceMapProps {
  currentZone: string;
  onZoneChange: (zone: string) => void;
}

export const GeofenceMap = ({ currentZone, onZoneChange }: GeofenceMapProps) => {
  const [userPosition, setUserPosition] = useState({ x: 45, y: 60 });

  const zones = [
    { name: "Base Camp", x: 40, y: 70, width: 20, height: 15, risk: "Safe", color: "bg-safe/30 border-safe" },
    { name: "Trail Path", x: 30, y: 40, width: 40, height: 25, risk: "Low", color: "bg-safe/20 border-safe/50" },
    { name: "Rocky Terrain", x: 65, y: 30, width: 25, height: 35, risk: "Medium", color: "bg-warning/30 border-warning" },
    { name: "Cliff Edge", x: 15, y: 15, width: 30, height: 20, risk: "High", color: "bg-danger/30 border-danger" },
    { name: "Weather Alert Zone", x: 75, y: 10, width: 20, height: 25, risk: "Critical", color: "bg-danger/40 border-danger animate-pulse" }
  ];

  useEffect(() => {
    // Simulate user movement
    const interval = setInterval(() => {
      setUserPosition(prev => {
        const newX = Math.max(10, Math.min(90, prev.x + (Math.random() - 0.5) * 8));
        const newY = Math.max(10, Math.min(90, prev.y + (Math.random() - 0.5) * 6));
        
        // Check which zone the user is in
        const currentZoneData = zones.find(zone => 
          newX >= zone.x && newX <= zone.x + zone.width &&
          newY >= zone.y && newY <= zone.y + zone.height
        );
        
        if (currentZoneData && currentZoneData.name !== currentZone) {
          onZoneChange(currentZoneData.name);
        }
        
        return { x: newX, y: newY };
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [currentZone, onZoneChange]);

  return (
    <div className="space-y-4">
      {/* Map Container */}
      <div className="relative bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-4 h-80 border overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent"></div>
        
        {/* Zones */}
        {zones.map((zone, index) => (
          <div
            key={index}
            className={`absolute border-2 rounded-lg ${zone.color} flex items-center justify-center text-xs font-semibold transition-all cursor-pointer hover:opacity-80`}
            style={{
              left: `${zone.x}%`,
              top: `${zone.y}%`,
              width: `${zone.width}%`,
              height: `${zone.height}%`,
            }}
            title={`${zone.name} - ${zone.risk} Risk`}
          >
            <div className="text-center">
              <div className="font-bold">{zone.name}</div>
              <Badge variant="secondary" className="mt-1 text-xs">
                {zone.risk}
              </Badge>
            </div>
          </div>
        ))}

        {/* User Position */}
        <div
          className="absolute w-4 h-4 bg-primary rounded-full border-2 border-white shadow-lg animate-pulse-glow z-10 flex items-center justify-center"
          style={{
            left: `${userPosition.x}%`,
            top: `${userPosition.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-2 right-2 bg-white/90 p-3 rounded-lg shadow-card">
          <h4 className="font-semibold text-xs mb-2">Legend</h4>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-safe/50 border border-safe rounded"></div>
              <span className="text-xs">Safe Zone</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-warning/50 border border-warning rounded"></div>
              <span className="text-xs">Caution Zone</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-danger/50 border border-danger rounded"></div>
              <span className="text-xs">Restricted Zone</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span className="text-xs">Your Location</span>
            </div>
          </div>
        </div>
      </div>

      {/* Current Zone Info */}
      <div className="p-4 bg-muted/30 rounded-lg border">
        <h3 className="font-semibold mb-2">Current Location Status</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm">Zone:</span>
            <Badge className={
              currentZone.includes("Safe") || currentZone.includes("Base") ? "status-safe" :
              currentZone.includes("Rocky") || currentZone.includes("Trail") ? "status-warning" :
              "status-danger"
            }>
              {currentZone}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Coordinates:</span>
            <span className="text-sm font-mono">{userPosition.x.toFixed(1)}°, {userPosition.y.toFixed(1)}°</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Altitude:</span>
            <span className="text-sm">1,247m</span>
          </div>
        </div>
      </div>

      
    </div>
  );
};