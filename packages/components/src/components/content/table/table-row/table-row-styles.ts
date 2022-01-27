import { getCss } from '../../../../utils';
import { addImportantToEachRule, getTransition, getThemedColors } from '../../../../styles';

export const getComponentCss = (): string => {
  return getCss({
    ':host': addImportantToEachRule({
      display: 'table-row',
      transition: getTransition('background-color'),
      '&(:hover)': {
        backgroundColor: getThemedColors('light').backgroundSurfaceColor,
      },
    }),
  });
};
