import type { ExampleMeta } from '../../../../lib/meta.ts';
import { PatternPage } from '../../../_layouts/PatternPage.tsx';

/** How the example is presented – by the storefront, in StackBlitz and in the knowledge skill. */
export const meta: ExampleMeta = {
  title: 'Tile: Model Selection',
  description:
    'A model selection lets users pick a model range as entry point, e.g. to browse the available vehicles of the Porsche Finder. The tile shows the model signature, the model name and a side view of the vehicle, while a link stretched over the tile makes it clickable as a whole, with the model name as its label for screen readers. On hover, the vehicle zooms in, unless the user prefers reduced motion.',
};

/**
 * Tile pattern – a model range as entry point, built with HTML and Tailwind CSS instead of `p-tile`.
 *
 * The tile is the positioned ancestor of its link: the anchor spans it via `absolute inset-0`, carries the name of the
 * model as text for screen readers only (`sr-only`) and lies above the content via `z-1`, so hovering anywhere on the
 * tile hovers the link. `rounded-[inherit]` lets its focus outline follow the corners of the tile. The zoom is a
 * `group-hover:` variant of the tile, wrapped in `motion-safe:`. The image repeats the name, so it is decorative.
 *
 * The page follows the color scheme of the user via `scheme-light-dark`, and so does the tile: its media are photos
 * filling their area or cut-outs on a transparent background, which work on a light and a dark surface alike.
 */
const Page = () => (
  <PatternPage meta={meta} class="scheme-light-dark">
    <main id="main" class="grid-template content-center min-h-dvh py-fluid-lg bg-surface">
      <div class="col-basic justify-self-center w-full max-w-[560px] group relative isolate flex flex-col items-center text-center rounded-3xl bg-canvas p-fluid-md">
        <a href="#" class="absolute inset-0 z-1 rounded-[inherit] focus-visible:outline outline-focus outline-offset-2">
          <span class="sr-only">Porsche 911</span>
        </a>
        <p-model-signature model="911"></p-model-signature>
        <p-text>Porsche 911</p-text>
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
