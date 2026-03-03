export const TailwindcssGradient = () => {
  return (
    <div className="flex flex-wrap justify-center gap-fluid-md p-fluid-md bg-[radial-gradient(circle,rgba(238,174,202,1)_0%,rgba(148,187,233,1)_100%)]">
      <div className="bg-fade-to-t prose-text-sm text-white rounded-lg p-fluid-md">Gradient To Top</div>
      <div className="bg-fade-to-b prose-text-sm text-white rounded-lg p-fluid-md">Gradient To Bottom</div>
      <div className="bg-fade-to-l prose-text-sm text-white rounded-lg p-fluid-md">Gradient To Left</div>
      <div className="bg-fade-to-r prose-text-sm text-white rounded-lg p-fluid-md">Gradient To Right</div>
    </div>
  );
};
