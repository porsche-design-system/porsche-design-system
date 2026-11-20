import type { ExampleMeta } from '../../../../lib/meta.ts';
import { PatternPage } from '../../../_layouts/PatternPage.tsx';
import { ImageTile } from '../../../_partials/tile/ImageTile.tsx';

/** How the example is presented – by the storefront, in StackBlitz and in the knowledge skill. */
export const meta: ExampleMeta = {
  title: 'Tile: Image',
  description:
    'An image tile links to a category with a mood image, e.g. a model range on porsche.com. The image covers the whole tile, an icon-only link sits in its upper corner, and a dark gradient at the bottom ensures the legibility of the heading. The link stretches its clickable area over the tile, and on hover the image zooms in, unless the user prefers reduced motion.',
  colorSchemes: ['light', 'dark'],
};

/**
 * Tile pattern – a category with a mood image, built with HTML and Tailwind CSS.
 *
 * The page places the tile and gives it its content. Its markup comes from the partial, with the comments on why it
 * is built the way it is, since they reach the code a consumer copies.
 */
const Page = () => (
  <PatternPage meta={meta} centered>
    <main id="main" class="grid-template py-fluid-lg">
      <ImageTile
        class="col-basic justify-self-center w-full max-w-[400px]"
        heading="911"
        href="#"
        image={{
          src: '/examples/media/porsche-992-carrera-s.jpg',
          alt: 'Porsche 992 Carrera S',
          width: 1728,
          height: 664,
        }}
      />
    </main>
  </PatternPage>
);

export default Page;
