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
  return getCss({
    ':host': {
      counterReset: addImportantToRule('section'),
      display: 'block',
    },
    root: {
      display: 'block',
      padding: 0,
      margin: 0,
      color: getThemedColors(theme).baseColor,
      ...defaultFontFamilyAndWeight,
      ...fontSize.small,
    },
  });
};

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(buildSlottedStyles(host, getBaseSlottedStyles()));
};
