import type { ExampleMeta } from '../../../../lib/meta.ts';
import { PatternPage } from '../../../_layouts/PatternPage.tsx';
import { SupportTile } from '../../../_partials/tile/SupportTile.tsx';

/** How the example is presented – by the storefront, in StackBlitz and in the knowledge skill. */
export const meta: ExampleMeta = {
  title: 'Tile: Support',
  description:
    'A support tile offers the ways to reach a person, e.g. at the end of a service page of porsche.com. A mood image fills the whole tile, and in front of it three smaller tiles each open one of the ways. The small tiles take a frosted background, which the image shines through, so they read as part of the image rather than as a panel laid over it.',
  colorSchemes: ['light', 'dark'],
};

/**
 * Tile pattern – a tile holding three smaller ones, built with HTML and Tailwind CSS.
 *
 * The page places the tile and gives it its content. Its markup comes from the partial, with the comments on why it
 * is built the way it is, since they reach the code a consumer copies.
 */
const Page = () => (
  <PatternPage meta={meta} centered>
    <main id="main" class="grid-template py-fluid-lg">
      <SupportTile
        class="col-extended"
        heading="Need further help?"
        text="If you require further guidance, we can assist you in finding the right solution."
        image={{ src: '/examples/media/macan-with-owner.webp', width: 1310, height: 737 }}
        ways={[
          {
            heading: 'Contact Porsche',
            text: 'Personal support for questions about your Porsche.',
            href: '#',
          },
          {
            heading: 'Find your Dealer',
            text: 'Your nearest Porsche Centre for advice and service.',
            href: '#',
          },
          {
            heading: 'Call Roadside Assistance',
            text: 'Immediate help when your Porsche breaks down.',
            href: '#',
          },
        ]}
      />
    </main>
  </PatternPage>
);

export default Page;
