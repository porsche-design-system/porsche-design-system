import { spacingFluidMedium, spacingStaticSmall, textSmallStyle } from '@porsche-design-system/emotion';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  colors,
  hostHiddenStyles,
  preventFoucOfNestedElementsStyles,
} from '../../../styles';
import { getCss } from '../../../utils';
import type { TableLayout } from './table-utils';

export const cssVariableTablePadding = '--_a';
export const cssVariableTableHoverColor = '--_b';
export const cssVariableTableBorderColor = '--_c';
export const cssVariableTableBorderWidth = '--_d';

const { primaryColor, frostedColor, contrastLowColor } = colors;

export const getComponentCss = (compact: boolean, layout: TableLayout): string => {
  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          [cssVariableTableHoverColor]: frostedColor,
          [cssVariableTableBorderColor]: contrastLowColor,
          ...(compact && { [cssVariableTablePadding]: spacingStaticSmall }),
          ...colorSchemeStyles,
          ...hostHiddenStyles,
          ...textSmallStyle,
          color: primaryColor,
          textAlign: 'start',
        }),
      },
      ...preventFoucOfNestedElementsStyles,
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
