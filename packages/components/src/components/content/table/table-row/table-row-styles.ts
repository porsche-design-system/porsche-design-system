import { getCss } from '../../../../utils';
import { addImportantToEachRule, getTransition, getThemedColors } from '../../../../styles';
import { hoverMediaQuery } from '../../../../styles/hover-media-query';

export const getComponentCss = (): string => {
  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        display: 'table-row',
        transition: getTransition('background-color'),
        ...hoverMediaQuery({
          '&(:hover)': {
            backgroundColor: getThemedColors('light').backgroundSurfaceColor,
          },
        }),
      }),
    },
  });
};
