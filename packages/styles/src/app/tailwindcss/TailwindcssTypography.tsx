export const TailwindcssTypography = () => {
  const content = 'The quick brown fox jumps over the lazy dog';
  return (
    <>
      <div className="flex flex-col items-start gap-fluid-md p-fluid-md">
        <h3 className="prose-heading-md m-0">Display</h3>
        <h1 className="prose-display-lg m-0">{content}</h1>
        <h2 className="prose-display-md m-0">{content}</h2>
        <h2 className="prose-display-sm m-0">{content}</h2>
      </div>
      <div className="flex flex-col items-start gap-fluid-md p-fluid-md">
        <h3 className="prose-heading-md m-0">Heading</h3>
        <h2 className="prose-heading-2xl m-0">{content}</h2>
        <h3 className="prose-heading-xl m-0">{content}</h3>
        <h4 className="prose-heading-lg m-0">{content}</h4>
        <h5 className="prose-heading-md m-0">{content}</h5>
        <h6 className="prose-heading-sm m-0">{content}</h6>
      </div>
      <div className="flex flex-col items-start gap-fluid-md p-fluid-md">
        <h3 className="prose-heading-md m-0">Text</h3>
        <p className="prose-text-xl m-0">{content}</p>
        <p className="prose-text-lg m-0">{content}</p>
        <p className="prose-text-md m-0">{content}</p>
        <p className="prose-text-sm m-0">{content}</p>
        <p className="prose-text-xs m-0">{content}</p>
        <p className="prose-text-2xs m-0">{content}</p>
      </div>
    </>
  );
};
