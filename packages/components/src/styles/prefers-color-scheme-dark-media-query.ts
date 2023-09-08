import type { JssStyle } from 'jss';
import type { Theme } from '@porsche-design-system/utilities-v2';
import { isThemeAuto } from '../utils';

export const prefersColorSchemeDarkMediaQuery = (theme: Theme, style: JssStyle): JssStyle => {
  return isThemeAuto(theme) && { '@media (prefers-color-scheme: dark)': style };
};
