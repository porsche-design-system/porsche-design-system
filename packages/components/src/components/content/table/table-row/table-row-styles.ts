import { getCss } from '../../../../utils';
import { addImportantToEachRule, getTransition } from '../../../../styles/common';
import { color } from '@porsche-design-system/utilities';

export const getComponentCss = (): string => {
  return getCss({
    ':host': addImportantToEachRule({
      display: 'table-row',
      transition: getTransition('background-color'),
      '&(:hover)': {
        backgroundColor: color.background.surface,
      },
    }),
  });
};
