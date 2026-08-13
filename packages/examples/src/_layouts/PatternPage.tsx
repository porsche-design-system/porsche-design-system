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
  /** Notes about the pattern, rendered inside `<main>` below the heading. */
  children?: ComponentChildren;
};

/**
 * Shell for a pattern: a single section shown in isolation, in its real place on a page.
 *
 * `BasePage` cannot be reused here, because it ships the very chrome a pattern demonstrates – a header pattern
 * inside its `<main>` would be a section nested in a page that already has one. So this layout deliberately keeps
 * the surroundings to a minimum: a skip link, the pattern, and a `<main>` describing it.
 */
export const PatternPage = ({ basePath, title, description, beforeMain, afterMain, children }: PatternPageProps) => (
  <html lang="en">
    <head>
      <Head basePath={basePath} title={title} description={description} />
    </head>
    <body>
      <SkipLink />
      {beforeMain}
      <main id="main" class="flex flex-col gap-6">
        <h1 class="text-4xl font-bold">{title}</h1>
        <p class="max-w-2xl text-fg-muted">{description}</p>
        {children}
        <p>
          <a class="underline underline-offset-4" href={`${basePath}patterns/`}>
            Back to all patterns
          </a>
        </p>
      </main>
      {afterMain}
    </body>
  </html>
);
