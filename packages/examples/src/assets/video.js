// DO NOT USE IN PRODUCTION!
// EXAMPLE CODE FOR DEMONSTRATION PURPOSE ONLY.

// Behaviour of the hero video: a pause control that follows the actual state of the video. Every example showing an
// autoplaying video needs it, so it is written once here and inlined into the `main.js` of every page rendering the
// pause button.
//
// Both elements are addressed by id – see `src/_ids.ts`, which is where the markup takes them from as well.

const video = document.getElementById('hero-video');
const pauseButton = document.getElementById('pause-button');

if (pauseButton && video instanceof HTMLVideoElement) {
  // The button hides its label, so its text content is its accessible name – it has to follow the actual state of the
  // video, not the last click. Deriving it from the media events also covers autoplay being refused by the browser.
  const syncPauseButton = () => {
    pauseButton.textContent = video.paused ? 'Play Video' : 'Pause Video';
    pauseButton.icon = video.paused ? 'play' : 'pause';
  };

  video.addEventListener('play', syncPauseButton);
  video.addEventListener('pause', syncPauseButton);

  pauseButton.addEventListener('click', () => {
    video[video.paused ? 'play' : 'pause']();
  });

  // WCAG 2.2: an animation that starts on its own must be stoppable – and it must not start at all when the operating
  // system was asked for reduced motion.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    video.autoplay = false;
    video.pause();
  }

  syncPauseButton();
}
