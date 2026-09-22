type HeadProps = {
  title: string;
  description: string;
};

/**
 * Everything inside `<head>` that is identical on every page.
 *
 * There is no stylesheet link: a page loads `main.js`, and that entry imports its `style.css` – the shape a Vite
 * project expects, so the generated projects bundle, hash and link the CSS themselves.
 *
 * The `robots` meta tag keeps the demos out of search results, which is what the examples repository shipped a
 * `robots.txt` for. A `robots.txt` cannot do that here: it is only ever read at the **origin root**, and the projects
 * are served from a path (`…github.io/examples/v4/patterns/…`), so the one that repository shipped has never been
 * fetched by a crawler. The meta tag is honoured wherever a page is served, which also keeps it independent of where
 * the projects are eventually deployed.
 */
export const Head = ({ title, description }: HeadProps) => (
  <>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex" />
    <title>{title} | Dummy Patterns</title>
    <meta name="description" content={description} />
  </>
);
