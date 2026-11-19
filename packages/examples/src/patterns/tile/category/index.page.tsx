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
  <PatternPage meta={meta} centered>
    <main id="main" class="grid-template py-fluid-lg">
      <Comment>{tileComments.coverTile}</Comment>
      <div class="col-basic justify-self-center w-full max-w-[400px] group relative isolate rounded-3xl [--p-link-cover-radius:var(--radius-3xl)]">
        <Comment>{tileComments.clip}</Comment>
        <div class="flex flex-col gap-fluid-lg aspect-3/4 overflow-clip rounded-[inherit] bg-surface pt-fluid-md">
          <div class="flex flex-wrap items-center gap-fluid-sm px-fluid-md">
            <p-heading tag="h2" size="md" weight="regular">
              Vehicle Accessories
            </p-heading>
            <Comment>{tileComments.coverLink}</Comment>
            <p-link
              class="ms-auto"
              variant="secondary"
              icon="arrow-up-right"
              hide-label="true"
              compact="true"
              cover={true}
            >
              <a href="#">Vehicle Accessories</a>
            </p-link>
          </div>
          <Comment>{tileComments.fill}</Comment>
          <Comment>The image is cropped at the bottom, so the lower edge of the tile cuts the product.</Comment>
          <Comment>{tileComments.zoom}</Comment>
          <img
            class="flex-1 min-h-0 object-contain motion-safe:transition-[scale] duration-md ease-in-out motion-safe:group-hover:scale-105"
            src="/examples/media/wall-charger.webp"
            alt="A Porsche wall charger"
            width="595"
            height="800"
          />
        </div>
      </div>
    </main>
  </PatternPage>
);

export default Page;
