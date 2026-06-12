const parseCssTimeToMs = (value: string): number => {
  const trimmed = value.trim();
  const num = Number.parseFloat(trimmed);
  if (Number.isNaN(num)) {
    return 0;
  }
  return trimmed.endsWith('ms') ? num : num * 1000; // seconds otherwise
};

/**
 * Returns the longest `transition-duration` + `transition-delay` (in ms) across an element's computed transitions.
 * Useful as a safety-net timeout when a `transitionend` event might not fire (e.g. with reduced motion or a 0 duration).
 *
 * @param {HTMLElement} element - The element to read the computed transition values from.
 * @returns {number} The maximum combined duration and delay in milliseconds.
 */
export const getMaxTransitionDurationMs = (element: HTMLElement): number => {
  const { transitionDuration, transitionDelay } = getComputedStyle(element);
  const durations = transitionDuration.split(',');
  const delays = transitionDelay.split(',');
  return durations.reduce((max, duration, index) => {
    const total = parseCssTimeToMs(duration) + parseCssTimeToMs(delays[index] ?? '0s');
    return total > max ? total : max;
  }, 0);
};
