import { buildResponsiveStyles, getCss } from '../../../utils';
import { addImportantToEachRule, hostHiddenStyles } from '../../../styles';
import type { BreakpointCustomizable } from '../../../types';

const MIN_ITEM_WIDTH = 46;
const MAX_ITEM_WIDTH = 220;

export const getComponentCss = (maxWidth: number, column: BreakpointCustomizable<number | 'auto'>): string => {
  maxWidth = (maxWidth > MAX_ITEM_WIDTH && MAX_ITEM_WIDTH) || (maxWidth < MIN_ITEM_WIDTH && MIN_ITEM_WIDTH) || maxWidth;

  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        display: 'grid',
        gridAutoRows: '1fr', // for equal height
        ...buildResponsiveStyles(column, (col: number | 'auto') => ({
          gridTemplateColumns:
            col === 'auto' ? `repeat(auto-fit, minmax(${maxWidth}px, 1fr))` : `repeat(${col}, ${maxWidth}px)`,
        })),
        gap: '6px',
        ...hostHiddenStyles,
      }),
    },
  });
};
