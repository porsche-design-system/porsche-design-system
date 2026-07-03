import type { JssStyle } from '../../utils/emotionCss';

export const forcedColorsMediaQuery = (style: JssStyle): JssStyle => {
  return { '@media(forced-colors:active)': style };
};
