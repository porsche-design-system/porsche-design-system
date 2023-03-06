import { getCss } from '../../../utils';
import {
  addImportantToEachRule,
  getTransition,
  getThemedColors,
  hostHiddenStyles,
  hoverMediaQuery,
  getInsetJssStyle,
} from '../../../styles';
import { borderRadiusSmall } from '@porsche-design-system/utilities-v2';
import type { Theme } from '../../../types';

export const getComponentCss = (theme: Theme): string => {
  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        position: 'relative',
        display: 'table-row',
        ...hostHiddenStyles,
        ...hoverMediaQuery({
          '&::before': {
            content: '""',
            position: 'absolute',
            ...getInsetJssStyle(-2),
            borderRadius: borderRadiusSmall,
            transition: getTransition('background-color'),
          },
          '&(:hover)::before': {
            background: getThemedColors(theme).backgroundSurfaceColor,
          },
        }),
      }),
    },
  });
};
