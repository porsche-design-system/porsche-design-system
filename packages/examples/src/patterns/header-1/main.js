// DO NOT USE IN PRODUCTION!
// EXAMPLE CODE FOR DEMONSTRATION PURPOSE ONLY.

// Page behaviour of this pattern. The header itself is wired by the shared `assets/header.js`, which every page
// showing the `single-row` header loads.

const video = document.querySelector('video');
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
