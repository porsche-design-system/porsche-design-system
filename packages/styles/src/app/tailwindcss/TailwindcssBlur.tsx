export const TailwindcssBlur = () => {
  return (
    <div className="tw:grid tw:prose-text-sm">
      <img src="/lights.jpg" className="tw:col-1 tw:row-1 tw:w-full tw:h-[600px] tw:object-cover" alt="" />
      <div className="tw:backdrop-blur-frosted tw:bg-frosted tw:col-1 tw:row-1 tw:rounded-lg tw:m-fluid-lg tw:p-fluid-sm tw:grid tw:place-items-center">
        <p className="tw:text-white">Blur</p>
      </div>
    </div>
  );
};
