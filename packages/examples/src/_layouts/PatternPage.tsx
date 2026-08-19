import type { ComponentChildren } from 'preact';
import { Head } from '../_partials/Head.tsx';
import { SkipLink } from '../_partials/SkipLink.tsx';

export type PatternPageProps = {
  /**
   * Path back to the root of the generated project: `"../../"` for `patterns/header/overlay`, `"../"` for
   * `patterns/footer`. That root holds the overview of the category, which is the only link the layout renders.
   */
  basePath: string;
  title: string;
  description: string;
  /**
   * The pattern itself, when it belongs above the content – a header, for example, which then provides the page's
   * banner landmark.
   */
  beforeMain?: ComponentChildren;
  /** The pattern itself, when it belongs below the content – a footer, for example. */
  afterMain?: ComponentChildren;
  /** The page content, including its own `<main id="main">`. The layout does not wrap it: a pattern is shown in the
   * place it occupies on a real page, and a header pattern needs a full-bleed hero below it, not a padded shell.
   */
  children?: ComponentChildren;
};

/**
 * Shell for a pattern: a single section shown in isolation, in its real place on a page.
 *
 * `BasePage` cannot be reused here, because it ships the very chrome a pattern demonstrates – a header pattern
 * inside its `<main>` would be a section nested in a page that already has one. So this layout deliberately keeps
 * the surroundings to a minimum: the skip link every page needs, the pattern, the page's own `<main>`, and the way
 * back to the overview.
 *
 * Like `BasePage` it references one script, `main.js`, which is generated next to the page.
 */
export const PatternPage = ({ basePath, title, description, beforeMain, afterMain, children }: PatternPageProps) => (
  <html lang="en">
    <head>
      <Head title={title} description={description} />
    </head>
    <body>
      <SkipLink />
      {beforeMain}
      {children}
      {afterMain}
      <p class="p-fluid-md">
        <a class="font-semibold underline underline-offset-4" href={basePath}>
          Back to the overview
        </a>
      </p>
      <script type="module" src="main.js" />
    </body>
  </html>
);
