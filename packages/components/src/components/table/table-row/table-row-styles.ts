import { getCss } from '../../../utils';
import { addImportantToEachRule, getTransition, hostHiddenStyles, hoverMediaQuery } from '../../../styles';
import { cssVariableTableBorderColor, cssVariableTableHoverColor } from '../table/table-styles';

export const getComponentCss = (): string => {
  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        display: 'table-row',
        borderTop: `1px solid var(${cssVariableTableBorderColor})`,
        borderBottom: `1px solid var(${cssVariableTableBorderColor})`,
        transition: getTransition('background'),
        ...hostHiddenStyles,
        ...hoverMediaQuery({
          '&(:hover)': {
            // ...frostedGlassStyle, // will result in not smooth transition when applied
            background: `var(${cssVariableTableHoverColor})`,
          },
        }),
      }),
    },
  });
};
