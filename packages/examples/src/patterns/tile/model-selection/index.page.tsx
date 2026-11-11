import type { ExampleMeta } from '../../../../lib/meta.ts';
import { PatternPage } from '../../../_layouts/PatternPage.tsx';
import { Comment } from '../../../_partials/Comment.tsx';
import { tileComments } from '../../../_partials/tile/comments.ts';

/** How the example is presented – by the storefront, in StackBlitz and in the knowledge skill. */
export const meta: ExampleMeta = {
  title: 'Tile: Model Selection',
  description:
    'A model selection lets users pick a model range as entry point, e.g. to browse the available vehicles of the Porsche Finder. The tile shows the model signature, the model name and a side view of the vehicle, while a link stretched over the tile makes it clickable as a whole, with the model name as its label for screen readers. On hover, the vehicle zooms in, unless the user prefers reduced motion.',
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
      <div class="col-basic justify-self-center w-full max-w-[560px] group relative isolate flex flex-col items-center text-center rounded-3xl bg-canvas p-fluid-md">
        <Comment>{tileComments.anchorLink}</Comment>
        <a href="#" class="absolute inset-0 z-1 rounded-[inherit] focus-visible:outline outline-focus outline-offset-2">
          <span class="sr-only">Porsche 911</span>
        </a>
        <p-model-signature model="911"></p-model-signature>
        <p-text>Porsche 911</p-text>
        <Comment>Decorative, since the tile already names the model.</Comment>
        <Comment>{tileComments.zoom}</Comment>
        <img
          class="mt-static-sm motion-safe:transition-[scale] duration-md ease-in-out motion-safe:group-hover:scale-105"
          src="/examples/media/911-side-view.webp"
          alt=""
          width="776"
          height="276"
        />
      </div>
    </main>
  </PatternPage>
);

export default Page;
