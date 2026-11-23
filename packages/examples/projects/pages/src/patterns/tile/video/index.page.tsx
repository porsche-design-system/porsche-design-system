import type { ExampleMeta } from '../../../../lib/meta.ts';
import { PatternPage } from '../../../_layouts/PatternPage.tsx';
import { VideoTile } from '../../../_partials/tile/VideoTile.tsx';

/** How the example is presented – by the storefront, in StackBlitz and in the knowledge skill. */
export const meta: ExampleMeta = {
  title: 'Tile: Video',
  description:
    'A video tile links to a category with an autoplaying mood video, e.g. a model range on porsche.com. The muted, looped video is decorative and covers the whole tile, a dark gradient at the bottom ensures the legibility of the heading. Moving content that starts on its own has to be pausable, so a pause button sits next to the link, which stretches its clickable area over the tile. The video does not start if the user prefers reduced motion.',
  colorSchemes: ['light', 'dark'],
};

/**
 * Tile pattern – a category with a mood video, built with HTML and Tailwind CSS.
 *
 * The page places the tile and gives it its content. Its markup comes from the partial, with the comments on why it
 * is built the way it is, since they reach the code a consumer copies.
 */
const Page = () => (
  <PatternPage meta={meta} centered>
    <main id="main" class="grid-template py-fluid-lg">
      <VideoTile
        class="col-basic justify-self-center w-full max-w-[560px]"
        heading="GTS models"
        href="#"
        poster="/examples/media/mood-porsche-gts.webp"
        sources={[
          { src: '/examples/media/mood-porsche-gts.mp4', type: 'video/mp4' },
          { src: '/examples/media/mood-porsche-gts.webm', type: 'video/webm' },
        ]}
      />
    </main>
  </PatternPage>
);

export default Page;
