import { getCss } from '../../../utils';
import {
  addImportantToEachRule,
  getTransition,
  getThemedColors,
  hostHiddenStyles,
  hoverMediaQuery,
} from '../../../styles';

export const getComponentCss = (): string => {
  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        display: 'table-row',
        transition: getTransition('background-color'),
        ...hostHiddenStyles,
        ...hoverMediaQuery({
          '&(:hover)': {
            backgroundColor: getThemedColors('light').backgroundSurfaceColor,
          },
        }),
      }),
    },
  });
};
