import type { ExampleMeta } from '../../../../lib/meta.ts';
import { PatternPage } from '../../../_layouts/PatternPage.tsx';
import { Comment } from '../../../_partials/Comment.tsx';
import { CategoryTile } from '../../../_partials/tile/CategoryTile.tsx';

/** How the example is presented – by the storefront, in StackBlitz and in the knowledge skill. */
export const meta: ExampleMeta = {
  title: 'Tile: Category',
  description:
    'A category tile links to a category of a shop, e.g. of the Porsche Shop, shown here the way it occurs: three of them under one heading, with a link to the whole range below. In each tile the heading and an icon-only link sit at the top and the cut-out product image fills the rest. The link stretches its clickable area over the tile, and on hover the image zooms in, unless the user prefers reduced motion. The first tile is as tall as the other two together, which gives the arrangement a focus without making any of the three a different kind of tile.',
  colorSchemes: ['light', 'dark'],
};

/** Why the images of the tiles are fitted the way they are – comments the tiles render before their image. */
const cutOut = 'A cut out product, so all of it stays in view and the surface of the tile surrounds it.';
const centered =
  'Centered in the room the heading leaves rather than in the whole tile, and never taller than that room.';
const share = 'Its width is a share of the tile, so the product keeps its scale at every size.';

/**
 * Tile pattern – three categories under one heading, built with HTML and Tailwind CSS.
 *
 * The page arranges the tiles and gives them their content: the three differ in how their image is fitted and in how
 * much room they take, and each difference is stated where the tile is rendered. Their markup comes from the partial,
 * with the comments on why it is built the way it is, since they reach the code a consumer copies – once, with the
 * first tile.
 */
const Page = () => (
  <PatternPage meta={meta} centered>
    <main id="main" class="grid-template py-fluid-lg">
      <Comment>
        The size sits on the element rather than on the component, so the character limit below is measured in the size
        the heading is actually set in and keeps it on two lines at every width. The limit decides that there are two
        lines, the balanced wrap decides where they break.
      </Comment>
      <p-heading
        class="col-basic justify-self-center max-w-[18ch] text-3xl text-balance"
        tag="h2"
        size="inherit"
        align="center"
      >
        Highlights of the Porsche Shop
      </p-heading>

      <Comment>
        A list, so that how many categories there are is announced before the first of them is read, and so that they
        can be stepped through as a set.
      </Comment>
      <Comment>
        One per row on a phone. From the medium breakpoint there are two of them side by side, and the first tile is as
        tall as the other two together.
      </Comment>
      <ul class="col-basic mt-fluid-xl grid grid-cols-1 gap-fluid-md sm:grid-cols-2">
        <Comment>Beside the other two it has no ratio of its own and is stretched to their height instead.</Comment>
        <CategoryTile
          as="li"
          class="sm:row-span-2 sm:self-stretch"
          aspect="aspect-3/4 sm:aspect-auto"
          heading="Accessories"
          tag="h3"
          href="#"
          image={{
            src: '/examples/media/chronograph.webp',
            alt: 'A Porsche Design chronograph',
            width: 800,
            height: 1282,
          }}
          fit="mx-auto h-full w-1/2 object-contain"
          fitComments={[cutOut, centered, share]}
        />

        <CategoryTile
          as="li"
          aspect="aspect-3/2"
          heading="Tequipment"
          tag="h3"
          href="#"
          image={{ src: '/examples/media/roof-box.webp', alt: 'A roof box', width: 1000, height: 255 }}
          fit="mx-auto h-full w-3/4 object-contain"
          fitComments={[cutOut, centered, share]}
        />

        <CategoryTile
          as="li"
          aspect="aspect-3/2"
          heading="Clothing"
          tag="h3"
          href="#"
          image={{ src: '/examples/media/jacket.webp', alt: 'A Porsche Motorsport jacket', width: 900, height: 629 }}
          fit="mx-auto h-full w-2/3 object-contain object-bottom"
          fitComments={[
            'Set against the lower edge, where the image is cropped, so the garment is cut there. It is never taller than the room the heading leaves.',
            share,
          ]}
        />
      </ul>

      <Comment>The way out of the arrangement, for a reader none of the three categories has caught.</Comment>
      <p-link class="col-basic mt-fluid-lg justify-self-center" variant="primary">
        <a href="#">Discover all products</a>
      </p-link>
    </main>
  </PatternPage>
);

export default Page;
