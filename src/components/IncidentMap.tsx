interface IncidentMapProps {
  alerts: any[];
}

export const IncidentMap = ({ alerts }: IncidentMapProps) => {
  return (
    <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-4 h-64 border">
      <div className="text-center text-muted-foreground">
        Interactive incident map with real-time locations
      </div>
      {alerts.map((_, index) => (
        <div
          key={index}
          className="absolute w-4 h-4 bg-danger rounded-full animate-pulse"
          style={{
            left: `${20 + index * 15}%`,
            top: `${30 + index * 10}%`,
          }}
        ></div>
      ))}
    </div>
  );
};