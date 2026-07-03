import type { JssStyle } from '../../utils/jss';

export const forcedColorsMediaQuery = (style: JssStyle): JssStyle => {
  return { '@media(forced-colors:active)': style };
};
