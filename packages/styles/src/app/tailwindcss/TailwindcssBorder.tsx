export const TailwindcssBorder = () => {
  return (
    <div className="flex flex-col gap-fluid-md p-static-md">
      <div className="grid gap-fluid-md prose-text-sm">
        <div className="rounded-xs border p-fluid-md">Border Radius X-Small</div>
        <div className="rounded-sm border p-fluid-md">Border Radius Small</div>
        <div className="rounded-md border p-fluid-md">Border Radius Medium</div>
        <div className="rounded-lg border p-fluid-md">Border Radius Large</div>
        <div className="rounded-xl border p-fluid-md">Border Radius X-Large</div>
        <div className="rounded-2xl border p-fluid-md">Border Radius 2X-Large</div>
        <div className="rounded-3xl border p-fluid-md">Border Radius 3X-Large</div>
        <div className="rounded-4xl border p-fluid-md">Border Radius 4X-Large</div>
        <div className="rounded-full border p-fluid-md">Border Radius Full</div>
      </div>
    </div>
  );
};
