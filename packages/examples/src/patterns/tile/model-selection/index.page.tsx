import type { ExampleMeta } from '../../../../lib/meta.ts';
import { PatternPage } from '../../../_layouts/PatternPage.tsx';
import { Comment } from '../../../_partials/Comment.tsx';
import { tileComments } from '../../../_partials/tile/comments.ts';

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
 * The comments in the markup say why it is built the way it is, since they reach the code a consumer copies.
 */
const Page = () => (
  <PatternPage meta={meta} background="surface" centered>
    <main id="main" class="grid-template py-fluid-lg">
      <Comment>{tileComments.anchorTile}</Comment>
      <Comment>{tileComments.ownHeight}</Comment>
      <div class="col-basic self-start justify-self-center w-full max-w-[560px] group relative isolate grid place-items-center aspect-16/9 rounded-3xl bg-canvas p-fluid-md">
        <Comment>
          Signature and vehicle share one cell, the vehicle overlapping the signature and placed in front of it. The
          signature takes the surface color, which stands out subtly from the canvas of the tile, and stays narrower
          than the vehicle, so only its upper part is read.
        </Comment>
        <Comment>Its width is a share of the tile, so the vehicle keeps its scale at every size.</Comment>
        <div class="grid grid-cols-1 w-4/5">
          <Comment>{tileComments.signatureWidth}</Comment>
          <p-model-signature
            class="[grid-area:1/1] justify-self-center [--p-model-signature-width:85%] [--p-model-signature-color:var(--color-surface)]"
            model="911"
            safe-zone={false}
          ></p-model-signature>
          <Comment>{tileComments.modelImage}</Comment>
          <Comment>{tileComments.zoom}</Comment>
          <img
            class="[grid-area:1/1] z-1 w-full motion-safe:transition-[scale] duration-md ease-in-out motion-safe:group-hover:scale-105"
            src="/examples/media/911-gts-side-view.webp"
            alt=""
            width="1280"
            height="459"
          />
        </div>
        <Comment>{tileComments.anchorLink}</Comment>
        <Comment>It follows the vehicle, which shares its stacking order, so that the link stays on top.</Comment>
        <a href="#" class="absolute inset-0 z-1 rounded-[inherit] focus-visible:outline outline-focus outline-offset-2">
          <span class="sr-only">Porsche 911</span>
        </a>
      </div>
    </main>
  </PatternPage>
);

export default Page;
