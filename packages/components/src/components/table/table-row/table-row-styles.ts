import { addImportantToEachRule, getTransition, hostHiddenStyles, hoverMediaQuery } from '../../../styles';
import { getCss } from '../../../utils';
import {
  cssVariableTableBorderColor,
  cssVariableTableBorderWidth,
  cssVariableTableHoverColor,
} from '../table/table-styles';

export const getComponentCss = (): string => {
  return getCss({
    '@global': {
      ':host': {
        display: 'table-row',
        ...addImportantToEachRule({
          borderTop: `var(${cssVariableTableBorderWidth},1px) solid var(${cssVariableTableBorderColor})`,
          borderBottom: `var(${cssVariableTableBorderWidth},1px) solid var(${cssVariableTableBorderColor})`,
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
    },
  });
};
