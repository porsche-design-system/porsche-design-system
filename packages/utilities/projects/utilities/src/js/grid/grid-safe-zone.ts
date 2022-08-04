// TODO: reduce to one const by using clamp() + pow() as soon as browser support is given
// Read this article on how to apply and calculate poly fluid sizing: https://www.smashingmagazine.com/2017/05/fluid-responsive-typography-css-poly-fluid-sizing/
export const gridSafeZone = {
  base: 'max(1rem, 7vw)',
  xl: 'min(calc(43vw - 39.6rem), 12rem)',
};
