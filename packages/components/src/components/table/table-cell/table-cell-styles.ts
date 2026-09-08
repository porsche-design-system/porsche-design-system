import { ref } from '@porsche-design-system/stylesheets';
import { addImportantToEachRule, hostHiddenStyles } from '../../../styles';
import { getCss } from '../../../utils';
import { cssVariableTablePadding } from '../table/table-styles';

export const getComponentCss = (multiline: boolean): string => {
  return getCss({
    '@global': {
      ':host': {
        display: 'table-cell',
        verticalAlign: 'middle',
        ...addImportantToEachRule({
          padding: ref(cssVariableTablePadding),
          margin: 0,
          whiteSpace: multiline ? 'normal' : 'nowrap',
          ...hostHiddenStyles,
        }),
      },
    },
  });
};
