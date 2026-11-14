import type { ExampleMeta } from '../../../../lib/meta.ts';
import { PatternPage } from '../../../_layouts/PatternPage.tsx';
import { Comment } from '../../../_partials/Comment.tsx';
import { tileComments } from '../../../_partials/tile/comments.ts';

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
 * The comments in the markup say why it is built the way it is, since they reach the code a consumer copies.
 */
const Page = () => (
  <PatternPage meta={meta} centered>
    <main id="main" class="grid-template py-fluid-lg">
      <Comment>{tileComments.coverTile}</Comment>
      <div class="col-basic group relative isolate flex flex-col items-center justify-center gap-fluid-sm aspect-video rounded-3xl bg-surface p-fluid-lg text-center [--p-link-cover-radius:var(--radius-3xl)]">
        <Comment>
          Signature and vehicle share one cell, the vehicle overlapping the lower part of the signature and placed in
          front of it. The signature takes the canvas color, which stands out subtly from the surface of the tile.
        </Comment>
        <Comment>The cell reaches into the padding, so that the vehicle is wider than the text below it.</Comment>
        <div class="grid grid-cols-1 w-[calc(100%+2*var(--spacing-fluid-md))] -mx-fluid-md">
          <p-model-signature
            class="[grid-area:1/1] justify-self-center [--p-model-signature-width:65%] [--p-model-signature-color:var(--color-canvas)]"
            model="911"
            safe-zone={false}
          ></p-model-signature>
          <Comment>{tileComments.zoom}</Comment>
          <Comment>
            Mirrored so that the vehicle faces the reading direction. The zoom has to name both axes, since a plain
            scale would reset the mirrored one.
          </Comment>
          <img
            class="[grid-area:1/1] z-1 w-full mt-[6%] -scale-x-100 motion-safe:transition-[scale] duration-md ease-in-out motion-safe:group-hover:-scale-x-105 motion-safe:group-hover:scale-y-105"
            src="/examples/media/911-carrera-side-view.webp"
            alt=""
            width="1087"
            height="283"
          />
        </div>
        <div class="flex flex-col gap-static-xs">
          <p-heading tag="h2" size="md" align="center">
            The iconic sports car with rear engine
          </p-heading>
          <p-text size="xs" color="contrast-medium" align="center">
            From €123,456.00* or €1,234.00/month*
          </p-text>
        </div>
        <div class="flex flex-wrap justify-center items-center gap-static-md mt-fluid-sm">
          <Comment>{tileComments.coverLink}</Comment>
          <p-link variant="primary" cover={true}>
            <a href="#">Discover 911</a>
          </p-link>
          <Comment>{tileComments.action}</Comment>
          <Comment>Its accessible name identifies the model and contains the label it shows.</Comment>
          <p-link class="relative z-2" variant="secondary" href="#" aria="{ 'aria-label': 'Configure 911' }">
            Configure
          </p-link>
        </div>
      </div>
    </main>
  </PatternPage>
);

export default Page;
