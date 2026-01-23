export const TailwindcssTypography = () => {
  return (
    <>
      <div className="flex flex-col items-start gap-fluid-md p-fluid-md">
        <h1 className="prose-display-lg m-0">Display lg</h1>
        <h2 className="prose-display-md m-0">Display md</h2>
        <h2 className="prose-display-sm m-0">Display sm</h2>
      </div>
      <div className="flex flex-col items-start gap-fluid-md p-fluid-md">
        <h2 className="prose-heading-2xl m-0">Heading 2xl</h2>
        <h3 className="prose-heading-xl m-0">Heading xl</h3>
        <h4 className="prose-heading-lg m-0">Heading lg</h4>
        <h5 className="prose-heading-md m-0">Heading md</h5>
        <h6 className="prose-heading-sm m-0">Heading sm</h6>
      </div>
      <div className="flex flex-col items-start gap-fluid-md p-fluid-md">
        <p className="prose-text-xl m-0">text xl</p>
        <p className="prose-text-lg m-0">text lg</p>
        <p className="prose-text-md m-0">text md</p>
        <p className="prose-text-sm m-0">text sm</p>
        <p className="prose-text-xs m-0">text xs</p>
        <p className="prose-text-2xs m-0">text 2xs</p>
      </div>
    </>
  );
};
