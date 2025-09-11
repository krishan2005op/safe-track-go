interface IncidentMapProps {
  alerts: { id: number; x: number; y: number; description: string }[];
}

export const IncidentMap = ({ alerts }: IncidentMapProps) => {
  return (
    <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-4 h-96 border">
      <h2 className="font-semibold text-lg mb-2">Incident Tracking Prototype</h2>
      <p className="text-sm text-muted-foreground mb-2">
        Simulated incident zones with alert markers
      </p>

      {/* Prototype grid background */}
      <div className="relative w-full h-80 bg-gray-100 rounded-lg grid grid-cols-8 grid-rows-6">
        {/* Zones for better visualization */}
        <div className="absolute top-6 left-10 w-44 h-20 bg-red-200 border border-red-500 rounded-lg flex flex-col items-center justify-center">
          <span className="font-semibold text-red-800">Cliff Edge</span>
          <span className="mt-1 px-3 py-0.5 bg-white rounded-full text-xs font-medium text-gray-700">High</span>
          {/* Red dots inside Cliff Edge */}
          <div
            className="absolute w-4 h-4 bg-red-600 rounded-full animate-pulse border-2 border-white shadow-md"
            style={{ left: '15%', top: '40%' }}
            title="Alert 1"
          ></div>
          <div
            className="absolute w-4 h-4 bg-red-600 rounded-full animate-pulse border-2 border-white shadow-md"
            style={{ left: '35%', top: '60%' }}
            title="Alert 2"
          ></div>
        </div>

        <div className="absolute top-6 right-10 w-40 h-24 bg-red-200 border border-red-500 rounded-lg flex flex-col items-center justify-center">
          <span className="font-semibold text-red-800">Weather Alert Zone</span>
          <span className="mt-1 px-3 py-0.5 bg-white rounded-full text-xs font-medium text-gray-700">Critical</span>
          {/* Red dots inside Weather Alert Zone */}
          <div
            className="absolute w-4 h-4 bg-red-600 rounded-full animate-pulse border-2 border-white shadow-md"
            style={{ left: '20%', top: '50%' }}
            title="Alert 3"
          ></div>
          <div
            className="absolute w-4 h-4 bg-red-600 rounded-full animate-pulse border-2 border-white shadow-md"
            style={{ left: '50%', top: '30%' }}
            title="Alert 4"
          ></div>
        </div>

        <div className="absolute top-20 left-44 w-44 h-24 bg-yellow-200 border border-yellow-500 rounded-lg flex flex-col items-center justify-center">
          <span className="font-semibold text-yellow-800">Rocky Terrain</span>
          <span className="mt-1 px-3 py-0.5 bg-white rounded-full text-xs font-medium text-gray-700">Medium</span>
          {/* Red dots inside Rocky Terrain */}
          <div
            className="absolute w-4 h-4 bg-red-600 rounded-full animate-pulse border-2 border-white shadow-md"
            style={{ left: '30%', top: '40%' }}
            title="Alert 5"
          ></div>
        </div>

        <div className="absolute top-28 left-20 w-48 h-20 bg-green-200 border border-green-500 rounded-lg flex flex-col items-center justify-center">
          <span className="font-semibold text-green-800">Trail Path</span>
          <span className="mt-1 px-3 py-0.5 bg-white rounded-full text-xs font-medium text-gray-700">Low</span>
          {/* Red dots inside Trail Path */}
          <div
            className="absolute w-4 h-4 bg-red-600 rounded-full animate-pulse border-2 border-white shadow-md"
            style={{ left: '40%', top: '50%' }}
            title="Alert 6"
          ></div>
        </div>

        <div className="absolute top-40 left-32 w-36 h-16 bg-green-200 border border-green-500 rounded-lg flex flex-col items-center justify-center">
          <span className="font-semibold text-green-800">Base Camp</span>
          <span className="mt-1 px-3 py-0.5 bg-white rounded-full text-xs font-medium text-gray-700">Safe</span>
          {/* Red dots inside Base Camp */}
          <div
            className="absolute w-4 h-4 bg-red-600 rounded-full animate-pulse border-2 border-white shadow-md"
            style={{ left: '50%', top: '50%' }}
            title="Alert 7"
          ></div>
        </div>

        {/* Existing alerts placed as red dots */}
        {alerts.map((alert) => (
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
      </div>

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
