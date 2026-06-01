export const TailwindcssBorder = () => {
  return (
    <div className="tw:flex tw:flex-col tw:gap-fluid-md tw:p-static-md">
      <div className="tw:grid tw:gap-fluid-md tw:prose-text-sm">
        <div className="tw:rounded-xs tw:border tw:p-fluid-md">Border Radius X-Small</div>
        <div className="tw:rounded-sm tw:border tw:p-fluid-md">Border Radius Small</div>
        <div className="tw:rounded-md tw:border tw:p-fluid-md">Border Radius Medium</div>
        <div className="tw:rounded-lg tw:border tw:p-fluid-md">Border Radius Large</div>
        <div className="tw:rounded-xl tw:border tw:p-fluid-md">Border Radius X-Large</div>
        <div className="tw:rounded-2xl tw:border tw:p-fluid-md">Border Radius 2X-Large</div>
        <div className="tw:rounded-3xl tw:border tw:p-fluid-md">Border Radius 3X-Large</div>
        <div className="tw:rounded-4xl tw:border tw:p-fluid-md">Border Radius 4X-Large</div>
        <div className="tw:rounded-full tw:border tw:p-fluid-md">Border Radius Full</div>
      </div>
    </div>
  );
};
