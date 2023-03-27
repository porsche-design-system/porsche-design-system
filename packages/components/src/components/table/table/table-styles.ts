import type { Theme } from '../../../types';
import { textSmallStyle, spacingFluidMedium } from '@porsche-design-system/utilities-v2';
import { getCss, isThemeDark } from '../../../utils';
import { addImportantToEachRule, hostHiddenStyles, doGetThemedColors } from '../../../styles';

export const cssVariableTableHoverColor = '--p-internal-table-hover-color';
export const cssVariableTableBorderColor = '--p-internal-table-border-color';
export const cssVariableTableHeadCellIconFilter = '--p-internal-table-head-cell-icon-filter';

export const getComponentCss = (theme: Theme): string => {
  const { primaryColor, hoverColor, contrastLowColor } = doGetThemedColors(theme);

  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        display: 'block',
        ...hostHiddenStyles,
      }),
      '::slotted(*)': addImportantToEachRule({
        [cssVariableTableHoverColor]: hoverColor,
        [cssVariableTableBorderColor]: contrastLowColor,
        [cssVariableTableHeadCellIconFilter]: isThemeDark(theme) ? 'invert(100%)' : 'none',
      }),
    },
    caption: {
      marginBottom: spacingFluidMedium,
    },
    table: {
      display: 'table',
      borderCollapse: 'collapse',
      width: '100%',
      ...textSmallStyle,
      textAlign: 'left',
      color: primaryColor,
      whiteSpace: 'nowrap',
    },
  });
};
