import type { Theme } from '../../../types';
import { textSmallStyle, spacingFluidMedium } from '@porsche-design-system/utilities-v2';
import { getCss, isThemeDark, isHighContrastMode } from '../../../utils';
import {
  addImportantToEachRule,
  hostHiddenStyles,
  doGetThemedColors,
  getSchemedHighContrastMediaQuery,
  prefersColorSchemeDarkMediaQuery,
  colorSchemeStyles,
} from '../../../styles';

export const cssVariableTableHoverColor = '--p-internal-table-hover-color';
export const cssVariableTableBorderColor = '--p-internal-table-border-color';
export const cssVariableTableHeadCellIconFilter = '--p-internal-table-head-cell-icon-filter';

export const getComponentCss = (theme: Theme): string => {
  const { primaryColor, hoverColor, contrastLowColor } = doGetThemedColors(theme);
  const {
    primaryColor: primaryColorDark,
    hoverColor: hoverColorDark,
    contrastLowColor: contrastLowColorDark,
  } = doGetThemedColors('dark');

  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        display: 'block',
        ...textSmallStyle,
        color: primaryColor,
        textAlign: 'start',
        ...colorSchemeStyles,
        ...hostHiddenStyles,
        ...prefersColorSchemeDarkMediaQuery(theme, {
          color: primaryColorDark,
        }),
      }),
      '::slotted(*)': addImportantToEachRule({
        [cssVariableTableHoverColor]: hoverColor,
        [cssVariableTableBorderColor]: contrastLowColor,
        [cssVariableTableHeadCellIconFilter]: isThemeDark(theme) ? 'invert(100%)' : 'none',
        ...prefersColorSchemeDarkMediaQuery(theme, {
          [cssVariableTableHoverColor]: hoverColorDark,
          [cssVariableTableBorderColor]: contrastLowColorDark,
          [cssVariableTableHeadCellIconFilter]: 'invert(100%)',
        }),
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
