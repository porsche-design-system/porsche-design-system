import type { CssStyle } from '../../utils/css-serializer';

/**
 * Utility to wrap JSS styles in `@media (pointer: coarse)`,
 * which targets touch devices with an imprecise pointer.
 */
export const pointerCoarseMediaQuery = (style: CssStyle): CssStyle => {
  return { '@media(pointer:coarse)': style };
};
