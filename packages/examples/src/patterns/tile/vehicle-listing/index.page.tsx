import type { ExampleMeta } from '../../../../lib/meta.ts';
import { PatternPage } from '../../../_layouts/PatternPage.tsx';

/** How the example is presented – by the storefront, in StackBlitz and in the knowledge skill. */
export const meta: ExampleMeta = {
  title: 'Tile: Vehicle Listing',
  description:
    'A vehicle listing presents a single vehicle in a search result, e.g. of the Porsche Finder, with the image above its details. The tile adapts its height to the content. A link to the details stretches its clickable area over the tile, while the button to save the vehicle stays an independent action above it. The buttons are placed side by side as soon as the tile is wide enough, and on hover the image zooms in, unless the user prefers reduced motion.',
};

/** A line of the vehicle details. */
const Detail = ({ children }: { children: string }) => <p-text>{children}</p-text>;

/**
 * Tile pattern – a vehicle of a search result, built with HTML and Tailwind CSS instead of `p-tile`.
 *
 * The image reaches the top and side edges of the tile. Its wrapper clips the zoom to the box of the image and to the
 * upper corners of the tile, so the image neither overlaps the details nor the corners, and `aspect-video` defines its
 * height. The tile is the query container (`@container`), so the actions are stacked and placed side by side from
 * `@sm`, depending on the width of the tile instead of the viewport.
 *
 * The anchor slotted into the covering `p-link` gets an accessible name that contains the visible label and identifies
 * the vehicle. The "Save" button is an independent action, so `relative z-2` places it above the covering link.
 *
 * The page follows the color scheme of the user via `scheme-light-dark`, and so does the tile: its media are photos
 * filling their area or cut-outs on a transparent background, which work on a light and a dark surface alike.
 */
const Page = () => (
  <PatternPage meta={meta} class="scheme-light-dark">
    <main id="main" class="grid-template content-center min-h-dvh py-fluid-lg bg-surface">
      <div class="col-basic justify-self-center w-full max-w-[400px] @container group relative isolate flex flex-col gap-fluid-sm rounded-3xl bg-canvas [--p-link-cover-radius:var(--radius-3xl)]">
        <div class="overflow-clip rounded-t-[inherit]">
          <img
            class="w-full aspect-video object-cover motion-safe:transition-[scale] duration-md ease-in-out motion-safe:group-hover:scale-105"
            src="/examples/media/porsche-718-gts.jpg"
            alt="Porsche 718 GTS"
            width="1728"
            height="664"
          />
        </div>
        <div class="flex flex-col gap-fluid-sm px-fluid-md pb-fluid-md">
          <p-heading tag="h2" size="lg">
            Porsche 718 Boxster (982)
          </p-heading>
          <Detail>Porsche Approved Pre-owned</Detail>
          <p-divider></p-divider>
          <Detail>White · Black</Detail>
          <Detail>Petrol · 58,540 km · 04/2017 · 2 previous owners · Accident-free</Detail>
          <Detail>220 kW / 300 PS · Rear-wheel drive · Manual</Detail>
          <p-divider></p-divider>
          <p-text size="md">€159,900</p-text>
          <div class="flex flex-col @sm:flex-row @sm:flex-wrap gap-static-md">
            <p-link cover={true}>
              <a href="#" aria-label="Show details of the Porsche 718 Boxster">
                Show details
              </a>
            </p-link>
            <p-button class="relative z-2" type="button" variant="secondary" icon="bookmark">
              Save
            </p-button>
          </div>
        </div>
      </div>
    </main>
  </PatternPage>
);

export default Page;
