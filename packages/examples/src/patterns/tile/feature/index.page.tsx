import type { ExampleMeta } from '../../../../lib/meta.ts';
import { PatternPage } from '../../../_layouts/PatternPage.tsx';
import { Comment } from '../../../_partials/Comment.tsx';

/** How the example is presented – by the storefront, in StackBlitz and in the knowledge skill. */
export const meta: ExampleMeta = {
  title: 'Tile: Feature',
  description:
    'A feature tile explains a single feature of a vehicle, e.g. within a model page of porsche.com. The image reaches the top and side edges of the tile, followed by a heading, a text and a footnote. It is not interactive, and it adapts its height to the content.',
  colorSchemes: ['light', 'dark'],
};

/**
 * Tile pattern – a feature of a vehicle, built with HTML and Tailwind CSS.
 *
 * The comments in the markup say why it is built the way it is, since they reach the code a consumer copies.
 *
 * The footnote reference is the superscript character "¹" rather than a `<sup>` element, which the formatted markup
 * would separate from the word by a line break and therefore by a space.
 */
const Page = () => (
  <PatternPage meta={meta}>
    <main id="main" class="grid-template py-fluid-lg">
      <Comment>
        Nothing in the tile is interactive, so there is no focus indicator to keep and the tile clips the image to its
        corners itself.
      </Comment>
      <div class="col-basic justify-self-center w-full max-w-[560px] flex flex-col gap-fluid-sm overflow-clip rounded-3xl bg-surface">
        <img
          class="w-full aspect-video object-cover"
          src="/examples/media/porsche-992-carrera-s.jpg"
          alt="Rear view of a Porsche 911 Carrera S"
          width="1728"
          height="664"
        />
        <div class="flex flex-col gap-fluid-sm px-fluid-md pb-fluid-md">
          <p-heading tag="h2" size="lg">
            Rear-axle steering.¹
          </p-heading>
          <p-text>
            Increases performance and everyday usability: at low speeds, the turning circle is reduced, agility is
            increased and parking is made easier. At higher speeds, driving stability is increased.
          </p-text>
          <p-text class="mt-fluid-sm" size="xs" color="contrast-medium">
            ¹Optionally available.
          </p-text>
        </div>
      </div>
    </main>
  </PatternPage>
);

export default Page;
