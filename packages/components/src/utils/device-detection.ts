import { hasWindow } from './has-window';

export const isTouchDevice = (): boolean | void => {
  if (!hasWindow) {
    return;
  }
  return !!('ontouchstart' in window || window.navigator.maxTouchPoints > 0);
};
