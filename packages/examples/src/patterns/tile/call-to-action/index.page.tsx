import type { ExampleMeta } from '../../../../lib/meta.ts';
import { PatternPage } from '../../../_layouts/PatternPage.tsx';
import { CallToActionTile } from '../../../_partials/tile/CallToActionTile.tsx';

/** How the example is presented – by the storefront, in StackBlitz and in the knowledge skill. */
export const meta: ExampleMeta = {
  title: 'Tile: Call to Action',
  description:
    'A call to action tile promotes a service with a mood image and a link to it, e.g. Porsche Connect on porsche.com. Heading, text and link are stacked at the start of the tile, on a dark gradient that ensures their legibility, and take up to half of its width. The link stretches its clickable area over the tile, and on hover the image zooms in, unless the user prefers reduced motion. When the text needs more space than the aspect ratio provides, the tile grows beyond it.',
  colorSchemes: ['light', 'dark'],
};

/**
 * Tile pattern – a service promoted with a mood image, built with HTML and Tailwind CSS.
 *
 * The page places the tile and gives it its content. Its markup comes from the partial, with the comments on why it
 * is built the way it is, since they reach the code a consumer copies.
 */
const Page = () => (
  <PatternPage meta={meta} centered>
    <main id="main" class="grid-template py-fluid-lg">
      <CallToActionTile
        class="col-extended"
        heading="Porsche Connect."
        text="Porsche Connect enhances the driving experience with a wide range of music and video streaming services, the integrated Voice Pilot and remote services via the My Porsche app."
        link={{ label: 'Discover Porsche Connect', href: '#' }}
        image={{ src: '/examples/media/gipfeltreffen.webp', width: 2000, height: 1125 }}
      />
    </main>
  </PatternPage>
);

export default Page;
