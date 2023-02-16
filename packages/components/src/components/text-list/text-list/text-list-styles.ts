import type { Theme } from '../../../types';
import { getCss } from '../../../utils';
import { addImportantToEachRule, getThemedColors, hostHiddenStyles } from '../../../styles';
import { textSmallStyle } from '@porsche-design-system/utilities-v2';

export const getComponentCss = (theme: Theme): string => {
  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          counterReset: 'section',
          ...hostHiddenStyles,
        }),
      },
      '[role]': {
        display: 'block',
        padding: 0,
        margin: 0,
        color: getThemedColors(theme).primaryColor,
        ...textSmallStyle,
      },
    },
  });
};
