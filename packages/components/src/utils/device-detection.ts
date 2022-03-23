import { isBrowser } from './ssr-handling';

export const isTouchDevice = (): boolean => {
  if (!isBrowser()) {
    return;
  }
  return !!('ontouchstart' in window || window.navigator.maxTouchPoints > 0);
};
