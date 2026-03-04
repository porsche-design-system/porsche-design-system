import { spacingFluidMedium, spacingStaticSmall, textSmallStyle } from '@porsche-design-system/emotion';
import { addImportantToEachRule, hostHiddenStyles, preventFoucOfNestedElementsStyles } from '../../../styles';
import { colorContrastLow, colorFrosted, colorPrimary } from '../../../styles/css-variables';
import { getCss } from '../../../utils';
import type { TableLayout } from './table-utils';

/**
 * @css-variable {"name": "--p-table-scroll-indicator-top", "description": "Defines the distance from the top of the viewport at which the scroll indicator sticks when scrolling down and `scroll-indicator-sticky` is enabled.", "defaultValue": "0px"}
 */
const cssVarScrollIndicatorTop = '--p-table-scroll-indicator-top';

/**
 * @css-variable {"name": "--p-table-scroll-indicator-bottom", "description": "Defines the distance from the bottom of the viewport at which the scroll indicator sticks when scrolling up and `scroll-indicator-sticky` is enabled.", "defaultValue": "0px"}
 */
const cssVarScrollIndicatorBottom = '--p-table-scroll-indicator-bottom';

export const cssVariableTablePadding = '--_a';
export const cssVariableTableHoverColor = '--_b';
export const cssVariableTableBorderColor = '--_c';
export const cssVariableTableBorderWidth = '--_d';

export const getComponentCss = (isCompact: boolean, layout: TableLayout): string => {
  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          '--p-scroller-indicator-top': `var(${cssVarScrollIndicatorTop},0px)`,
          '--p-scroller-indicator-bottom': `var(${cssVarScrollIndicatorBottom},0px)`,
          [cssVariableTableHoverColor]: colorFrosted,
          [cssVariableTableBorderColor]: colorContrastLow,
          ...(isCompact && {
            [cssVariableTablePadding]: spacingStaticSmall,
          }),
          ...hostHiddenStyles,
          ...textSmallStyle,
          color: colorPrimary,
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
