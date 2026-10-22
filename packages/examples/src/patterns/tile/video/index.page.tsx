import type { ExampleMeta } from '../../../../lib/meta.ts';
import { PatternPage } from '../../../_layouts/PatternPage.tsx';
import { Script } from '../../../_partials/Script.tsx';

/** How the example is presented – by the storefront, in StackBlitz and in the knowledge skill. */
export const meta: ExampleMeta = {
  title: 'Tile: Video',
  description:
    'A video tile links to a category with an autoplaying mood video, e.g. a model range on porsche.com. The muted, looped video is decorative and covers the whole tile, a dark gradient at the bottom ensures the legibility of the heading. Moving content that starts on its own has to be pausable, so a pause button sits next to the link, which stretches its clickable area over the tile. The video does not start if the user prefers reduced motion.',
};

/**
 * Tile pattern – a category with a mood video, built with HTML and Tailwind CSS instead of `p-tile`.
 *
 * Laid out like the image category: the video lies behind the content via `-z-1`, within a layer that clips the zoom
 * to the corners of the tile, and the heading row carries the gradient. The pause button is an independent action, so
 * `relative z-2` places it above the covering link. It hides its label, which is its accessible name, and follows the
 * actual state of the video – see the script.
 *
 * The page follows the color scheme of the user via `scheme-light-dark`, while `scheme-only-dark` keeps the tile dark,
 * since it lies on a dark gradient or background.
 */
const Page = () => (
  <PatternPage meta={meta} class="scheme-light-dark">
    <main id="main" class="grid-template content-center min-h-dvh py-fluid-lg">
      <div class="col-basic justify-self-center w-full max-w-[560px] group relative isolate grid aspect-4/3 rounded-3xl scheme-only-dark [--p-link-cover-radius:var(--radius-3xl)]">
        <div class="absolute inset-0 -z-1 overflow-clip rounded-[inherit]">
          {/* biome-ignore lint/a11y/noAriaHiddenOnFocusable: without `controls`, the video is not focusable – it is decorative */}
          <video
            id="tile-video"
            class="size-full object-cover motion-safe:transition-[scale] duration-md ease-in-out motion-safe:group-hover:scale-105"
            poster="/examples/media/mood-porsche-gts.webp"
            aria-hidden="true"
            loop
            muted
            autoplay
            playsinline
          >
            <source src="/examples/media/mood-porsche-gts.mp4" type="video/mp4" />
            <source src="/examples/media/mood-porsche-gts.webm" type="video/webm" />
          </video>
        </div>
        <div class="self-end flex flex-wrap items-center gap-fluid-sm px-fluid-md pt-fluid-lg pb-fluid-md rounded-b-[inherit] bg-fade-to-t">
          <p-heading tag="h2" size="md" weight="semibold">
            GTS models
          </p-heading>
          <p-button
            id="tile-video-button"
            class="ms-auto relative z-2"
            type="button"
            variant="secondary"
            icon="play"
            hide-label="true"
            compact="true"
          >
            Play video
          </p-button>
          <p-link variant="secondary" icon="arrow-right" hide-label="true" compact="true" cover={true}>
            <a href="#">GTS models</a>
          </p-link>
        </div>
      </div>
    </main>
    <Script>{
      /* language=JavaScript */ `
      // Behaviour of the video tile: a pause button that follows the actual state of the video.

      const tileVideo = document.getElementById('tile-video');
      const tileVideoButton = document.getElementById('tile-video-button');

      // Derived from the media events rather than the last click, since the autoplay can be refused by the browser.
      // A video is paused until it plays, so the button starts in its paused state.
      const syncTileVideoButton = () => {
        tileVideoButton.textContent = tileVideo.paused ? 'Play video' : 'Pause video';
        tileVideoButton.icon = tileVideo.paused ? 'play' : 'pause';
      };

      tileVideo.addEventListener('play', syncTileVideoButton);
      tileVideo.addEventListener('pause', syncTileVideoButton);

      tileVideoButton.addEventListener('click', () => {
        tileVideo[tileVideo.paused ? 'play' : 'pause']();
      });

      // An animation that starts on its own must not start at all when the user prefers reduced motion.
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        tileVideo.autoplay = false;
        tileVideo.pause();
      }

      syncTileVideoButton();
    `
    }</Script>
  </PatternPage>
);

export default Page;
