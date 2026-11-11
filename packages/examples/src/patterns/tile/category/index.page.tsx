import type { ExampleMeta } from '../../../../lib/meta.ts';
import { PatternPage } from '../../../_layouts/PatternPage.tsx';
import { Comment } from '../../../_partials/Comment.tsx';
import { tileComments } from '../../../_partials/tile/comments.ts';

/** How the example is presented – by the storefront, in StackBlitz and in the knowledge skill. */
export const meta: ExampleMeta = {
  title: 'Tile: Category',
  description:
    'A category tile links to a category of a shop, e.g. vehicle accessories of the Porsche Shop. The heading and an icon-only link sit at the top, the cut-out product image fills the rest of the tile up to its edges. The link stretches its clickable area over the tile, and on hover the image zooms in, unless the user prefers reduced motion.',
  colorSchemes: ['light', 'dark'],
};

/**
 * Tile pattern – a shop category, built with HTML and Tailwind CSS.
 *
 * The comments in the markup say why it is built the way it is, since they reach the code a consumer copies.
 */
const Page = () => (
  <PatternPage meta={meta}>
    <main id="main" class="grid-template py-fluid-lg">
      <Comment>{tileComments.coverTile}</Comment>
      <Comment>
        Kept in the light scheme, since the dark vehicle of the image would hardly stand out from a dark surface.
      </Comment>
      <div class="col-basic justify-self-center w-full max-w-[400px] group relative isolate rounded-3xl scheme-only-light [--p-link-cover-radius:var(--radius-3xl)]">
        <Comment>{tileComments.clip}</Comment>
        <div class="flex flex-col gap-fluid-lg aspect-3/4 overflow-clip rounded-[inherit] bg-surface pt-fluid-md">
          <div class="flex flex-wrap items-center gap-fluid-sm px-fluid-md">
            <p-heading tag="h2" size="md" weight="semibold">
              Vehicle Accessories
            </p-heading>
            <Comment>{tileComments.coverLink}</Comment>
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
          <Comment>{tileComments.fill}</Comment>
          <Comment>Its upper part stays in view when the tile is too short for the whole image.</Comment>
          <Comment>{tileComments.zoom}</Comment>
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
