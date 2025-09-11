import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
interface IncidentMapProps {
  alerts: { id: number; x: number; y: number; description: string }[];
}

export const IncidentMap = ({ alerts }: IncidentMapProps) => {
  const [userPosition, setUserPosition] = useState({ x: 45, y: 60 });
  
    const zones = [
      { name: "Base Camp", x: 40, y: 70, width: 20, height: 15, risk: "Safe", color: "bg-safe/30 border-safe" },
      { name: "Trail Path", x: 30, y: 40, width: 40, height: 25, risk: "Low", color: "bg-safe/20 border-safe/50" },
      { name: "Rocky Terrain", x: 65, y: 30, width: 25, height: 35, risk: "Medium", color: "bg-warning/30 border-warning" },
      { name: "Cliff Edge", x: 15, y: 15, width: 30, height: 20, risk: "High", color: "bg-danger/30 border-danger" },
      { name: "Weather Alert Zone", x: 75, y: 10, width: 20, height: 25, risk: "Critical", color: "bg-danger/40 border-danger animate-pulse" }
    ];

    const allAlerts = [
    ...alerts,
    { id: 9991, x: 45, y: 50, description: "Alert on Trail Path" },
    { id: 9992, x: 70, y: 40, description: "Alert on Rocky Terrain" }
  ];
  return (
    <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-4 h-96 border">
      <h2 className="font-semibold text-lg mb-2">Incident Tracking Prototype</h2>
      

      {/* Prototype grid background */}
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

        {/* Alerts placed as red dots */}
      {allAlerts.map((alert) => (
        <div
          key={alert.id}
          className="absolute w-4 h-4 bg-red-600 rounded-full animate-pulse border-2 border-white shadow-md"
          style={{
            left: `${alert.x}%`,
            top: `${alert.y}%`,
          }}
          title={alert.description}
        ></div>
      ))}
    

      {/* Legend */}
      <div className="absolute bottom-4 right-6 bg-white rounded-lg p-2 shadow-md text-sm">
        <p><span className="inline-block w-3 h-3 bg-red-600 rounded-full mr-2"></span>Alert</p>
        <p><span className="inline-block w-3 h-3 bg-green-400 border border-green-700 mr-2"></span>Safe Zone</p>
        <p><span className="inline-block w-3 h-3 bg-yellow-300 border border-yellow-700 mr-2"></span>Caution Zone</p>
        <p><span className="inline-block w-3 h-3 bg-red-300 border border-red-700 mr-2"></span>Restricted Zone</p>
      </div>
    </div>
  );
};
