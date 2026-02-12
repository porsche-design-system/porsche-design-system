import { fontLineHeight, fontSizeTextXSmall, fontWeightSemiBold } from '@porsche-design-system/emotion';
import { addImportantToEachRule, hostHiddenStyles } from '../../../styles';
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
        display: 'table-header-group',
        ...addImportantToEachRule({
          fontSize: fontSizeTextXSmall,
          lineHeight: fontLineHeight,
          fontWeight: fontWeightSemiBold,
          borderBottom: `1px solid var(${cssVariableTableBorderColor})`,
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
