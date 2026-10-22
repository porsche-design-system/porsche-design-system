import type { ExampleMeta } from '../../../../lib/meta.ts';
import { PatternPage } from '../../../_layouts/PatternPage.tsx';

/** How the example is presented – by the storefront, in StackBlitz and in the knowledge skill. */
export const meta: ExampleMeta = {
  title: 'Tile: Call to Action',
  description:
    'A call to action tile promotes a service with a mood image and a link to it, e.g. Porsche Connect on porsche.com. Heading, text and link are stacked at the start of the tile, on a dark gradient that ensures their legibility, and take up to half of its width. The link stretches its clickable area over the tile, and on hover the image zooms in, unless the user prefers reduced motion. When the text needs more space than the aspect ratio provides, the tile grows beyond it.',
};

/**
 * Tile pattern – a service promoted with a mood image, built with HTML and Tailwind CSS instead of `p-tile`.
 *
 * The image lies behind the content via `-z-1`, within a layer that clips the zoom to the corners of the tile. The
 * tile itself doesn't clip, so the focus ring of the covering `p-link` is drawn around it. The column at the start
 * carries the gradient – `bg-fade-to-r`, mirrored for right-to-left via `rtl:` – takes up to half of the tile via
 * `max-w-1/2` and centers its content vertically. Its end padding is the distance the gradient extends beyond the text.
 * `mt-fluid-sm` increases the space above the link. The tile is a grid rather than a row of flex items, because only
 * then does text that needs more space than the aspect ratio provides make it grow beyond it.
 *
 * The page follows the color scheme of the user via `scheme-light-dark`, while `scheme-only-dark` keeps the tile dark,
 * since it lies on a dark gradient or background.
 */
const Page = () => (
  <PatternPage meta={meta} class="scheme-light-dark">
    <main id="main" class="grid-template content-center min-h-dvh py-fluid-lg">
      <div class="col-extended group relative isolate grid aspect-video rounded-3xl scheme-only-dark [--p-link-cover-radius:var(--radius-3xl)]">
        <div class="absolute inset-0 -z-1 overflow-clip rounded-[inherit]">
          <img
            class="size-full object-cover motion-safe:transition-[scale] duration-md ease-in-out motion-safe:group-hover:scale-105"
            src="/examples/media/dessert.jpg"
            alt=""
            width="1000"
            height="667"
          />
        </div>
        <div class="max-w-1/2 flex flex-col items-start justify-center gap-fluid-sm ps-fluid-md pe-fluid-lg py-fluid-md rounded-s-[inherit] bg-fade-to-r rtl:bg-fade-to-l">
          <p-heading tag="h2" size="lg">
            Porsche Connect.
          </p-heading>
          <p-text>
            Porsche Connect enhances the driving experience with a wide range of music and video streaming services, the
            integrated Voice Pilot and remote services via the My Porsche app.
          </p-text>
          <p-link class="mt-fluid-sm" variant="secondary" cover={true}>
            <a href="#">Discover Porsche Connect</a>
          </p-link>
        </div>
      </div>
    </main>
  </PatternPage>
);

export default Page;
