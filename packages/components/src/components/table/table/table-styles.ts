import {
  colorContrastLow,
  colorFrosted,
  colorPrimary,
  fontPorscheNext,
  fontWeightNormal,
  leadingNormal,
  ref,
  spacingFluidMd,
  spacingFluidSm,
  spacingStaticSm,
  typescaleSm,
} from '@porsche-design-system/stylesheets';
import { addImportantToEachRule, hostHiddenStyles, preventFoucOfNestedElementsStyles } from '../../../styles';
import { getCss } from '../../../utils';
import type { TableLayout } from './table-utils';

/**
 * @css-variable {"name": "--p-table-scroll-indicator-top", "description": "Defines the distance from the top of the viewport at which the scroll indicator sticks when scrolling down and `sticky` is enabled.", "defaultValue": "0px"}
 */
const cssVarScrollIndicatorTop = '--p-table-scroll-indicator-top';

/**
 * @css-variable {"name": "--p-table-scroll-indicator-bottom", "description": "Defines the distance from the bottom of the viewport at which the scroll indicator sticks when scrolling up and `sticky` is enabled.", "defaultValue": "0px"}
 */
const cssVarScrollIndicatorBottom = '--p-table-scroll-indicator-bottom';

export const cssVariableTablePadding = '--_p-table-a';
export const cssVariableTableHoverColor = '--_p-table-b';
export const cssVariableTableBorderColor = '--_p-table-c';
export const cssVariableTableBorderWidth = '--_p-table-d';

export const getComponentCss = (isCompact: boolean, layout: TableLayout): string => {
  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          '--p-scroller-indicator-top': ref(cssVarScrollIndicatorTop, '0px'),
          '--p-scroller-indicator-bottom': ref(cssVarScrollIndicatorBottom, '0px'),
          [cssVariableTableHoverColor]: ref(colorFrosted),
          [cssVariableTableBorderColor]: ref(colorContrastLow),
          [cssVariableTablePadding]: isCompact ? ref(spacingStaticSm) : ref(spacingFluidSm),
          [cssVariableTableBorderWidth]: '1px',
          ...hostHiddenStyles,
          font: `${ref(fontWeightNormal)} ${ref(typescaleSm)} / ${ref(leadingNormal)} ${ref(fontPorscheNext)}`,
          color: ref(colorPrimary),
          textAlign: 'start',
        }),
      },
      ...preventFoucOfNestedElementsStyles,
    },
    caption: {
      marginBottom: ref(spacingFluidMd),
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
