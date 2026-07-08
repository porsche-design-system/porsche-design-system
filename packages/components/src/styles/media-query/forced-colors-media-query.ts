import type { CssStyle } from '../../utils/css-serializer';

export const forcedColorsMediaQuery = (style: CssStyle): CssStyle => {
  return { '@media(forced-colors:active)': style };
};
