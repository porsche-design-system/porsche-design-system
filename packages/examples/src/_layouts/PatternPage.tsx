import type { ComponentChildren } from 'preact';
import { Head } from '../_partials/Head.tsx';
import { SkipLink } from '../_partials/SkipLink.tsx';

export type PatternPageProps = {
  /** `"../../"` for `patterns/<name>/index.page.tsx`. All URLs in the shell are built from it. */
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
  /**
   * Relative URL(s) of optional page scripts, loaded with `defer` – the only way behaviour reaches a pattern, since
   * nothing is hydrated. A pattern owns its header, so it also lists the header's script itself
   * (`"../../assets/header.js"`), which `BasePage` adds on its own.
   */
  pageScript?: string | string[];
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
 */
export const PatternPage = ({
  basePath,
  title,
  description,
  beforeMain,
  afterMain,
  pageScript,
  children,
}: PatternPageProps) => (
  <html lang="en">
    <head>
      <Head basePath={basePath} title={title} description={description} />
    </head>
    <body>
      <SkipLink />
      {beforeMain}
      {children}
      {afterMain}
      <p class="p-fluid-md">
        <a href={basePath}>Back to the overview</a>
      </p>
      {(typeof pageScript === 'string' ? [pageScript] : (pageScript ?? [])).map((src) => (
        <script key={src} src={src} defer />
      ))}
    </body>
  </html>
);
