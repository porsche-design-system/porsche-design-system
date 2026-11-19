import type { ExampleMeta } from '../../../../lib/meta.ts';
import { PatternPage } from '../../../_layouts/PatternPage.tsx';
import { ModelSelectionTile } from '../../../_partials/tile/ModelSelectionTile.tsx';

/** How the example is presented – by the storefront, in StackBlitz and in the knowledge skill. */
export const meta: ExampleMeta = {
  title: 'Tile: Model Selection',
  description:
    'A model selection lets users pick a model range as entry point, e.g. to browse the available vehicles of the Porsche Finder. The tile shows the model signature and a side view of the vehicle, while a link stretched over the tile makes it clickable as a whole, with the model name as its label for screen readers. On hover, the vehicle zooms in, unless the user prefers reduced motion.',
  colorSchemes: ['light', 'dark'],
};

/**
 * Tile pattern – a model range as entry point, built with HTML and Tailwind CSS.
 *
 * The page places the tile and gives it its content. Its markup comes from the partial, with the comments on why it
 * is built the way it is, since they reach the code a consumer copies.
 */
const Page = () => (
  <PatternPage meta={meta} background="surface" centered>
    <main id="main" class="grid-template py-fluid-lg">
      <ModelSelectionTile
        class="col-basic justify-self-center w-full max-w-[560px]"
        model="911"
        label="Porsche 911"
        href="#"
        image={{ src: '/examples/media/911-gts-side-view.webp', width: 1280, height: 459 }}
      />
    </main>
  </PatternPage>
);

export default Page;
