import { buildResponsiveStyles, getCss } from '../../../utils';
import { addImportantToEachRule, hostHiddenStyles } from '../../../styles';
import type { BreakpointCustomizable } from '../../../types';
import { SegmentedControlColumn } from './segmented-control-utils';

const MIN_ITEM_WIDTH = 46;
const MAX_ITEM_WIDTH = 220;

export const getComponentCss = (
  maxItemWidth: number,
  columns: BreakpointCustomizable<SegmentedControlColumn>
): string => {
  const maxWidth =
    (maxItemWidth > MAX_ITEM_WIDTH && MAX_ITEM_WIDTH) ||
    (maxItemWidth < MIN_ITEM_WIDTH && MIN_ITEM_WIDTH) ||
    maxItemWidth;

  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        display: 'grid',
        gridAutoRows: '1fr', // for equal height
        ...buildResponsiveStyles(columns, (col: number | 'auto') => ({
          gridTemplateColumns: col === 'auto' ? `repeat(auto-fit, ${maxWidth}px)` : `repeat(${col}, minmax(0, 1fr))`,
        })),
        gap: '6px',
        ...hostHiddenStyles,
      }),
    },
  });
};
