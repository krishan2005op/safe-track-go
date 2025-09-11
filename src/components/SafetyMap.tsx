import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";

interface SafetyMapProps {
  routeName: string;
}

export const SafetyMap = ({ routeName }: SafetyMapProps) => {
  const [currentLocation, setCurrentLocation] = useState({ x: 15, y: 80 });
  const [routeProgress, setRouteProgress] = useState(25);

  const routes = {
    "Delhi Heritage Circuit": [
      { x: 15, y: 80, name: "Start - Tourism Office", status: "completed" },
      { x: 35, y: 60, name: "Red Fort", status: "current" },
      { x: 55, y: 45, name: "Jama Masjid", status: "upcoming" },
      { x: 75, y: 30, name: "Chandni Chowk", status: "upcoming" },
      { x: 85, y: 15, name: "End - India Gate", status: "upcoming" }
    ],
    "Rajasthan Desert Trail": [
      { x: 10, y: 85, name: "Jaisalmer Fort", status: "completed" },
      { x: 30, y: 70, name: "Desert Camp", status: "current" },
      { x: 50, y: 50, name: "Sand Dunes", status: "upcoming" },
      { x: 70, y: 35, name: "Camel Safari Point", status: "upcoming" },
      { x: 90, y: 20, name: "Sunset Point", status: "upcoming" }
    ],
    "Kerala Backwaters": [
      { x: 20, y: 75, name: "Alleppey Port", status: "completed" },
      { x: 40, y: 55, name: "Houseboat Station", status: "current" },
      { x: 60, y: 40, name: "Kumrakom", status: "upcoming" },
      { x: 80, y: 25, name: "Bird Sanctuary", status: "upcoming" }
    ]
  };

  const currentRoute = routes[routeName as keyof typeof routes] || routes["Delhi Heritage Circuit"];

  const safetyZones = [
    { x: 10, y: 20, width: 30, height: 25, level: "safe", name: "Safe Zone A" },
    { x: 45, y: 10, width: 35, height: 30, level: "warning", name: "Caution Zone" },
    { x: 60, y: 50, width: 25, height: 20, level: "safe", name: "Safe Zone B" },
    { x: 20, y: 60, width: 40, height: 25, level: "danger", name: "High Traffic Area" }
  ];

  useEffect(() => {
    // Simulate route progress
    const interval = setInterval(() => {
      setRouteProgress(prev => Math.min(100, prev + Math.random() * 2));
      
      // Update current location based on progress
      const completedIndex = Math.floor((routeProgress / 100) * currentRoute.length);
      if (completedIndex < currentRoute.length) {
        setCurrentLocation({
          x: currentRoute[completedIndex].x,
          y: currentRoute[completedIndex].y
        });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [routeProgress, currentRoute]);

  const getZoneColor = (level: string) => {
    switch (level) {
      case "safe": return "bg-safe/20 border-safe";
      case "warning": return "bg-warning/20 border-warning";
      case "danger": return "bg-danger/20 border-danger";
      default: return "bg-muted/20 border-muted";
    }
  };

  const getPointColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-safe border-safe";
      case "current": return "bg-primary border-primary animate-pulse-glow";
      case "upcoming": return "bg-muted border-muted";
      default: return "bg-muted border-muted";
    }
  };

  return (
    <div className="space-y-4">
      {/* Route Progress */}
      <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold">Route Progress</h3>
          <Badge variant="secondary">{Math.round(routeProgress)}% Complete</Badge>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-500"
            style={{ width: `${routeProgress}%` }}
          ></div>
        </div>
      </div>

      {/* Interactive Map */}
      <div className="relative bg-gradient-to-br from-blue-50 via-green-50 to-yellow-50 rounded-lg p-4 h-96 border overflow-hidden map-container">
        
        {/* Safety Zones */}
        {safetyZones.map((zone, index) => (
          <div
            key={`zone-${index}`}
            className={`absolute border-2 rounded-lg ${getZoneColor(zone.level)} opacity-60`}
            style={{
              left: `${zone.x}%`,
              top: `${zone.y}%`,
              width: `${zone.width}%`,
              height: `${zone.height}%`,
            }}
            title={`${zone.name} - ${zone.level} zone`}
          ></div>
        ))}

        {/* Route Path */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {currentRoute.map((point, index) => {
            if (index === 0) return null;
            const prevPoint = currentRoute[index - 1];
            return (
              <line
                key={`path-${index}`}
                x1={`${prevPoint.x}%`}
                y1={`${prevPoint.y}%`}
                x2={`${point.x}%`}
                y2={`${point.y}%`}
                stroke="#3b82f6"
                strokeWidth="3"
                strokeDasharray={point.status === "upcoming" ? "5,5" : "0"}
                opacity={point.status === "upcoming" ? 0.5 : 1}
              />
            );
          })}
        </svg>

        {/* Route Points */}
        {currentRoute.map((point, index) => (
          <div
            key={`point-${index}`}
            className={`absolute w-4 h-4 rounded-full border-2 ${getPointColor(point.status)} flex items-center justify-center cursor-pointer hover:scale-110 transition-transform`}
            style={{
              left: `${point.x}%`,
              top: `${point.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
            title={`${point.name} - ${point.status}`}
          >
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        ))}

        {/* Current Location Indicator */}
        <div
          className="absolute w-6 h-6 bg-accent border-2 border-white rounded-full shadow-lg animate-pulse z-10 flex items-center justify-center"
          style={{
            left: `${currentLocation.x}%`,
            top: `${currentLocation.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div className="w-3 h-3 bg-white rounded-full"></div>
        </div>

        {/* Map Legend */}
        <div className="absolute bottom-2 left-2 bg-white/90 p-3 rounded-lg shadow-card text-xs">
          <h4 className="font-semibold mb-2">Legend</h4>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-safe/50 border border-safe rounded"></div>
              <span>Safe Zone</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-warning/50 border border-warning rounded"></div>
              <span>Caution Zone</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-danger/50 border border-danger rounded"></div>
              <span>Risk Zone</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-accent rounded-full"></div>
              <span>Current Location</span>
            </div>
          </div>
        </div>

        {/* Route Info */}
        <div className="absolute top-2 right-2 bg-white/90 p-3 rounded-lg shadow-card text-xs">
          <h4 className="font-semibold mb-1">{routeName}</h4>
          <div className="space-y-1">
            <div>Distance: 15.2 km</div>
            <div>Duration: 4.5 hours</div>
            <div>Safety Score: 87%</div>
          </div>
        </div>
      </div>

      {/* Checkpoints List */}
      <div className="space-y-2">
        <h3 className="font-semibold">Route Checkpoints</h3>
        {currentRoute.map((point, index) => (
          <div
            key={index}
            className={`flex items-center justify-between p-3 rounded-lg border ${
              point.status === "current" 
                ? "border-primary bg-primary/5" 
                : point.status === "completed"
                ? "border-safe bg-safe/5"
                : "border-muted bg-muted/20"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${
                point.status === "current" ? "bg-primary animate-pulse" :
                point.status === "completed" ? "bg-safe" : "bg-muted"
              }`}></div>
              <span className="font-medium">{point.name}</span>
            </div>
            <Badge variant={
              point.status === "current" ? "default" :
              point.status === "completed" ? "secondary" : "outline"
            }>
              {point.status}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
};



