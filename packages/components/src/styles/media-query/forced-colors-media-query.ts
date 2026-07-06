import type { JssStyle } from '../../utils/css-serializer';

export const forcedColorsMediaQuery = (style: JssStyle): JssStyle => {
  return { '@media(forced-colors:active)': style };
};
