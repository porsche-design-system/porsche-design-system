import { ids } from '../_ids.ts';
import { Script } from './Script.tsx';

type VideoPauseButtonProps = {
  /** Placement of the control on the hero it sits on – grid area and stacking order differ per page. */
  class?: string;
};

/**
 * The pause control of an autoplaying hero video, and the behaviour operating that video.
 *
 * WCAG 2.2 asks for every animation that starts on its own to be stoppable, so each page showing a hero video renders
 * this control next to it. The video itself stays in the page, because its surroundings differ; it has to carry
 * `id={ids.heroVideo}`, which is the one element the script looks up besides its own button.
 */
export const VideoPauseButton = ({ class: className }: VideoPauseButtonProps) => (
  <>
    <p-button class={className} variant="secondary" compact="true" hide-label="true" icon="pause" id={ids.pauseButton}>
      Pause Video
    </p-button>
    <Script>{`
      // Behaviour of the hero video: a pause control that follows the actual state of the video.

      const video = document.getElementById('${ids.heroVideo}');
      const pauseButton = document.getElementById('${ids.pauseButton}');

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
    `}</Script>
  </>
);
