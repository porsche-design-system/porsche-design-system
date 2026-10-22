import type { ExampleMeta } from '../../../../lib/meta.ts';
import { PatternPage } from '../../../_layouts/PatternPage.tsx';

/** How the example is presented – by the storefront, in StackBlitz and in the knowledge skill. */
export const meta: ExampleMeta = {
  title: 'Tile: Category',
  description:
    'A category tile links to a category of a shop, e.g. vehicle accessories of the Porsche Shop. The heading and an icon-only link sit at the top, the cut-out product image fills the rest of the tile up to its edges. The link stretches its clickable area over the tile, and on hover the image zooms in, unless the user prefers reduced motion.',
};

/**
 * Tile pattern – a shop category, built with HTML and Tailwind CSS instead of `p-tile`.
 *
 * Two elements, because the clipping and the focus ring would otherwise exclude each other. The outer one is the
 * positioned ancestor `cover` of `p-link` stretches its clickable area over, and draws the focus ring of the link
 * around itself; `[--p-link-cover-radius:…]` gives that ring the corner radius of the tile. The inner one clips the
 * zooming image to the corners via `overflow-clip`. It isn't positioned itself, so it doesn't clip the covering link,
 * which belongs to the outer one.
 *
 * The image fills the space below the heading via `grow basis-0 min-h-0` without increasing the height of the tile,
 * and `object-top` keeps its upper part visible.
 *
 * The page follows the color scheme of the user via `scheme-light-dark`, while `scheme-only-light` keeps the tile
 * light: the dark vehicle of its cut-out image would hardly stand out from a dark surface.
 */
const Page = () => (
  <PatternPage meta={meta} class="scheme-light-dark">
    <main id="main" class="grid-template content-center min-h-dvh py-fluid-lg">
      <div class="col-basic justify-self-center w-full max-w-[400px] group relative isolate rounded-3xl scheme-only-light [--p-link-cover-radius:var(--radius-3xl)]">
        <div class="flex flex-col gap-fluid-lg aspect-3/4 overflow-clip rounded-[inherit] bg-surface pt-fluid-md">
          <div class="flex flex-wrap items-center gap-fluid-sm px-fluid-md">
            <p-heading tag="h2" size="md" weight="semibold">
              Vehicle Accessories
            </p-heading>
            <p-link
              class="ms-auto"
              variant="secondary"
              icon="arrow-right"
              hide-label="true"
              compact="true"
              cover={true}
            >
              <a href="#">Vehicle Accessories</a>
            </p-link>
          </div>
          <img
            class="grow basis-0 min-h-0 w-full object-cover object-top motion-safe:transition-[scale] duration-md ease-in-out motion-safe:group-hover:scale-105"
            src="/examples/media/roof-box-on-a-car.webp"
            alt="Porsche vehicle with roof box"
            width="1080"
            height="1082"
          />
        </div>
      </div>
    </main>
  </PatternPage>
);

export default Page;
