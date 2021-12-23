import {
  addImportantToEachRule,
  buildHostStyles,
  buildSlottedStyles,
  getBaseSlottedStyles,
  getCss,
  getThemedColors,
} from '../../../../utils';
import type { Theme } from '../../../../types';
import { font } from '@porsche-design-system/utilities';

export const getComponentCss = (theme: Theme): string => {
  const { baseColor } = getThemedColors(theme);
  return getCss({
    ...buildHostStyles({
      ...addImportantToEachRule({
        counterReset: 'section',
      }),
      display: 'block',
    }),
    root: {
      display: 'block',
      padding: 0,
      margin: 0,
      color: baseColor,
      fontFamily: font.family,
      ...font.size.small,
      fontWeight: font.weight.regular,
    },
  });
};

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(buildSlottedStyles(host, getBaseSlottedStyles()));
};
