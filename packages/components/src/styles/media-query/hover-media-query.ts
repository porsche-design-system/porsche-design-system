import type { CssStyle } from '../../utils/css-serializer';

/**
 * utility to wrap jss styles parameter in `@media (hover: hover)`
 * which is used to not have hover styles on touch devices
 */
export const hoverMediaQuery = (style: CssStyle): CssStyle => {
  return { '@media(hover:hover)': style };
};
