export const TailwindcssMotion = () => {
  return (
    <div className="grid gap-fluid-md p-static-md prose-text-sm">
      <div className="duration-sm transition-transform transform hover:scale-120 rounded-lg bg-surface p-fluid-sm">
        Duration Small
      </div>
      <div className="duration-md transition-transform transform hover:scale-120 rounded-lg bg-surface p-fluid-sm">
        Duration Medium
      </div>
      <div className="duration-lg transition-transform transform hover:scale-120 rounded-lg bg-surface p-fluid-sm">
        Duration Large
      </div>
      <div className="duration-xl transition-transform transform hover:scale-120 rounded-lg bg-surface p-fluid-sm">
        Duration X-Large
      </div>
      <div className="ease-in-out transition-transform duration-very-long transform hover:scale-120 rounded-lg bg-surface p-fluid-sm">
        Ease In Out
      </div>
      <div className="ease-in transition-transform duration-very-long transform hover:scale-120 rounded-lg bg-surface p-fluid-sm">
        Ease In
      </div>
      <div className="ease-out transition-transform duration-very-long transform hover:scale-120 rounded-lg bg-surface p-fluid-sm">
        Ease Out
      </div>
    </div>
  );
};
