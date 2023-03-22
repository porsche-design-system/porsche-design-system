import { getCss } from '../../../utils';
import { addImportantToEachRule, hostHiddenStyles, hoverMediaQuery } from '../../../styles';
import { cssVariableTableBorderColor, cssVariableTableRowHoverColor } from '../table/table-styles';

export const cssVariableTableRowBackgroundColor = '--p-internal-table-row-background-color';
export const getComponentCss = (): string => {
  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        position: 'relative',
        display: 'table-row',
        ...hostHiddenStyles,
        borderTop: `1px solid var(${cssVariableTableBorderColor})`,
        ...hoverMediaQuery({
          '&(:hover)': {
            borderTopColor: 'transparent',
            borderBottom: '1px solid transparent',
          },
          '&(:hover) ::slotted(*)': {
            [cssVariableTableRowBackgroundColor]: `var(${cssVariableTableRowHoverColor})`, // hoverColor is the same for light and dark
          },
        }),
      }),
    },
  });
};
