export const isTouchDevice = (): boolean => {
  if (typeof window === 'undefined') {
    return;
  }
  return !!(('ontouchstart' in window) ||
    window.navigator.maxTouchPoints > 0);
};
