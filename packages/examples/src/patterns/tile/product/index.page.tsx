import type { ExampleMeta } from '../../../../lib/meta.ts';
import { PatternPage } from '../../../_layouts/PatternPage.tsx';
import { ProductTile } from '../../../_partials/tile/ProductTile.tsx';

/** How the example is presented – by the storefront, in StackBlitz and in the knowledge skill. */
export const meta: ExampleMeta = {
  title: 'Tile: Product',
  description:
    'A product tile links to the detail page of a product, e.g. within a product list of the Porsche Shop. It shows a tag and a button to add the product to the wishlist, the product image, the available colors, the name and the price. A link stretched over the tile, labelled with the product name for screen readers, makes it clickable as a whole, while the wishlist button and the color swatches stay independent actions above it. On hover, the image zooms in, unless the user prefers reduced motion.',
  colorSchemes: ['light', 'dark'],
};

/**
 * Tile pattern – a product of a list, built with HTML and Tailwind CSS.
 *
 * The page places the tile and gives it its content. Its markup comes from the partial, with the comments on why it
 * is built the way it is, since they reach the code a consumer copies.
 */
const Page = () => (
  <PatternPage meta={meta} centered>
    <main id="main" class="grid-template py-fluid-lg">
      <ProductTile
        class="col-basic justify-self-center w-full max-w-[400px]"
        name="Weekender – Porsche Design Travel Collection"
        href="#"
        price="€1,100.00"
        tagLabel="New"
        image={{ src: '/examples/media/weekender.webp', width: 960, height: 1080 }}
        colors={[
          { label: 'Grey', class: 'bg-[#4b4b4d]' },
          { label: 'Cognac', class: 'bg-[#9a6a44]' },
        ]}
        colorGroup="product-color"
      />
    </main>
  </PatternPage>
);

export default Page;
