import { textSmallStyle, spacingFluidMedium } from '@porsche-design-system/utilities-v2';
import { getCss } from '../../../utils';
import { getThemedColors, addImportantToEachRule, hostHiddenStyles } from '../../../styles';
import type { Theme } from '../../../types';

export const cssVariableTableRowHoverColor = '--p-internal-table-row-hover-color';
export const cssVariableTableBorderColor = '--p-internal-table-border-color';
export const cssVariableTableTheme = '--p-internal-table-theme';
export const getComponentCss = (theme: Theme): string => {
  const { primaryColor } = getThemedColors(theme);

  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        display: 'block',
        ...hostHiddenStyles,
      }),
      '::slotted(*)': addImportantToEachRule({
        [cssVariableTableRowHoverColor]: getThemedColors(theme).backgroundSurfaceColor,
        [cssVariableTableBorderColor]: getThemedColors(theme).contrastLowColor,
        [cssVariableTableTheme]: theme,
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
