import { getCss } from '../../../utils';
import { addImportantToEachRule, hostHiddenStyles } from '../../../styles';
import { cssVariableTableBorderColor } from '../table/table-styles';

export const getComponentCss = (): string => {
  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        display: 'table-row-group',
        borderBottom: `1px solid var(${cssVariableTableBorderColor})`,
        ...hostHiddenStyles,
      }),
    },
  });
};
