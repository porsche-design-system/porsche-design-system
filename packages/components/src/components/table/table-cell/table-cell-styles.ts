import { getCss } from '../../../utils';
import { addImportantToEachRule, getTransition, hostHiddenStyles } from '../../../styles';
import { borderRadiusSmall, spacingFluidSmall } from '@porsche-design-system/utilities-v2';
import { cssVariableTableRowBackgroundColor } from '../table-row/table-row-styles';

export const getComponentCss = (multiline: boolean): string => {
  return getCss({
    '@global': {
      ':host': {
        ...addImportantToEachRule({
          display: 'table-cell',
          padding: spacingFluidSmall,
          margin: 0,
          whiteSpace: multiline ? 'normal' : 'nowrap',
          transition: getTransition('background'),
          background: `var(${cssVariableTableRowBackgroundColor}, transparent)`,
          '&(:first-child)': {
            borderTopLeftRadius: borderRadiusSmall,
            borderBottomLeftRadius: borderRadiusSmall,
          },
          '&(:last-child)': {
            borderTopRightRadius: borderRadiusSmall,
            borderBottomRightRadius: borderRadiusSmall,
          },
          ...hostHiddenStyles,
        }),
        verticalAlign: 'middle',
      },
    },
  });
};
