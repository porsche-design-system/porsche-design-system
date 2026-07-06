import type { JssStyle } from '../../utils/css-serializer';

/**
 * Utility to wrap JSS styles in `@media (pointer: coarse)`,
 * which targets touch devices with an imprecise pointer.
 */
export const pointerCoarseMediaQuery = (style: JssStyle): JssStyle => {
  return { '@media(pointer:coarse)': style };
};
