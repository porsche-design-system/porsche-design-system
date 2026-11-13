import type { ExampleMeta } from '../../../../lib/meta.ts';
import { PatternPage } from '../../../_layouts/PatternPage.tsx';
import { Comment } from '../../../_partials/Comment.tsx';
import { Script } from '../../../_partials/Script.tsx';
import { tileComments } from '../../../_partials/tile/comments.ts';

/** How the example is presented – by the storefront, in StackBlitz and in the knowledge skill. */
export const meta: ExampleMeta = {
  title: 'Tile: Disclosure',
  description:
    'A disclosure tile presents a subject with a mood image and reveals further details on demand, e.g. a feature within a model page of porsche.com. The image covers the whole tile, and a dark gradient at the bottom ensures the legibility of the heading, which is the accordion summary itself. The tile opens nothing – what it has to say stays in it, which is why it is no link, and the image dims while the details are read.',
  colorSchemes: ['light', 'dark'],
};

/**
 * Tile pattern – a subject with details on demand, built with HTML and Tailwind CSS.
 *
 * The comments in the markup say why it is built the way it is, since they reach the code a consumer copies.
 */
const Page = () => (
  <PatternPage meta={meta} centered>
    <main id="main" class="grid-template py-fluid-lg">
      <Comment>
        The aspect ratio is a preferred size only: expanded details extend the tile beyond it, which clipping would
        prevent. So the tile does not clip, and the image and the gradient follow its corners themselves.
      </Comment>
      <Comment>{tileComments.darkScheme}</Comment>
      <div
        id="disclosure-tile"
        class="col-basic justify-self-center w-full max-w-[560px] group relative isolate grid aspect-4/3 rounded-3xl scheme-only-dark"
      >
        <Comment>Decorative, it lies behind the content and covers the tile.</Comment>
        <Comment>
          Dimmed while the details are expanded, so the attention rests on them rather than on the mood of the tile.
        </Comment>
        <img
          class="absolute inset-0 -z-1 size-full object-cover rounded-[inherit] motion-safe:transition-[filter] duration-md ease-in-out group-data-[open]:brightness-50"
          src="/examples/media/lights.jpg"
          alt=""
          width="1366"
          height="2048"
        />
        <Comment>{tileComments.gradient}</Comment>
        <div class="self-end px-fluid-md pt-fluid-lg pb-fluid-md rounded-b-[inherit] bg-fade-to-t">
          <Comment>
            The heading is the summary itself, so that the subject and the control over its details are one thing rather
            than two, and so that the accordion carries a semantic heading as it should.
          </Comment>
          <p-accordion id="disclosure-accordion" align-marker="start" compact={true}>
            <p-heading slot="summary" tag="h2" size="lg">
              Light design.¹
            </p-heading>
            <p-text>
              Distinctive light signatures at the front and rear make the vehicle recognisable at first glance, even in
              the dark.
            </p-text>
            <p-text class="mt-static-sm" size="2xs" color="contrast-medium">
              ¹Optionally available.
            </p-text>
          </p-accordion>
        </div>
      </div>
    </main>
    <Script>{
      /* language=JavaScript */ `
      // Behaviour of the disclosure tile: the accordion is controlled, so the page writes back the state it asks for.

      const disclosureAccordion = document.getElementById('disclosure-accordion');
      const disclosureTile = document.getElementById('disclosure-tile');

      disclosureAccordion.addEventListener('update', (e) => {
        disclosureAccordion.open = e.detail.open;
        // The accordion keeps its state as a property rather than an attribute, so the tile carries one for the styles.
        disclosureTile.toggleAttribute('data-open', e.detail.open);
      });
    `
    }</Script>
  </PatternPage>
);

export default Page;
