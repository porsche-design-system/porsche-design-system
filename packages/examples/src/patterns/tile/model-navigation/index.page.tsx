import type { ExampleMeta } from '../../../../lib/meta.ts';
import { PatternPage } from '../../../_layouts/PatternPage.tsx';

/** How the example is presented – by the storefront, in StackBlitz and in the knowledge skill. */
export const meta: ExampleMeta = {
  title: 'Tile: Model Navigation',
  description:
    'A model navigation tile links to the vehicles of a model, e.g. within the navigation of the Porsche Finder. At rest, the tile is transparent and blends into the surface it is placed on. On hover, it reveals its background and moves the vehicle slightly towards the end, which follows the writing direction, unless the user prefers reduced motion.',
};

/**
 * Tile pattern – a model of the navigation, built with HTML and Tailwind CSS instead of `p-tile`.
 *
 * The tile has no background until it is hovered: `hover:bg-canvas` reveals it, `motion-safe:transition-colors`
 * animates it. The vehicle follows the hover of the tile via `group-hover:`, by `translate-x-static-md`, mirrored for
 * right-to-left via `rtl:`, and the end padding of the image reserves the space it moves into. `grow basis-0 min-h-0`
 * lets the image take the height that is left between name and fuel type without increasing the height of the tile.
 *
 * The page follows the color scheme of the user via `scheme-light-dark`, and so does the tile: it has no background of
 * its own at rest, so its content has to match the surface it is placed on.
 */
const Page = () => (
  <PatternPage meta={meta} class="scheme-light-dark">
    <main id="main" class="grid-template content-center min-h-dvh py-fluid-lg bg-surface">
      <div class="col-basic justify-self-center w-full max-w-[560px] group relative isolate flex flex-col gap-fluid-xs aspect-video rounded-3xl p-fluid-sm motion-safe:transition-colors duration-sm ease-in-out hover:bg-canvas">
        <a href="#" class="absolute inset-0 z-1 rounded-[inherit] focus-visible:outline outline-focus outline-offset-2">
          <span class="sr-only">718</span>
        </a>
        <p-heading tag="h2" size="md">
          718
        </p-heading>
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
