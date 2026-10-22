import type { ExampleMeta } from '../../../../lib/meta.ts';
import { PatternPage } from '../../../_layouts/PatternPage.tsx';

const label = 'Weekender';

/** How the example is presented – by the storefront, in StackBlitz and in the knowledge skill. */
export const meta: ExampleMeta = {
  title: 'Tile: Product Teaser',
  description:
    'A product teaser links to a product with a branded background color, e.g. within a product category of porsche.com. The product image takes up half of the tile, heading and text the other half, and a compact icon-only link sits at the top. The link stretches its clickable area over the tile, and on hover the image zooms in, unless the user prefers reduced motion. Make sure a custom background color provides sufficient contrast for the content.',
};

/**
 * Tile pattern – a product with a branded background color, built with HTML and Tailwind CSS instead of `p-tile`.
 *
 * The tile is a grid of two equal columns below a row for the link, which spans both, so heading and text keep half
 * of the width next to the image on small viewports. `bg-[#341f2e]` sets the brand color, and `scheme-only-dark` renders
 * light content on it, independent of the color scheme of the page.
 *
 * The image fills the height of its cell via `grow basis-0 min-h-0` within a column wrapper, which keeps it from
 * increasing the height of the tile, and `object-contain` centers it within the cell. `hyphens="auto"` lets the
 * heading break when the tile gets narrow.
 *
 * The page follows the color scheme of the user via `scheme-light-dark`, while `scheme-only-dark` keeps the tile dark,
 * since it lies on a dark gradient or background.
 */
const Page = () => (
  <PatternPage meta={meta} class="scheme-light-dark">
    <main id="main" class="grid-template content-center min-h-dvh py-fluid-lg">
      <div class="col-basic justify-self-center w-full max-w-[560px] group relative isolate grid grid-cols-2 grid-rows-[auto_1fr] gap-fluid-sm aspect-video rounded-3xl bg-[#341f2e] p-fluid-md scheme-only-dark [--p-link-cover-radius:var(--radius-3xl)]">
        <p-link
          class="col-span-2 justify-self-end"
          variant="secondary"
          icon="arrow-up-right"
          hide-label="true"
          compact="true"
          cover={true}
        >
          <a href="#">{label}</a>
        </p-link>
        <div class="flex flex-col">
          <img
            class="grow basis-0 min-h-0 w-full object-contain motion-safe:transition-[scale] duration-md ease-in-out motion-safe:group-hover:scale-105"
            src="/examples/media/weekender.webp"
            alt=""
            width="960"
            height="1080"
          />
        </div>
        <div class="self-center flex flex-col gap-static-sm">
          <p-heading tag="h2" size="lg" hyphens="auto">
            {label}
          </p-heading>
          <p-text color="contrast-high">A timeless companion for short trips</p-text>
        </div>
      </div>
    </main>
  </PatternPage>
);

export default Page;
