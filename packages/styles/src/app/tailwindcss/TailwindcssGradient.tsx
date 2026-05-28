export const TailwindcssGradient = () => {
  return (
    <div className="tw:flex tw:flex-wrap tw:justify-center tw:gap-fluid-md tw:p-fluid-md tw:bg-[radial-gradient(circle,rgba(238,174,202,1)_0%,rgba(148,187,233,1)_100%)]">
      <div className="tw:bg-fade-to-t tw:prose-text-sm tw:text-white tw:rounded-lg tw:p-fluid-md">Gradient To Top</div>
      <div className="tw:bg-fade-to-b tw:prose-text-sm tw:text-white tw:rounded-lg tw:p-fluid-md">
        Gradient To Bottom
      </div>
      <div className="tw:bg-fade-to-l tw:prose-text-sm tw:text-white tw:rounded-lg tw:p-fluid-md">Gradient To Left</div>
      <div className="tw:bg-fade-to-r tw:prose-text-sm tw:text-white tw:rounded-lg tw:p-fluid-md">
        Gradient To Right
      </div>
    </div>
  );
};
