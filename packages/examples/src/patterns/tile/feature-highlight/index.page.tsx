import type { ExampleMeta } from '../../../../lib/meta.ts';
import { PatternPage } from '../../../_layouts/PatternPage.tsx';
import { Script } from '../../../_partials/Script.tsx';

/** How the example is presented – by the storefront, in StackBlitz and in the knowledge skill. */
export const meta: ExampleMeta = {
  title: 'Tile: Feature Highlight',
  description:
    'A feature highlight presents a feature of a vehicle with a mood image and reveals further details on demand, e.g. within a model page of porsche.com. The image covers the whole tile, and a dark gradient at the bottom ensures the legibility of the heading and the accordion below it. When expanded, the tile grows beyond its aspect ratio, and the gradient grows with the details.',
};

/**
 * Tile pattern – a feature with details on demand, built with HTML and Tailwind CSS instead of `p-tile`.
 *
 * The image lies behind the content via `-z-1` and covers the tile, rounded like it via `rounded-[inherit]`. The content
 * at the bottom carries the gradient, `bg-fade-to-t`, so the gradient grows with the expanded details, and
 * `scheme-only-dark` renders light content on it. `self-stretch` lets the expanded details span the full width of the tile.
 *
 * The aspect ratio is a preferred size only: content that needs more space makes the tile grow beyond it. That holds
 * for a grid, not for a row of flex items, and only as long as the tile doesn't clip its overflow – so the tile has no
 * `overflow-clip`, and the image and the gradient follow its corners themselves.
 *
 * The page follows the color scheme of the user via `scheme-light-dark`, while `scheme-only-dark` keeps the tile dark,
 * since it lies on a dark gradient or background.
 */
const Page = () => (
  <PatternPage meta={meta} class="scheme-light-dark">
    <main id="main" class="grid-template content-center min-h-dvh py-fluid-lg">
      <div class="col-basic justify-self-center w-full max-w-[560px] relative isolate grid aspect-4/3 rounded-3xl scheme-only-dark">
        <img
          class="absolute inset-0 -z-1 size-full object-cover rounded-[inherit]"
          src="/examples/media/lights.jpg"
          alt=""
          width="1366"
          height="2048"
        />
        <div class="self-end flex flex-col items-start gap-static-md px-fluid-md pt-fluid-lg pb-fluid-md rounded-b-[inherit] bg-fade-to-t">
          <p-heading tag="h2" size="lg">
            Light design.¹
          </p-heading>
          <p-accordion id="feature-highlight-accordion" class="self-stretch" align-marker="start" compact={true}>
            <span slot="summary">Show more</span>
            <p-text>
              Distinctive light signatures at the front and rear make the vehicle recognisable at first glance, even in
              the dark.
            </p-text>
            <p-text class="mt-static-sm" size="xs" color="contrast-medium">
              ¹Optionally available.
            </p-text>
          </p-accordion>
        </div>
      </div>
    </main>
    <Script>{
      /* language=JavaScript */ `
      // Behaviour of the feature highlight: the accordion is controlled, so the page writes back the state it asks for.

      const featureHighlightAccordion = document.getElementById('feature-highlight-accordion');

      featureHighlightAccordion.addEventListener('update', (e) => {
        featureHighlightAccordion.open = e.detail.open;
      });
    `
    }</Script>
  </PatternPage>
);

export default Page;
