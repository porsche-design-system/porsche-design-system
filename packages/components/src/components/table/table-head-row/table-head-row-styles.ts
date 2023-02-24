import { getCss } from '../../../utils';
import { addImportantToEachRule, hostHiddenStyles } from '../../../styles';

export const getComponentCss = (): string => {
  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        display: 'table-row',
        ...hostHiddenStyles,
        '&::before': {
          // since "before" element counts as table cell, and we have "before" in table rows, we have to add it also to table-head-row to make it to have the same amount of cells
          content: '""',
        },
      }),
    },
  });
};
