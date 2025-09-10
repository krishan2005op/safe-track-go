export const AIAnomalyChart = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <span className="text-safe">Normal Patterns: 87%</span>
        <span className="text-danger">Anomalies: 13%</span>
      </div>
      <div className="h-32 bg-gradient-to-r from-safe/20 to-danger/20 rounded flex items-end">
        {[65, 78, 82, 95, 45, 88, 76].map((height, i) => (
          <div key={i} className="flex-1 bg-primary/60 mr-1" style={{ height: `${height}%` }}></div>
        ))}
      </div>
    </div>
  );
};