import type { Theme } from '../../../types';
import { textSmallStyle, spacingFluidMedium } from '@porsche-design-system/utilities-v2';
import { getCss, isThemeDark, isHighContrastMode } from '../../../utils';
import {
  addImportantToEachRule,
  hostHiddenStyles,
  doGetThemedColors,
  getSchemedHighContrastMediaQuery,
} from '../../../styles';

export const cssVariableTableHoverColor = '--p-internal-table-hover-color';
export const cssVariableTableBorderColor = '--p-internal-table-border-color';
export const cssVariableTableHeadCellIconFilter = '--p-internal-table-head-cell-icon-filter';

export const getComponentCss = (theme: Theme, sticky?: boolean): string => {
  const { primaryColor, hoverColor, contrastLowColor } = doGetThemedColors(theme);

  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        display: 'block',
        ...textSmallStyle,
        color: primaryColor,
        textAlign: 'left',
        ...hostHiddenStyles,
        '--p-internal-table-head-cell-position': sticky ? 'sticky' : 'initial',
      }),
      '::slotted(*)': addImportantToEachRule({
        [cssVariableTableHoverColor]: hoverColor,
        [cssVariableTableBorderColor]: contrastLowColor,
        [cssVariableTableHeadCellIconFilter]: isThemeDark(theme) ? 'invert(100%)' : 'none',
        ...(isHighContrastMode &&
          getSchemedHighContrastMediaQuery(
            {
              [cssVariableTableHeadCellIconFilter]: 'none',
            },
            {
              [cssVariableTableHeadCellIconFilter]: 'invert(100%)',
            }
          )),
      }),
    },
    caption: {
      marginBottom: spacingFluidMedium,
    },
    table: {
      display: 'table',
      borderCollapse: 'collapse',
      width: '100%',
      whiteSpace: 'nowrap', // shouldn't be inherited for caption, that's why it's defined here
    },
  });
};
