import { getCss } from '../../../utils';
import {
  addImportantToEachRule,
  getTransition,
  getThemedColors,
  hostHiddenStyles,
  hoverMediaQuery,
} from '../../../styles';
import { borderRadiusSmall } from '@porsche-design-system/utilities-v2';

export const offset = '-2px';
export const getComponentCss = (): string => {
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
            left: offset,
            top: offset,
            right: offset,
            bottom: offset,
            borderRadius: borderRadiusSmall,
            transition: getTransition('background-color'),
          },
          '&(:hover)::before': {
            backgroundColor: getThemedColors('light').backgroundSurfaceColor,
          },
        }),
      }),
    },
  });
};
