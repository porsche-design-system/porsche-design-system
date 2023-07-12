import { buildResponsiveStyles, getCss } from '../../../utils';
import { addImportantToEachRule, hostHiddenStyles } from '../../../styles';
import type { BreakpointCustomizable } from '../../../types';

const MIN_ITEM_WIDTH = 46;
const MAX_ITEM_WIDTH = 220;

export const getComponentCss = (maxItemWidth: number, columns: BreakpointCustomizable<number | 'auto'>): string => {
  const minWidth =
    (maxItemWidth > MAX_ITEM_WIDTH && MAX_ITEM_WIDTH) ||
    (maxItemWidth < MIN_ITEM_WIDTH && MIN_ITEM_WIDTH) ||
    maxItemWidth;

  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        display: 'grid',
        gridAutoRows: '1fr', // for equal height
        ...buildResponsiveStyles(columns, (col: number | 'auto') => ({
          gridTemplateColumns:
            col === 'auto' ? `repeat(auto-fit, ${minWidth}px)` : `repeat(${col}, minmax(${minWidth}px, 1fr))`,
        })),
        gap: '6px',
        ...hostHiddenStyles,
      }),
    },
  });
};
