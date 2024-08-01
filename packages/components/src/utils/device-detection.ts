import { hasWindow } from './has-window';

export const isTouchDevice = (): boolean | undefined => {
  if (!hasWindow) {
    return undefined;
  }
  return !!('ontouchstart' in window || window.navigator.maxTouchPoints > 0);
};
