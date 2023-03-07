import { getCss } from '../../../utils';
import {
  addImportantToEachRule,
  hostHiddenStyles,
  hoverMediaQuery,
  getInsetJssStyle,
  getTransition,
  getThemedColors,
} from '../../../styles';
import { borderRadiusSmall } from '@porsche-design-system/utilities-v2';
import { cssVariableTableRowHoverColor } from '../table/table-styles';

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
            ...getInsetJssStyle(-2),
            borderRadius: borderRadiusSmall,
            transition: getTransition('background-color'),
          },
          '&(:hover)::before': {
            background: `var(${cssVariableTableRowHoverColor}, ${getThemedColors('light').backgroundSurfaceColor})`,
          },
        }),
      }),
    },
  });
};
