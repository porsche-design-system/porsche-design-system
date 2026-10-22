import type { ExampleMeta } from '../../../../lib/meta.ts';
import { PatternPage } from '../../../_layouts/PatternPage.tsx';

/** How the example is presented – by the storefront, in StackBlitz and in the knowledge skill. */
export const meta: ExampleMeta = {
  title: 'Tile: Model Teaser',
  description:
    'A model teaser introduces a model range with its starting price and links to discover and configure it, e.g. on the homepage of porsche.com. The side view of the vehicle overlaps the model signature behind it, followed by a heading, the price and the two links. The link to discover the model stretches its clickable area over the tile, while the link to configure it stays an independent action above it. On hover, the vehicle zooms in, unless the user prefers reduced motion.',
};

/**
 * Tile pattern – a model range with its starting price, built with HTML and Tailwind CSS instead of `p-tile`.
 *
 * Signature and vehicle are stacked in the same grid cell via `[grid-area:1/1]`, and `mt-[6%]` lets the vehicle
 * overlap the lower part of the signature. The mask of the signature paints it above content that isn't positioned,
 * so `z-1` places the vehicle in front of it. `grid-cols-1` prevents the natural width of the image from widening the
 * grid. `[--p-model-signature-color:var(--color-canvas)]` renders the signature in the canvas color, which stands out
 * subtly from the surface of the tile.
 *
 * The "Configure" link is an independent action, so `relative z-2` places it above the covering link. Its accessible
 * name identifies the model, while it still contains the visible label.
 *
 * The page follows the color scheme of the user via `scheme-light-dark`, and so does the tile: its media are photos
 * filling their area or cut-outs on a transparent background, which work on a light and a dark surface alike.
 */
const Page = () => (
  <PatternPage meta={meta} class="scheme-light-dark">
    <main id="main" class="grid-template content-center min-h-dvh py-fluid-lg">
      <div class="col-basic justify-self-center w-full max-w-[560px] group relative isolate flex flex-col items-center justify-center gap-fluid-sm aspect-4/3 rounded-3xl bg-surface p-fluid-md text-center [--p-link-cover-radius:var(--radius-3xl)]">
        <div class="grid grid-cols-1 w-full">
          <p-model-signature
            class="[grid-area:1/1] justify-self-center [--p-model-signature-width:75%] [--p-model-signature-color:var(--color-canvas)]"
            model="911"
            safe-zone={false}
          ></p-model-signature>
          <img
            class="[grid-area:1/1] z-1 w-full mt-[6%] motion-safe:transition-[scale] duration-md ease-in-out motion-safe:group-hover:scale-105"
            src="/examples/media/911-side-view.webp"
            alt=""
            width="776"
            height="276"
          />
        </div>
        <p-heading tag="h2" size="sm" align="center">
          The iconic sports car with rear engine
        </p-heading>
        <p-text size="xs" color="contrast-medium" align="center">
          From €123,456.00* or €1,234.00/month*
        </p-text>
        <div class="flex flex-wrap justify-center items-center gap-static-md mt-fluid-sm">
          <p-link variant="primary" cover={true}>
            <a href="#">Discover 911</a>
          </p-link>
          <p-link class="relative z-2" variant="secondary" href="#" aria="{ 'aria-label': 'Configure 911' }">
            Configure
          </p-link>
        </div>
      </div>
    </main>
  </PatternPage>
);

export default Page;
