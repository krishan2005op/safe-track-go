import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Route, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AttractionSafetyMapProps {
  onAttractionSelect: (attraction: string) => void;
}

export const AttractionSafetyMap = ({ onAttractionSelect }: AttractionSafetyMapProps) => {
  const [selectedAttraction, setSelectedAttraction] = useState<string | null>(null);
  const [showRoute, setShowRoute] = useState<string | null>(null);
  const navigate = useNavigate();
  
  const currentLocation = { x: 50, y: 50, name: "Your Location" };
  
  const attractions = [
    {
      id: "red-fort",
      name: "Red Fort",
      x: 20,
      y: 30,
      safetyScore: 85,
      distance: "2.3 km",
      travelTime: "8 min",
      status: "Safe"
    },
    {
      id: "qutub-minar", 
      name: "Qutub Minar",
      x: 75,
      y: 20,
      safetyScore: 78,
      distance: "12.5 km",
      travelTime: "25 min",
      status: "Caution"
    },
    {
      id: "india-gate",
      name: "India Gate",
      x: 80,
      y: 80,
      safetyScore: 92,
      distance: "5.1 km", 
      travelTime: "15 min",
      status: "Safe"
    },
    {
      id: "lotus-temple",
      name: "Lotus Temple",
      x: 25,
      y: 85,
      safetyScore: 88,
      distance: "8.7 km",
      travelTime: "20 min", 
      status: "Safe"
    }
  ];

  const roads = [
    // Road from current location to Red Fort
    { from: currentLocation, to: attractions[0], safety: "safe", waypoints: [{ x: 35, y: 40 }] },
    // Road from current location to Qutub Minar
    { from: currentLocation, to: attractions[1], safety: "caution", waypoints: [{ x: 62, y: 35 }] },
    // Road from current location to India Gate  
    { from: currentLocation, to: attractions[2], safety: "safe", waypoints: [{ x: 65, y: 65 }] },
    // Road from current location to Lotus Temple
    { from: currentLocation, to: attractions[3], safety: "safe", waypoints: [{ x: 37, y: 67 }] },
    // Connecting roads between attractions
    { from: attractions[0], to: attractions[1], safety: "caution", waypoints: [{ x: 47, y: 25 }] },
    { from: attractions[2], to: attractions[3], safety: "safe", waypoints: [{ x: 52, y: 82 }] }
  ];

  const getSafetyColor = (score: number) => {
    if (score >= 85) return "text-safe";
    if (score >= 70) return "text-warning";
    return "text-danger";
  };

  const getSafetyBadge = (status: string) => {
    switch (status) {
      case "Safe": return "default";
      case "Caution": return "secondary"; 
      default: return "destructive";
    }
  };

  const getRoadColor = (safety: string) => {
    switch (safety) {
      case "safe": return "#22c55e";
      case "caution": return "#f59e0b";
      case "danger": return "#ef4444";
      default: return "#6b7280";
    }
  };

  const handleBookTicket = (attractionName: string) => {
    navigate(`/heritage?attraction=${encodeURIComponent(attractionName)}`);
  };

  const handleViewRoute = (attractionId: string) => {
    setShowRoute(showRoute === attractionId ? null : attractionId);
  };

  return (
    <div className="space-y-4">
      {/* Interactive Map */}
      <div className="relative bg-gradient-to-br from-green-50 via-blue-50 to-yellow-50 rounded-lg p-4 h-96 border overflow-hidden">
        
        {/* Safety Zones Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-4 left-4 w-32 h-24 bg-safe/30 rounded-lg"></div>
          <div className="absolute top-4 right-4 w-28 h-20 bg-warning/30 rounded-lg"></div>
          <div className="absolute bottom-4 left-4 w-36 h-28 bg-safe/30 rounded-lg"></div>
          <div className="absolute bottom-4 right-4 w-40 h-32 bg-safe/30 rounded-lg"></div>
        </div>

        {/* Roads */}
        {/* Roads (only from current location to selected attraction) */}
<svg className="absolute inset-0 w-full h-full pointer-events-none">
  {roads.map((road, index) => {
    // only show route if "from" is currentLocation AND "to" is the selected attraction
    const shouldShow =
      showRoute &&
      road.from === currentLocation &&
      attractions.find(a => a.id === showRoute && a === road.to);

    if (!shouldShow) return null;

    return road.waypoints.map((waypoint, wpIndex) => (
      <g key={`road-${index}-${wpIndex}`}>
        {wpIndex === 0 && (
          <line
            x1={`${road.from.x}%`}
            y1={`${road.from.y}%`}
            x2={`${waypoint.x}%`}
            y2={`${waypoint.y}%`}
            stroke={getRoadColor(road.safety)}
            strokeWidth="6"
            opacity={1}
          />
        )}
        <line
          x1={`${waypoint.x}%`}
          y1={`${waypoint.y}%`}
          x2={`${road.to.x}%`}
          y2={`${road.to.y}%`}
          stroke={getRoadColor(road.safety)}
          strokeWidth="6"
          opacity={1}
        />
      </g>
    ));
  })}
</svg>


        {/* Current Location */}
        <div
          className="absolute w-6 h-6 bg-accent border-2 border-white rounded-full shadow-lg animate-pulse z-20 flex items-center justify-center"
          style={{
            left: `${currentLocation.x}%`,
            top: `${currentLocation.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div className="w-3 h-3 bg-white rounded-full"></div>
        </div>

        {/* Attraction Markers */}
        {attractions.map((attraction) => (
          <div
            key={attraction.id}
            className="absolute z-10"
            style={{
              left: `${attraction.x}%`,
              top: `${attraction.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div
              className={`cursor-pointer transition-transform hover:scale-110 ${
                selectedAttraction === attraction.id ? 'scale-125' : ''
              }`}
              onClick={() => {
                setSelectedAttraction(selectedAttraction === attraction.id ? null : attraction.id);
                onAttractionSelect(attraction.name);
              }}
            >
              <div className="relative">
                <MapPin className="h-8 w-8 text-primary drop-shadow-lg" fill="white" />
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                  <div className={`text-xs font-bold px-1 py-0.5 rounded text-white ${
                    attraction.safetyScore >= 85 ? 'bg-safe' :
                    attraction.safetyScore >= 70 ? 'bg-warning' : 'bg-danger'
                  }`}>
                    {attraction.safetyScore}
                  </div>
                </div>
              </div>
            </div>

            {/* Attraction Info Popup */}
            {selectedAttraction === attraction.id && (
              <Card className="absolute top-10 left-1/2 transform -translate-x-1/2 w-64 shadow-lg z-30">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-lg">{attraction.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`font-bold ${getSafetyColor(attraction.safetyScore)}`}>
                          Safety: {attraction.safetyScore}%
                        </span>
                        <Badge variant={getSafetyBadge(attraction.status)}>
                          {attraction.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="text-sm text-muted-foreground">
                      <div>Distance: {attraction.distance}</div>
                      <div>Travel Time: {attraction.travelTime}</div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewRoute(attraction.id)}
                        className="flex-1"
                      >
                        <Route className="h-4 w-4 mr-1" />
                        {showRoute === attraction.id ? 'Hide' : 'Route'}
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleBookTicket(attraction.name)}
                        className="flex-1"
                      >
                        <BookOpen className="h-4 w-4 mr-1" />
                        Book
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        ))}

        {/* Map Legend */}
        <div className="absolute bottom-4 left-4 bg-white/90 p-3 rounded-lg shadow-card text-xs">
          <h4 className="font-semibold mb-2">Legend</h4>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-1 bg-safe rounded"></div>
              <span>Safe Route</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-1 bg-warning rounded" style={{ background: 'repeating-linear-gradient(to right, #f59e0b 0, #f59e0b 4px, transparent 4px, transparent 8px)' }}></div>
              <span>Caution Route</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span>Tourist Attraction</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-accent rounded-full"></div>
              <span>Your Location</span>
            </div>
          </div>
        </div>

      </div>

      {/* Nearby Attractions List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {attractions.map((attraction) => (
          <Card key={attraction.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{attraction.name}</h3>
                <Badge variant={getSafetyBadge(attraction.status)}>
                  {attraction.status}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Safety Score:</span>
                  <span className={`font-bold ${getSafetyColor(attraction.safetyScore)}`}>
                    {attraction.safetyScore}%
                  </span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{attraction.distance}</span>
                  <span>{attraction.travelTime}</span>
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleViewRoute(attraction.id)}
                    className="flex-1"
                  >
                    <Route className="h-4 w-4 mr-1" />
                    View Route
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleBookTicket(attraction.name)}
                    className="flex-1"
                  >
                    <BookOpen className="h-4 w-4 mr-1" />
                    Book Ticket
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};