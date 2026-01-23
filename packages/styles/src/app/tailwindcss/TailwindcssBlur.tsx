export const TailwindcssBlur = () => {
  return (
    <div className="grid prose-text-sm">
      <img src="/lights.jpg" className="col-1 row-1 w-full h-[600px] object-cover" alt="" />
      <div className="backdrop-blur-frosted bg-frosted col-1 row-1 rounded-lg m-fluid-lg p-fluid-sm grid place-items-center">
        <p className="text-white">Blur</p>
      </div>
    </div>
  );
};
