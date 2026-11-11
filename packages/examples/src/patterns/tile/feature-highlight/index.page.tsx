import type { ExampleMeta } from '../../../../lib/meta.ts';
import { PatternPage } from '../../../_layouts/PatternPage.tsx';
import { Comment } from '../../../_partials/Comment.tsx';
import { Script } from '../../../_partials/Script.tsx';
import { tileComments } from '../../../_partials/tile/comments.ts';

/** How the example is presented – by the storefront, in StackBlitz and in the knowledge skill. */
export const meta: ExampleMeta = {
  title: 'Tile: Feature Highlight',
  description:
    'A feature highlight presents a feature of a vehicle with a mood image and reveals further details on demand, e.g. within a model page of porsche.com. The image covers the whole tile, and a dark gradient at the bottom ensures the legibility of the heading and the accordion below it. When expanded, the tile grows beyond its aspect ratio, and the gradient grows with the details.',
  colorSchemes: ['light', 'dark'],
};

/**
 * Tile pattern – a feature with details on demand, built with HTML and Tailwind CSS.
 *
 * The comments in the markup say why it is built the way it is, since they reach the code a consumer copies.
 */
const Page = () => (
  <PatternPage meta={meta}>
    <main id="main" class="grid-template py-fluid-lg">
      <Comment>
        The aspect ratio is a preferred size only: expanded details extend the tile beyond it, which clipping would
        prevent. So the tile does not clip, and the image and the gradient follow its corners themselves.
      </Comment>
      <Comment>{tileComments.darkScheme}</Comment>
      <div class="col-basic justify-self-center w-full max-w-[560px] relative isolate grid aspect-4/3 rounded-3xl scheme-only-dark">
        <Comment>Decorative, it lies behind the content and covers the tile.</Comment>
        <img
          class="absolute inset-0 -z-1 size-full object-cover rounded-[inherit]"
          src="/examples/media/lights.jpg"
          alt=""
          width="1366"
          height="2048"
        />
        <Comment>{tileComments.gradient}</Comment>
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
