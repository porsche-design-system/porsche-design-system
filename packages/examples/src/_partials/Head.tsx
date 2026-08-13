type HeadProps = {
  /** `"./"` at the root, `"../"` one level down – asset URLs resolve against the page, not against this file. */
  basePath: string;
  title: string;
  description: string;
};

/** Everything inside `<head>` that is identical on every page. */
export const Head = ({ basePath, title, description }: HeadProps) => (
  <>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title} | Dummy Patterns</title>
    <meta name="description" content={description} />
    <link rel="stylesheet" href={`${basePath}assets/patterns.css`} />
  </>
);
