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
  <PatternPage meta={meta} background="surface">
    <main id="main" class="grid-template py-fluid-lg">
      <Comment>{tileComments.anchorTile}</Comment>
      <Comment>
        Without a background of its own at rest, the tile blends into the surface it is placed on and reveals its
        background on hover.
      </Comment>
      <div class="col-basic justify-self-center w-full max-w-[560px] group relative isolate flex flex-col gap-fluid-xs aspect-video rounded-3xl p-fluid-sm motion-safe:transition-colors duration-sm ease-in-out hover:bg-canvas">
        <Comment>{tileComments.anchorLink}</Comment>
        <a href="#" class="absolute inset-0 z-1 rounded-[inherit] focus-visible:outline outline-focus outline-offset-2">
          <span class="sr-only">718</span>
        </a>
        <p-heading tag="h2" size="md">
          718
        </p-heading>
        <Comment>{tileComments.fill}</Comment>
        <Comment>
          Moves towards the end while the tile is hovered, mirrored for right to left, unless the user prefers reduced
          motion. Its end padding reserves the space it moves into.
        </Comment>
        <img
          class="grow basis-0 min-h-0 w-full object-contain pe-static-md motion-safe:transition-[translate] duration-md ease-in-out motion-safe:group-hover:translate-x-static-md motion-safe:rtl:group-hover:-translate-x-static-md"
          src="/examples/media/718-side-view.webp"
          alt="Porsche 718"
          width="776"
          height="276"
        />
        <p-tag class="self-start">Petrol</p-tag>
      </div>
    </main>
  </PatternPage>
);

export default Page;
