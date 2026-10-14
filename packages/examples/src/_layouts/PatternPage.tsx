import type { ComponentChildren } from 'preact';
import type { ExampleMeta } from '../../lib/meta.ts';
import { Head } from '../_partials/Head.tsx';

export type PatternPageProps = {
  /** The `meta` the page exports – its title and description are the ones of the document as well. */
  meta: ExampleMeta;
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
 * Like `TemplatePage` it ships no chrome, because the chrome is what a pattern demonstrates – a header pattern inside
 * a page that already has a header would be a banner nested in a banner. So this layout deliberately keeps the
 * surroundings to a minimum: the pattern and the page's own `<main>`, and nothing else.
 *
 * Like `TemplatePage` it references no script – the build links the generated `main.js`.
 */
export const PatternPage = ({ meta, beforeMain, afterMain, children }: PatternPageProps) => (
  <html lang="en">
    <head>
      <Head title={meta.title} description={meta.description} />
    </head>
    <body>
      {beforeMain}
      {children}
      {afterMain}
    </body>
  </html>
);
