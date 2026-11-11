import type { ExampleMeta } from '../../../../lib/meta.ts';
import { PatternPage } from '../../../_layouts/PatternPage.tsx';
import { Comment } from '../../../_partials/Comment.tsx';
import { tileComments } from '../../../_partials/tile/comments.ts';

/** How the example is presented – by the storefront, in StackBlitz and in the knowledge skill. */
export const meta: ExampleMeta = {
  title: 'Tile: Call to Action',
  description:
    'A call to action tile promotes a service with a mood image and a link to it, e.g. Porsche Connect on porsche.com. Heading, text and link are stacked at the start of the tile, on a dark gradient that ensures their legibility, and take up to half of its width. The link stretches its clickable area over the tile, and on hover the image zooms in, unless the user prefers reduced motion. When the text needs more space than the aspect ratio provides, the tile grows beyond it.',
  colorSchemes: ['light', 'dark'],
};

/**
 * Tile pattern – a service promoted with a mood image, built with HTML and Tailwind CSS.
 *
 * The comments in the markup say why it is built the way it is, since they reach the code a consumer copies.
 */
const Page = () => (
  <PatternPage meta={meta}>
    <main id="main" class="grid-template content-center min-h-dvh py-fluid-lg">
      <Comment>{tileComments.coverTile}</Comment>
      <Comment>{tileComments.darkScheme}</Comment>
      <Comment>Text that needs more space than the aspect ratio provides extends the tile beyond it.</Comment>
      <div class="col-extended group relative isolate grid aspect-video rounded-3xl scheme-only-dark [--p-link-cover-radius:var(--radius-3xl)]">
        <Comment>{tileComments.clip}</Comment>
        <div class="absolute inset-0 -z-1 overflow-clip rounded-[inherit]">
          <Comment>{tileComments.zoom}</Comment>
          <img
            class="size-full object-cover motion-safe:transition-[scale] duration-md ease-in-out motion-safe:group-hover:scale-105"
            src="/examples/media/dessert.jpg"
            alt=""
            width="1000"
            height="667"
          />
        </div>
        <Comment>
          Takes up to half of the tile and carries the gradient, mirrored for right to left, so it keeps the text
          legible on the image.
        </Comment>
        <div class="max-w-1/2 flex flex-col items-start justify-center gap-fluid-sm ps-fluid-md pe-fluid-lg py-fluid-md rounded-s-[inherit] bg-fade-to-r rtl:bg-fade-to-l">
          <p-heading tag="h2" size="lg">
            Porsche Connect.
          </p-heading>
          <p-text>
            Porsche Connect enhances the driving experience with a wide range of music and video streaming services, the
            integrated Voice Pilot and remote services via the My Porsche app.
          </p-text>
          <Comment>{tileComments.coverLink}</Comment>
          <p-link class="mt-fluid-sm" variant="secondary" cover={true}>
            <a href="#">Discover Porsche Connect</a>
          </p-link>
        </div>
      </div>
    </main>
  </PatternPage>
);

export default Page;
