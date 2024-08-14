import { getDirectChildHTMLElement } from '../dom';
import { prefersReducedMotionQueryMatches } from '../match-media';

export const stopAutoPlayOfSlottedVideoOnPrefersReducedMotion = (host: HTMLElement): void => {
  const video: HTMLVideoElement = getDirectChildHTMLElement(host, 'video');
  if (video && prefersReducedMotionQueryMatches) {
    video.pause();
  }
};
