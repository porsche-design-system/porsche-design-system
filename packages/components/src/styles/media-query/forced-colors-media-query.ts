import type { JssStyle } from 'jss';

export const forcedColorsMediaQuery = (style: JssStyle): JssStyle => {
  return { '@media (forced-colors: active)': style };
};
