export const TailwindcssBorder = () => {
  return (
    <div className="flex flex-col gap-fluid-md p-static-md">
      <div className="grid gap-fluid-md prose-text-sm">
        <div className="rounded-sm border p-fluid-sm">Border Radius Small</div>
        <div className="rounded-md border p-fluid-sm">Border Radius Medium</div>
        <div className="rounded-lg border p-fluid-sm">Border Radius Large</div>
      </div>
      <div className="grid gap-fluid-md prose-text-sm">
        <div className="border-thin p-fluid-sm">Border Width Thin</div>
        <div className="border-regular p-fluid-sm">Border Width Regular</div>
      </div>
    </div>
  );
};
