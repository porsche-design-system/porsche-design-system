type HeadProps = {
  title: string;
  description: string;
};

/**
 * Everything inside `<head>` that is identical on every page.
 *
 * There is no stylesheet link: a page loads `main.js`, and that entry imports its `style.css` – the shape a Vite
 * project expects, so the generated projects bundle, hash and link the CSS themselves.
 */
export const Head = ({ title, description }: HeadProps) => (
  <>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title} | Dummy Patterns</title>
    <meta name="description" content={description} />
  </>
);
