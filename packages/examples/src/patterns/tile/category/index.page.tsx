import type { ExampleMeta } from '../../../../lib/meta.ts';
import { PatternPage } from '../../../_layouts/PatternPage.tsx';
import { Comment } from '../../../_partials/Comment.tsx';
import { CategoryTile } from '../../../_partials/tile/CategoryTile.tsx';
import { TileImage } from '../../../_partials/tile/TileImage.tsx';

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
      <CategoryTile
        class="col-basic justify-self-center w-full max-w-[400px]"
        heading="Vehicle Accessories"
        href="#"
        mediaPadding="pt-fluid-lg"
      >
        <Comment>The image is cropped at the bottom, so the lower edge of the tile cuts the product.</Comment>
        <TileImage
          class="size-full object-contain"
          src="/examples/media/wall-charger.webp"
          alt="A Porsche wall charger"
          width={595}
          height={800}
        />
      </CategoryTile>
    </main>
  </PatternPage>
);

export default Page;
