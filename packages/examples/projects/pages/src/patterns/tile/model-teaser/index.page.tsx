import type { ExampleMeta } from '../../../../lib/meta.ts';
import { PatternPage } from '../../../_layouts/PatternPage.tsx';
import { ModelTeaserTile } from '../../../_partials/tile/ModelTeaserTile.tsx';

/** How the example is presented – by the storefront, in StackBlitz and in the knowledge skill. */
export const meta: ExampleMeta = {
  title: 'Tile: Model Teaser',
  description:
    'A model teaser introduces a model range with its starting price and links to discover and configure it, e.g. on the homepage of porsche.com. The side view of the vehicle overlaps the model signature behind it, followed by a heading, the price and the two links. The link to discover the model stretches its clickable area over the tile, while the link to configure it stays an independent action above it. On hover, the vehicle zooms in, unless the user prefers reduced motion.',
  colorSchemes: ['light', 'dark'],
};

/**
 * Tile pattern – a model range with its starting price, built with HTML and Tailwind CSS.
 *
 * The page places the tile and gives it its content. Its markup comes from the partial, with the comments on why it
 * is built the way it is, since they reach the code a consumer copies.
 */
const Page = () => (
  <PatternPage meta={meta} centered>
    <main id="main" class="grid-template py-fluid-lg">
      <ModelTeaserTile
        class="col-basic"
        model="911"
        image={{ src: '/examples/media/911-gts-side-view.webp', width: 1280, height: 459 }}
        heading="The iconic sports car with rear engine"
        text="From €123,456.00* or €1,234.00/month*"
        link={{ label: 'Discover 911', href: '#' }}
        action={{ label: 'Configure', name: 'Configure 911', href: '#' }}
      />
    </main>
  </PatternPage>
);

export default Page;
