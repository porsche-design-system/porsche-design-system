import type { Theme } from '../../../types';
import { buildSlottedStyles, getCss } from '../../../utils';
import { addImportantToRule, getBaseSlottedStyles, getThemedColors } from '../../../styles';
import { textSmallFluid } from '@porsche-design-system/utilities-v2';

export const getComponentCss = (theme: Theme): string => {
  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        counterReset: addImportantToRule('section'),
      },
      '[role]': {
        display: 'block',
        padding: 0,
        margin: 0,
        color: getThemedColors(theme).primaryColor,
        ...textSmallFluid,
      },
    },
  });
};

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(buildSlottedStyles(host, getBaseSlottedStyles({ withDarkTheme: true })));
};
