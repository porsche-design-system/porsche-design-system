import { textSmallStyle, spacingFluidMedium } from '@porsche-design-system/utilities-v2';
import { getCss, isThemeDark } from '../../../utils';
import { addImportantToEachRule, hostHiddenStyles, doGetThemedColors } from '../../../styles';
import type { Theme } from '../../../types';

export const cssVariableTableRowHoverColor = '--p-internal-table-row-hover-color';
export const cssVariableTableBorderColor = '--p-internal-table-border-color';
export const cssVariableTableHeadCellIconFilter = '--p-internal-table-head-cell-icon-filter';
export const getComponentCss = (theme: Theme): string => {
  const { primaryColor, backgroundSurfaceColor, contrastLowColor } = doGetThemedColors(theme);

  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        display: 'block',
        ...hostHiddenStyles,
      }),
      '::slotted(*)': addImportantToEachRule({
        [cssVariableTableRowHoverColor]: backgroundSurfaceColor,
        [cssVariableTableBorderColor]: contrastLowColor,
        [cssVariableTableHeadCellIconFilter]: isThemeDark(theme) ? 'invert(100%)' : 'none',
      }),
    },
    caption: {
      marginBottom: spacingFluidMedium,
    },
    table: {
      position: 'relative',
      width: '100%',
      display: 'table',
      ...textSmallStyle,
      textAlign: 'left',
      color: primaryColor,
      whiteSpace: 'nowrap',
      borderCollapse: 'collapse', // needed for row hover state
    },
  });
};
