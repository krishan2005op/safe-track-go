import { useState, useEffect } from "react";

interface CrowdHeatmapProps {
  siteName: string;
}

export const CrowdHeatmap = ({ siteName }: CrowdHeatmapProps) => {
  const [crowdData, setCrowdData] = useState({
    entrance: 65,
    courtyard: 85,
    exhibition: 45,
    gardens: 30,
    parking: 70
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCrowdData(prev => ({
        entrance: Math.max(20, Math.min(100, prev.entrance + (Math.random() - 0.5) * 10)),
        courtyard: Math.max(20, Math.min(100, prev.courtyard + (Math.random() - 0.5) * 8)),
        exhibition: Math.max(10, Math.min(90, prev.exhibition + (Math.random() - 0.5) * 12)),
        gardens: Math.max(10, Math.min(80, prev.gardens + (Math.random() - 0.5) * 15)),
        parking: Math.max(30, Math.min(100, prev.parking + (Math.random() - 0.5) * 6))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getCrowdColor = (density: number) => {
    if (density > 80) return "bg-danger";
    if (density > 60) return "bg-warning";
    if (density > 40) return "bg-primary";
    return "bg-safe";
  };

  const getCrowdLevel = (density: number) => {
    if (density > 80) return "Very High";
    if (density > 60) return "High";
    if (density > 40) return "Medium";
    return "Low";
  };

  return (
    <div className="space-y-4">
      {/* Heatmap Visualization */}
      <div className="relative bg-muted/20 rounded-lg p-6 min-h-[300px]">
        <div className="text-center mb-4">
          <h3 className="font-semibold text-sm text-muted-foreground">
            {siteName} - Zone Density Map
          </h3>
        </div>
        
        <div className="relative grid grid-cols-3 gap-4 h-48">
          {/* Entrance */}
          <div className="col-span-3 flex justify-center">
            <div 
              className={`w-24 h-12 rounded-lg ${getCrowdColor(crowdData.entrance)} opacity-80 flex items-center justify-center text-white text-xs font-semibold cursor-pointer hover:opacity-100 transition-opacity`}
              title={`Entrance: ${Math.round(crowdData.entrance)}% capacity`}
            >
              Entrance
            </div>
          </div>
          
          {/* Main areas */}
          <div 
            className={`h-20 rounded-lg ${getCrowdColor(crowdData.gardens)} opacity-80 flex items-center justify-center text-white text-xs font-semibold cursor-pointer hover:opacity-100 transition-opacity`}
            title={`Gardens: ${Math.round(crowdData.gardens)}% capacity`}
          >
            Gardens
          </div>
          <div 
            className={`h-20 rounded-lg ${getCrowdColor(crowdData.courtyard)} opacity-80 flex items-center justify-center text-white text-xs font-semibold cursor-pointer hover:opacity-100 transition-opacity`}
            title={`Main Courtyard: ${Math.round(crowdData.courtyard)}% capacity`}
          >
            Courtyard
          </div>
          <div 
            className={`h-20 rounded-lg ${getCrowdColor(crowdData.exhibition)} opacity-80 flex items-center justify-center text-white text-xs font-semibold cursor-pointer hover:opacity-100 transition-opacity`}
            title={`Exhibition: ${Math.round(crowdData.exhibition)}% capacity`}
          >
            Exhibition
          </div>
          
          {/* Parking */}
          <div className="col-span-3 flex justify-center">
            <div 
              className={`w-32 h-12 rounded-lg ${getCrowdColor(crowdData.parking)} opacity-80 flex items-center justify-center text-white text-xs font-semibold cursor-pointer hover:opacity-100 transition-opacity`}
              title={`Parking: ${Math.round(crowdData.parking)}% capacity`}
            >
              Parking Area
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-safe rounded"></div>
          <span>Low (0-40%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-primary rounded"></div>
          <span>Medium (40-60%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-warning rounded"></div>
          <span>High (60-80%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-danger rounded"></div>
          <span>Very High (80%+)</span>
        </div>
      </div>

      {/* Zone Details */}
      <div className="space-y-2">
        {Object.entries(crowdData).map(([zone, density]) => (
          <div key={zone} className="flex items-center justify-between py-2 px-3 bg-muted/30 rounded">
            <span className="capitalize text-sm font-medium">{zone.replace(/([A-Z])/g, ' $1')}</span>
            <div className="flex items-center gap-2">
              <div className="text-sm font-semibold">{Math.round(density)}%</div>
              <div className={`px-2 py-1 rounded text-xs ${getCrowdColor(density)} text-white`}>
                {getCrowdLevel(density)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};