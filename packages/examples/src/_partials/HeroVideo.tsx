import type { ComponentChildren } from 'preact';
import { Script } from './Script.tsx';

type HeroVideoProps = {
  /** What lies on the video, placed by the page – give it `z-1`, between the video and its pause control. */
  children: ComponentChildren;
};

/**
 * An autoplaying hero video, the content lying on it, and the control pausing it – with the script operating the two.
 *
 * WCAG 2.2 asks for every animation that starts on its own to be stoppable, so the video and its pause control are one
 * component: a page cannot render the one without the other, and the ids the script looks up stay in this file.
 *
 * It renders grid items, not a wrapper: the section of the page is the grid (`grid-cols-subgrid`), and the video, the
 * content and the control all span its rows, stacked by `z-0`, `z-1` and `z-2`.
 */
export const HeroVideo = ({ children }: HeroVideoProps) => (
  <>
    <video
      id="hero-video"
      class="z-0 col-span-full row-span-full min-w-full w-full min-h-full h-full object-cover object-center"
      poster="/examples/media/mood-porsche-gts.webp"
      loop
      muted
      autoplay
      playsinline
    >
      <source src="/examples/media/mood-porsche-gts.mp4" type="video/mp4" />
      <source src="/examples/media/mood-porsche-gts.webm" type="video/webm" />
    </video>
    {children}
    <p-button
      class="z-2 col-wide place-self-end row-span-full mb-fluid-lg"
      variant="secondary"
      compact="true"
      hide-label="true"
      icon="pause"
      id="pause-button"
    >
      Pause Video
    </p-button>
    <Script>{
      /* language=JavaScript */ `
      // Behaviour of the hero video: a pause control that follows the actual state of the video.

      const video = document.getElementById('hero-video');
      const pauseButton = document.getElementById('pause-button');

      // The button hides its label, so its text content is its accessible name – it has to follow the actual state of
      // the video, not the last click. Deriving it from the media events also covers autoplay being refused by the
      // browser.
      const syncPauseButton = () => {
        pauseButton.textContent = video.paused ? 'Play Video' : 'Pause Video';
        pauseButton.icon = video.paused ? 'play' : 'pause';
      };

      video.addEventListener('play', syncPauseButton);
      video.addEventListener('pause', syncPauseButton);

      pauseButton.addEventListener('click', () => {
        video[video.paused ? 'play' : 'pause']();
      });

      // WCAG 2.2: an animation that starts on its own must be stoppable – and it must not start at all when the
      // operating system was asked for reduced motion.
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        video.autoplay = false;
        video.pause();
      }

      syncPauseButton();
    `
    }</Script>
  </>
);
