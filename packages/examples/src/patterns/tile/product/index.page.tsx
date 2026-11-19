import type { ExampleMeta } from '../../../../lib/meta.ts';
import { PatternPage } from '../../../_layouts/PatternPage.tsx';
import { Comment } from '../../../_partials/Comment.tsx';
import { ProductTile } from '../../../_partials/tile/ProductTile.tsx';

/** How the example is presented – by the storefront, in StackBlitz and in the knowledge skill. */
export const meta: ExampleMeta = {
  title: 'Tile: Product',
  description:
    'A product tile links to the detail page of a product, shown here the way it occurs: as a product list, e.g. of the Porsche Shop, which takes as many columns as its width allows. Each tile shows a tag and a button to add the product to the wishlist, the product image, the available colors, the name and the price. A link stretched over the tile, labelled with the product name for screen readers, makes it clickable as a whole, while the wishlist button and the color swatches stay independent actions above it. On hover, the image zooms in, unless the user prefers reduced motion.',
  colorSchemes: ['light', 'dark'],
};

/**
 * Tile pattern – the products of a list, built with HTML and Tailwind CSS.
 *
 * The page lists the tiles and gives them their content. Their markup comes from the partial, with the comments on why
 * it is built the way it is, since they reach the code a consumer copies – once, with the first tile.
 */
const Page = () => (
  <PatternPage meta={meta} centered>
    <main id="main" class="grid-template py-fluid-lg">
      <Comment>
        A list, so that how many products there are is announced before the first of them is read, and so that they can
        be stepped through as a set.
      </Comment>
      <Comment>
        As many columns as fit with at least 14rem each, so the list follows the width it is given rather than the one
        of the window. A tile is never wider than the list, so it does not run out of a narrow one at a large text size.
      </Comment>
      <ul class="col-basic grid grid-cols-[repeat(auto-fit,minmax(min(14rem,100%),1fr))] gap-fluid-md">
        <ProductTile
          as="li"
          name="Weekender – Porsche Design Travel Collection"
          href="#"
          price="€1,100.00"
          tagLabel="New"
          image={{ src: '/examples/media/weekender.webp', width: 960, height: 1080 }}
          colors={[
            { label: 'Grey', class: 'bg-[#4b4b4d]' },
            { label: 'Cognac', class: 'bg-[#9a6a44]' },
          ]}
          colorGroup="weekender-color"
        />
        <ProductTile
          as="li"
          name="Chronograph 1 – All Black Numbered Edition"
          href="#"
          price="€9,950.00"
          image={{ src: '/examples/media/chronograph.webp', width: 800, height: 1282 }}
          colors={[
            { label: 'Black', class: 'bg-[#1c1c1e]' },
            { label: 'Titanium', class: 'bg-[#8a8d8f]' },
          ]}
          colorGroup="chronograph-color"
        />
        <ProductTile
          as="li"
          name="Roof Box 520"
          href="#"
          price="€1,249.00"
          image={{ src: '/examples/media/roof-box.webp', width: 1000, height: 255 }}
          colors={[
            { label: 'Black', class: 'bg-[#1c1c1e]' },
            { label: 'Platinum', class: 'bg-[#c9cacb]' },
            { label: 'White', class: 'bg-[#f2f2f2]' },
          ]}
          colorGroup="roof-box-color"
        />
      </ul>
    </main>
  </PatternPage>
);

export default Page;
