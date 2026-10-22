import type { ExampleMeta } from '../../../../lib/meta.ts';
import { PatternPage } from '../../../_layouts/PatternPage.tsx';

/** How the example is presented – by the storefront, in StackBlitz and in the knowledge skill. */
export const meta: ExampleMeta = {
  title: 'Tile: Image Category',
  description:
    'An image category tile links to a category with a mood image, e.g. a model range on porsche.com. The image covers the whole tile, and a dark gradient at the bottom ensures the legibility of the heading next to an icon-only link. The link stretches its clickable area over the tile, and on hover the image zooms in, unless the user prefers reduced motion.',
};

/**
 * Tile pattern – a category with a mood image, built with HTML and Tailwind CSS instead of `p-tile`.
 *
 * The image lies behind the content via `-z-1`, within a layer that spans the tile and clips the zoom to its corners.
 * The tile itself doesn't clip, so the focus ring of the covering `p-link` is drawn around it; `isolate` keeps the
 * layers within the tile. The heading row carries the gradient: `bg-fade-to-t` fades from dark at the bottom to
 * transparent, and its top padding is the distance the gradient extends beyond the heading. `scheme-only-dark` renders
 * light content on the dark gradient, independent of the color scheme of the page.
 *
 * The page follows the color scheme of the user via `scheme-light-dark`, while `scheme-only-dark` keeps the tile dark,
 * since it lies on a dark gradient or background.
 */
const Page = () => (
  <PatternPage meta={meta} class="scheme-light-dark">
    <main id="main" class="grid-template content-center min-h-dvh py-fluid-lg">
      <div class="col-basic justify-self-center w-full max-w-[400px] group relative isolate grid aspect-square rounded-3xl scheme-only-dark [--p-link-cover-radius:var(--radius-3xl)]">
        <div class="absolute inset-0 -z-1 overflow-clip rounded-[inherit]">
          <img
            class="size-full object-cover motion-safe:transition-[scale] duration-md ease-in-out motion-safe:group-hover:scale-105"
            src="/examples/media/porsche-992-carrera-s.jpg"
            alt="Porsche 992 Carrera S"
            width="1728"
            height="664"
          />
        </div>
        <div class="self-end flex flex-wrap items-center gap-fluid-sm px-fluid-md pt-fluid-lg pb-fluid-md rounded-b-[inherit] bg-fade-to-t">
          <p-heading tag="h2" size="md" weight="semibold">
            911
          </p-heading>
          <p-link class="ms-auto" variant="secondary" icon="arrow-right" hide-label="true" compact="true" cover={true}>
            <a href="#">911</a>
          </p-link>
        </div>
      </div>
    </main>
  </PatternPage>
);

export default Page;
