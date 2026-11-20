import type { ExampleMeta } from '../../../../lib/meta.ts';
import { PatternPage } from '../../../_layouts/PatternPage.tsx';
import { DisclosureTile } from '../../../_partials/tile/DisclosureTile.tsx';

/** How the example is presented – by the storefront, in StackBlitz and in the knowledge skill. */
export const meta: ExampleMeta = {
  title: 'Tile: Disclosure',
  description:
    'A disclosure tile presents a subject with a mood image and reveals further details on demand, e.g. a feature within a model page of porsche.com. The image covers the whole tile, and a dark gradient at the bottom ensures the legibility of the heading, which is the accordion summary itself. The tile opens nothing – what it has to say stays in it, which is why it is no link, and the image dims while the details are read.',
  colorSchemes: ['light', 'dark'],
};

/**
 * Tile pattern – a subject with details on demand, built with HTML and Tailwind CSS.
 *
 * The page places the tile and gives it its content. Its markup comes from the partial, with the comments on why it
 * is built the way it is, since they reach the code a consumer copies.
 */
const Page = () => (
  <PatternPage meta={meta} centered>
    <main id="main" class="grid-template py-fluid-lg">
      <DisclosureTile
        class="col-basic justify-self-center w-full max-w-[560px]"
        heading="Light design.¹"
        text="Distinctive light signatures at the front and rear make the vehicle recognisable at first glance, even in the dark."
        note="¹Optionally available."
        image={{ src: '/examples/media/lights.jpg', width: 1366, height: 2048 }}
      />
    </main>
  </PatternPage>
);

export default Page;
