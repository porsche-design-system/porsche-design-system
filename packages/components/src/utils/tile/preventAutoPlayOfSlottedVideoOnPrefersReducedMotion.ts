import { getDirectChildHTMLElement } from '../dom';

export const preventAutoPlayOfSlottedVideoOnPrefersReducedMotion = (host: HTMLElement): void => {
  const video: HTMLVideoElement = getDirectChildHTMLElement(host, 'video');
  if (video?.hasAttribute('autoplay') && matchMedia('(prefers-reduced-motion)').matches) {
    video.pause();
  }
};
