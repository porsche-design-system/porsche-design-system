import type { ExampleMeta } from '../../../../lib/meta.ts';
import { PatternPage } from '../../../_layouts/PatternPage.tsx';
import { Comment } from '../../../_partials/Comment.tsx';
import { tileComments } from '../../../_partials/tile/comments.ts';

/** How the example is presented – by the storefront, in StackBlitz and in the knowledge skill. */
export const meta: ExampleMeta = {
  title: 'Tile: Vehicle Listing',
  description:
    'A vehicle listing presents a single vehicle in a search result, e.g. of the Porsche Finder, with the image above its details. The tile adapts its height to the content. A link to the details stretches its clickable area over the tile, while the button to save the vehicle stays an independent action above it. The buttons are placed side by side as soon as the tile is wide enough, and on hover the image zooms in, unless the user prefers reduced motion.',
  colorSchemes: ['light', 'dark'],
};

/** A line of the vehicle details. */
const Detail = ({ children }: { children: string }) => <p-text>{children}</p-text>;

/**
 * Tile pattern – a vehicle of a search result, built with HTML and Tailwind CSS.
 *
 * The comments in the markup say why it is built the way it is, since they reach the code a consumer copies.
 */
const Page = () => (
  <PatternPage meta={meta} background="surface" centered>
    <main id="main" class="grid-template py-fluid-lg">
      <Comment>{tileComments.coverTile}</Comment>
      <Comment>
        The actions are placed side by side once the tile is wide enough, depending on the width of the tile instead of
        the viewport.
      </Comment>
      <div class="col-basic justify-self-center w-full max-w-[400px] @container group relative isolate flex flex-col gap-fluid-sm rounded-3xl bg-canvas [--p-link-cover-radius:var(--radius-3xl)]">
        <Comment>
          Clips the zooming image to its own box and the upper corners, so it neither overlaps the details nor the
          corners. The tile itself does not clip, since that would cut off the focus indicator of its link.
        </Comment>
        <div class="overflow-clip rounded-t-[inherit]">
          <Comment>{tileComments.zoom}</Comment>
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
            <Comment>{tileComments.coverLink}</Comment>
            <Comment>Its accessible name contains the label it shows and identifies the vehicle.</Comment>
            <p-link cover={true}>
              <a href="#" aria-label="Show details of the Porsche 718 Boxster">
                Show details
              </a>
            </p-link>
            <Comment>{tileComments.action}</Comment>
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
