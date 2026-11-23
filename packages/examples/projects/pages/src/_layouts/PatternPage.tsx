import type { ComponentChildren } from 'preact';
import type { ExampleMeta } from '../../lib/meta.ts';
import { Head } from '../_partials/Head.tsx';

export type PatternPageProps = {
  /** The `meta` the page exports – its title and description are the ones of the document as well. */
  meta: ExampleMeta;
  /**
   * The background color of the page, `canvas` by default. `surface` suits a pattern placed on a surface, such as a
   * tile that sets itself off from it with the canvas color.
   */
  background?: 'canvas' | 'surface';
  /**
   * Centers the content vertically in the viewport while it is shorter – for a pattern that stands on its own, such as
   * a tile. Taller content starts at the top and scrolls as usual. Set on `<body>`, since `grid-template` uses
   * `box-sizing: content-box`, and a minimum height on a padded `<main>` would add its padding to the viewport height.
   */
  centered?: boolean;
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
 * The page background is a color of the color scheme, as on a real page – a pattern built for the dark scheme as well
 * would otherwise put light text on the white default of the browser. It is set on `<body>`, so it fills the viewport
 * however short the pattern is.
 *
 * Like `TemplatePage` it references no script – the build links the generated `main.js`.
 */
export const PatternPage = ({
  meta,
  background = 'canvas',
  centered = false,
  beforeMain,
  afterMain,
  children,
}: PatternPageProps) => (
  <html lang="en">
    <head>
      <Head title={meta.title} description={meta.description} siteName="Dummy Patterns" />
    </head>
    {/* Spelled out, so Tailwind finds every class. */}
    <body
      class={[background === 'surface' ? 'bg-surface' : 'bg-canvas', centered && 'grid content-center min-h-dvh']
        .filter(Boolean)
        .join(' ')}
    >
      {beforeMain}
      {children}
      {afterMain}
    </body>
  </html>
);
