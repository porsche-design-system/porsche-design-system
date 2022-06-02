import { getCss } from '../../../../utils';
import { addImportantToEachRule, getTransition, getThemedColors } from '../../../../styles';
import { hoverValidator } from '../../../../styles/hover-validator';

export const getComponentCss = (): string => {
  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        display: 'table-row',
        transition: getTransition('background-color'),
        ...hoverValidator({
          '&(:hover)': {
            backgroundColor: getThemedColors('light').backgroundSurfaceColor,
          },
        }),
      }),
    },
  });
};
