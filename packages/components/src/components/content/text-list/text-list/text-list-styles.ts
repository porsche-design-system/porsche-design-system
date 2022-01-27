import type { Theme } from '../../../../types';
import { buildSlottedStyles, getCss } from '../../../../utils';
import { addImportantToRule, getBaseSlottedStyles, getThemedColors } from '../../../../styles';
import { textSmall } from '@porsche-design-system/utilities-v2';

export const getComponentCss = (theme: Theme): string => {
  return getCss({
    ':host': {
      counterReset: addImportantToRule('section'),
      display: 'block',
    },
    '@global': {
      '[role]': {
        display: 'block',
        padding: 0,
        margin: 0,
        color: getThemedColors(theme).baseColor,
        ...textSmall,
      },
    },
  });
};

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(buildSlottedStyles(host, getBaseSlottedStyles()));
};
