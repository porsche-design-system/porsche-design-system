export const TailwindcssMotion = () => {
  return (
    <div className="grid gap-fluid-md p-static-md prose-text-sm">
      <div className="duration-short transition-transform transform hover:scale-120 rounded-lg bg-surface p-fluid-sm">
        Duration Short
      </div>
      <div className="duration-moderate transition-transform transform hover:scale-120 rounded-lg bg-surface p-fluid-sm">
        Duration Moderate
      </div>
      <div className="duration-long transition-transform transform hover:scale-120 rounded-lg bg-surface p-fluid-sm">
        Duration Long
      </div>
      <div className="duration-very-long transition-transform transform hover:scale-120 rounded-lg bg-surface p-fluid-sm">
        Duration Very Long
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
