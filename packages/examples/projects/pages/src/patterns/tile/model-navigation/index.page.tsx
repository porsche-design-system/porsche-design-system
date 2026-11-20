import type { ExampleMeta } from '../../../../lib/meta.ts';
import { PatternPage } from '../../../_layouts/PatternPage.tsx';
import { ModelNavigationTile } from '../../../_partials/tile/ModelNavigationTile.tsx';

/** How the example is presented – by the storefront, in StackBlitz and in the knowledge skill. */
export const meta: ExampleMeta = {
  title: 'Tile: Model Navigation',
  description:
    'A model navigation tile links to the vehicles of a model, e.g. within the navigation of the Porsche Finder. At rest, the tile is transparent and blends into the surface it is placed on. On hover, it reveals its background and moves the vehicle slightly towards the end, which follows the writing direction, unless the user prefers reduced motion.',
  colorSchemes: ['light', 'dark'],
};

/**
 * Tile pattern – a model of the navigation, built with HTML and Tailwind CSS.
 *
 * The page places the tile and gives it its content. Its markup comes from the partial, with the comments on why it
 * is built the way it is, since they reach the code a consumer copies.
 */
const Page = () => (
  <PatternPage meta={meta} background="surface" centered>
    <main id="main" class="grid-template py-fluid-lg">
      <ModelNavigationTile
        class="col-basic justify-self-center w-full max-w-[560px]"
        heading="718"
        href="#"
        image={{ src: '/examples/media/718-gt4-rs-side-view.webp', width: 1000, height: 313 }}
        tagLabel="Petrol"
      />
    </main>
  </PatternPage>
);

export default Page;
