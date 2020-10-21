export const isTouchDevice = (): boolean => {
  if (typeof window === 'undefined') {
    return;
  }
  return !!('ontouchstart' in window || window.navigator.maxTouchPoints > 0);
};

export const isIos = (): boolean =>
  window?.navigator?.platform &&
  (/iP(ad|hone|od)/.test(window.navigator.platform) ||
    ('MacIntel' === window.navigator.platform && window.navigator.maxTouchPoints > 1));
