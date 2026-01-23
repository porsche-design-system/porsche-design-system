export const TailwindcssSpacing = () => {
  return (
    <>
      <div className="flex flex-wrap items-start justify-center gap-fluid-md p-fluid-md">
        <h3 className="prose-heading-md text-primary-light text-center w-full m-0">Spacing Fluid (XS - XXL)</h3>
        <div className="prose-text-xs bg-contrast-low-light w-fluid-xs h-fluid-xs"></div>
        <div className="prose-text-xs bg-contrast-low-light w-fluid-sm h-fluid-sm"></div>
        <div className="prose-text-xs bg-contrast-low-light w-fluid-md h-fluid-md"></div>
        <div className="prose-text-xs bg-contrast-low-light w-fluid-lg h-fluid-lg"></div>
        <div className="prose-text-xs bg-contrast-low-light w-fluid-xl h-fluid-xl"></div>
        <div className="prose-text-xs bg-contrast-low-light w-fluid-2xl h-fluid-2xl"></div>
      </div>
      <div className="flex flex-wrap items-start justify-center gap-fluid-md p-fluid-md">
        <h3 className="prose-heading-md text-primary-light text-center w-full m-0">Spacing Static (XS - XXL)</h3>
        <div className="prose-text-xs bg-contrast-low-light w-static-xs h-static-xs"></div>
        <div className="prose-text-xs bg-contrast-low-light w-static-sm h-static-sm"></div>
        <div className="prose-text-xs bg-contrast-low-light w-static-md h-static-md"></div>
        <div className="prose-text-xs bg-contrast-low-light w-static-lg h-static-lg"></div>
        <div className="prose-text-xs bg-contrast-low-light w-static-xl h-static-xl"></div>
        <div className="prose-text-xs bg-contrast-low-light w-static-2xl h-static-2xl"></div>
      </div>
    </>
  );
};
