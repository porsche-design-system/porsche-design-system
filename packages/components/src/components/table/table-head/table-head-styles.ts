import { fontLineHeight, fontSizeTextXSmall, fontWeightSemiBold } from '@porsche-design-system/styles';
import { addImportantToEachRule, hostHiddenStyles } from '../../../styles';
import { getCss } from '../../../utils';
import { cssVariableTableBorderWidth, cssVariableTableHoverColor } from '../table/table-styles';

export const getComponentCss = (): string => {
  return getCss({
    '@global': {
      ':host': {
        display: 'table-header-group',
        ...addImportantToEachRule({
          fontSize: fontSizeTextXSmall,
          lineHeight: fontLineHeight,
          fontWeight: fontWeightSemiBold,
          ...hostHiddenStyles,
        }),
      },
      '::slotted(*)': addImportantToEachRule({
        [cssVariableTableBorderWidth]: '0px',
        [cssVariableTableHoverColor]: 'none',
      }),
    },
  });
};
