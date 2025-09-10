export const SituationalAwareness = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="p-4 bg-safe/10 rounded-lg text-center">
        <div className="text-2xl font-bold text-safe">Online</div>
        <div className="text-sm">System Status</div>
      </div>
      <div className="p-4 bg-primary/10 rounded-lg text-center">
        <div className="text-2xl font-bold text-primary">4</div>
        <div className="text-sm">Teams Ready</div>
      </div>
    </div>
  );
};