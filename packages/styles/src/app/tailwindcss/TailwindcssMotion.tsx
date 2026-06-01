export const TailwindcssMotion = () => {
  return (
    <div className="tw:grid tw:gap-fluid-md tw:p-static-md tw:prose-text-sm">
      <div className="tw:duration-sm tw:transition-transform tw:transform tw:hover:scale-120 tw:rounded-lg tw:bg-surface tw:p-fluid-sm">
        Duration Small
      </div>
      <div className="tw:duration-md tw:transition-transform tw:transform tw:hover:scale-120 tw:rounded-lg tw:bg-surface tw:p-fluid-sm">
        Duration Medium
      </div>
      <div className="tw:duration-lg tw:transition-transform tw:transform tw:hover:scale-120 tw:rounded-lg tw:bg-surface tw:p-fluid-sm">
        Duration Large
      </div>
      <div className="tw:duration-xl tw:transition-transform tw:transform tw:hover:scale-120 tw:rounded-lg tw:bg-surface tw:p-fluid-sm">
        Duration X-Large
      </div>
      <div className="tw:ease-in-out tw:transition-transform duration-very-long tw:transform tw:hover:scale-120 tw:rounded-lg tw:bg-surface tw:p-fluid-sm">
        Ease In Out
      </div>
      <div className="tw:ease-in tw:transition-transform duration-very-long tw:transform tw:hover:scale-120 tw:rounded-lg tw:bg-surface tw:p-fluid-sm">
        Ease In
      </div>
      <div className="tw:ease-out tw:transition-transform duration-very-long tw:transform tw:hover:scale-120 tw:rounded-lg tw:bg-surface tw:p-fluid-sm">
        Ease Out
      </div>
    </div>
  );
};
