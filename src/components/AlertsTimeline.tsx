import { Badge } from "@/components/ui/badge";

export const AlertsTimeline = () => {
  const alerts = [
    { time: "14:32", type: "Stampede Alert", status: "Active", color: "bg-danger" },
    { time: "14:15", type: "Medical Emergency", status: "Responding", color: "bg-warning" },
    { time: "13:45", type: "Weather Alert", status: "Resolved", color: "bg-safe" },
    { time: "13:20", type: "Crowd Warning", status: "Resolved", color: "bg-safe" },
  ];

  return (
    <div className="space-y-3">
      {alerts.map((alert, index) => (
        <div key={index} className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${alert.color}`}></div>
          <div className="flex-1">
            <div className="text-sm font-medium">{alert.type}</div>
            <div className="text-xs text-muted-foreground">{alert.time}</div>
          </div>
          <Badge variant={alert.status === "Active" ? "destructive" : "secondary"}>
            {alert.status}
          </Badge>
        </div>
      ))}
    </div>
  );
};