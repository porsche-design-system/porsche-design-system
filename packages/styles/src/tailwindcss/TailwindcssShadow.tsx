export const TailwindcssShadow = () => {
  return (
    <div className="flex flex-wrap justify-center gap-fluid-md p-fluid-md">
      <h3 className="prose-heading-md text-center w-full m-0">Drop Shadow</h3>
      <div className="shadow-low prose-text-sm bg-surface-light p-fluid-md rounded-lg">Low</div>
      <div className="shadow-medium prose-text-sm bg-surface-light p-fluid-md rounded-lg">Medium</div>
      <div className="shadow-high prose-text-sm bg-surface-light p-fluid-md rounded-lg">High</div>
    </div>
  );
};
