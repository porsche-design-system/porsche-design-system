import type { JssStyle } from 'jss';
import type { Theme } from '@porsche-design-system/styles';
import { isThemeAuto } from '../utils';

export const prefersColorSchemeDarkMediaQuery = (theme: Theme, style: JssStyle): JssStyle => {
  return isThemeAuto(theme) && { '@media (prefers-color-scheme: dark)': style };
};
