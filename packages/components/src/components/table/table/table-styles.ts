import { spacingFluidMedium, textSmallStyle, spacingStaticSmall } from '@porsche-design-system/styles';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  doGetThemedColors,
  getSchemedHighContrastMediaQuery,
  hostHiddenStyles,
  prefersColorSchemeDarkMediaQuery,
  preventFoucOfNestedElementsStyles,
} from '../../../styles';
import type { Theme } from '../../../types';
import { getCss, isHighContrastMode, isThemeDark } from '../../../utils';
import type { TableLayout } from './table-utils';

export const cssVariableTablePadding = '--p-internal-table-padding';
export const cssVariableTableHoverColor = '--p-internal-table-hover-color';
export const cssVariableTableBorderColor = '--p-internal-table-border-color';
export const cssVariableTableBorderWidth = '--p-internal-table-border-width';
export const cssVariableTableHeadCellIconFilter = '--p-internal-table-head-cell-icon-filter';

export const getComponentCss = (compact: boolean, layout: TableLayout, theme: Theme): string => {
  const { primaryColor, hoverColor, contrastLowColor } = doGetThemedColors(theme);
  const {
    primaryColor: primaryColorDark,
    hoverColor: hoverColorDark,
    contrastLowColor: contrastLowColorDark,
  } = doGetThemedColors('dark');

  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          ...textSmallStyle,
          color: primaryColor,
          textAlign: 'start',
          ...colorSchemeStyles,
          ...hostHiddenStyles,
          ...prefersColorSchemeDarkMediaQuery(theme, {
            color: primaryColorDark,
          }),
        }),
      },
      ...preventFoucOfNestedElementsStyles,
      '::slotted(*)': addImportantToEachRule({
        ...(compact && { [cssVariableTablePadding]: spacingStaticSmall }),
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
      ...(layout === 'fixed' && { tableLayout: 'fixed' }),
      width: '100%',
      whiteSpace: 'nowrap', // shouldn't be inherited for caption, that's why it's defined here
    },
  });
};
