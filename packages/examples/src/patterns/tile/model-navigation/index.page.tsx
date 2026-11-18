import type { ExampleMeta } from '../../../../lib/meta.ts';
import { PatternPage } from '../../../_layouts/PatternPage.tsx';
import { Comment } from '../../../_partials/Comment.tsx';
import { tileComments } from '../../../_partials/tile/comments.ts';

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
 * The comments in the markup say why it is built the way it is, since they reach the code a consumer copies.
 */
const Page = () => (
  <PatternPage meta={meta} background="surface" centered>
    <main id="main" class="grid-template py-fluid-lg">
      <Comment>{tileComments.anchorTile}</Comment>
      <Comment>
        Without a background of its own at rest, the tile blends into the surface it is placed on and reveals its
        background on hover.
      </Comment>
      <Comment>{tileComments.ownHeight}</Comment>
      <div class="col-basic self-start justify-self-center w-full max-w-[560px] group relative isolate flex flex-col justify-between gap-fluid-xs aspect-16/9 rounded-3xl p-fluid-md motion-safe:transition-colors duration-sm ease-in-out hover:bg-canvas">
        <Comment>{tileComments.anchorLink}</Comment>
        <a href="#" class="absolute inset-0 z-1 rounded-[inherit] focus-visible:outline outline-focus outline-offset-2">
          <span class="sr-only">718</span>
        </a>
        <p-heading tag="h2" size="md">
          718
        </p-heading>
        <Comment>{tileComments.modelImage}</Comment>
        <Comment>
          Its width is a share of the tile, so the vehicle keeps its scale at every size, and the room beside it is the
          space it moves into.
        </Comment>
        <Comment>
          Moves towards the end while the tile is hovered, mirrored for right to left, unless the user prefers reduced
          motion.
        </Comment>
        <img
          class="self-center w-4/5 motion-safe:transition-[translate] duration-md ease-in-out motion-safe:group-hover:translate-x-static-md motion-safe:rtl:group-hover:-translate-x-static-md"
          src="/examples/media/718-gt4-rs-side-view.webp"
          alt=""
          width="1000"
          height="313"
        />
        <p-tag>Petrol</p-tag>
      </div>
    </main>
  </PatternPage>
);

export default Page;
