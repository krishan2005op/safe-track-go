import { useState, useEffect } from "react";

interface SafetyChartProps {
  type: "hourly" | "weekly";
}

export const SafetyChart = ({ type }: SafetyChartProps) => {
  const [data, setData] = useState<number[]>([]);

  useEffect(() => {
    // Generate sample data based on chart type
    if (type === "hourly") {
      // 24 hours of data
      setData([
        85, 87, 89, 92, 90, 88, 86, 82, 78, 75, 
        73, 71, 74, 76, 79, 82, 85, 88, 91, 89, 
        87, 85, 83, 84
      ]);
    } else {
      // 7 days of data
      setData([78, 82, 85, 88, 91, 87, 89]);
    }
  }, [type]);

  const labels = type === "hourly" 
    ? ["00", "02", "04", "06", "08", "10", "12", "14", "16", "18", "20", "22"]
    : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const getBarColor = (value: number) => {
    if (value >= 85) return "bg-safe";
    if (value >= 70) return "bg-warning";
    return "bg-danger";
  };

  const maxValue = Math.max(...data);
  const getBarHeight = (value: number) => (value / maxValue) * 100;

  return (
    <div className="space-y-4">
      {/* Chart */}
      <div className="chart-container">
        <div className="flex items-end justify-between h-32 gap-1">
          {data.map((value, index) => {
            // Show every other label for hourly chart to avoid crowding
            const shouldShowLabel = type === "weekly" || index % 2 === 0;
            const labelIndex = type === "weekly" ? index : Math.floor(index / 2);
            
            return (
              <div key={index} className="flex flex-col items-center flex-1">
                <div
                  className={`w-full ${getBarColor(value)} rounded-t transition-all duration-500 hover:opacity-80 cursor-pointer`}
                  style={{ height: `${getBarHeight(value)}%` }}
                  title={`${type === "weekly" ? labels[index] : `${String(index).padStart(2, '0')}:00`}: ${value}%`}
                ></div>
                {shouldShowLabel && (
                  <span className="text-xs text-muted-foreground mt-1">
                    {labels[labelIndex] || ""}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Current Value */}
      <div className="flex justify-between items-center">
        <span className="text-sm text-muted-foreground">
          {type === "hourly" ? "Current Hour" : "Today"} Safety Score
        </span>
        <span className={`text-lg font-bold ${getBarColor(data[data.length - 1])} bg-transparent`}>
          {data[data.length - 1]}%
        </span>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-sm text-muted-foreground">Average</div>
          <div className="font-semibold">
            {Math.round(data.reduce((a, b) => a + b, 0) / data.length)}%
          </div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground">Peak</div>
          <div className="font-semibold text-safe">{Math.max(...data)}%</div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground">Low</div>
          <div className="font-semibold text-warning">{Math.min(...data)}%</div>
        </div>
      </div>

      {/* Trend Indicator */}
      <div className="p-3 bg-muted/30 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="text-sm">
            {type === "hourly" ? "24-hour" : "7-day"} Trend
          </span>
          <span className={`text-sm font-semibold ${
            data[data.length - 1] > data[data.length - 2] 
              ? "text-safe" 
              : "text-warning"
          }`}>
            {data[data.length - 1] > data[data.length - 2] ? "↗ Improving" : "↘ Declining"}
          </span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-4 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-2 bg-safe rounded"></div>
          <span>Safe (85%+)</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-2 bg-warning rounded"></div>
          <span>Caution (70-84%)</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-2 bg-danger rounded"></div>
          <span>Risk (&lt;70%)</span>
        </div>
      </div>
    </div>
  );
};