import { addImportantToEachRule, hostHiddenStyles } from '../../../styles';
import { spacingFluidSm } from '../../../styles/css-variables';
import { getCss } from '../../../utils';
import { cssVariableTablePadding } from '../table/table-styles';

export const getComponentCss = (multiline: boolean): string => {
  return getCss({
    '@global': {
      ':host': {
        display: 'table-cell',
        verticalAlign: 'middle',
        ...addImportantToEachRule({
          padding: `var(${cssVariableTablePadding}, ${spacingFluidSm})`,
          margin: 0,
          whiteSpace: multiline ? 'normal' : 'nowrap',
          ...hostHiddenStyles,
        }),
      },
    },
  });
};
