import { spacingFluidMedium, spacingStaticSmall, textSmallStyle } from '@porsche-design-system/styles';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  colors,
  hostHiddenStyles,
  preventFoucOfNestedElementsStyles,
} from '../../../styles';
import { getCss } from '../../../utils';
import type { TableLayout } from './table-utils';

export const cssVariableTablePadding = '--p-internal-table-padding';
export const cssVariableTableHoverColor = '--p-internal-table-hover-color';
export const cssVariableTableBorderColor = '--p-internal-table-border-color';
export const cssVariableTableBorderWidth = '--p-internal-table-border-width';
export const cssVariableTableHeadCellIconFilter = '--p-internal-table-head-cell-icon-filter';

const { primaryColor, frostedColor, contrastLowColor } = colors;

export const getComponentCss = (compact: boolean, layout: TableLayout): string => {
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
        }),
      },
      ...preventFoucOfNestedElementsStyles,
      '::slotted(*)': addImportantToEachRule({
        ...(compact && { [cssVariableTablePadding]: spacingStaticSmall }),
        [cssVariableTableHoverColor]: frostedColor,
        [cssVariableTableBorderColor]: contrastLowColor,
      }),
    },
    caption: {
      marginBottom: spacingFluidMedium,
    },
    table: {
      display: 'table',
      borderCollapse: 'collapse',
      // with table-layout: fixed, width: 100% crops border-bottom of p-table-row when scrollable
      // also relative width units (%, vw) don't work as expected when scrollable or combined with auto columns
      ...(layout === 'fixed'
        ? {
            tableLayout: 'fixed',
            minWidth: '100%',
          }
        : { width: '100%' }),
      whiteSpace: 'nowrap', // shouldn't be inherited for caption, that's why it's defined here
    },
  });
};
