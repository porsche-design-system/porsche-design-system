import {
  addImportantToRule,
  buildSlottedStyles,
  getBaseSlottedStyles,
  getCss,
  getThemedColors,
} from '../../../../utils';
import type { Theme } from '../../../../types';
import { defaultFontFamilyAndWeight, fontSize } from '@porsche-design-system/utilities';

export const getComponentCss = (theme: Theme): string => {
  const { baseColor } = getThemedColors(theme);
  return getCss({
    ':host': {
      counterReset: addImportantToRule('section'),
      display: 'block',
    },
    root: {
      display: 'block',
      padding: 0,
      margin: 0,
      color: baseColor,
      ...defaultFontFamilyAndWeight,
      ...fontSize.small,
    },
  });
};

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(buildSlottedStyles(host, getBaseSlottedStyles()));
};
