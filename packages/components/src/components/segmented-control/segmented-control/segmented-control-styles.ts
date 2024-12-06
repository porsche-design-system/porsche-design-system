import { addImportantToEachRule, colorSchemeStyles, hostHiddenStyles } from '../../../styles';
import type { BreakpointCustomizable } from '../../../types';
import { buildResponsiveStyles, getCss } from '../../../utils';
import type { SegmentedControlColumns } from './segmented-control-utils';

const MIN_ITEM_WIDTH = 46;
const MAX_ITEM_WIDTH = 220;

export const getComponentCss = (maxWidth: number, columns: BreakpointCustomizable<SegmentedControlColumns>): string => {
  return getCss({
    '@global': {
      ':host': {
        display: 'grid',
        ...addImportantToEachRule({
          gridAutoRows: '1fr', // for equal height
          ...buildResponsiveStyles(columns, (col: SegmentedControlColumns) => ({
            gridTemplateColumns:
              col === 'auto'
                ? `repeat(auto-fit, ${(maxWidth > MAX_ITEM_WIDTH && MAX_ITEM_WIDTH) || (maxWidth < MIN_ITEM_WIDTH && MIN_ITEM_WIDTH) || maxWidth}px)`
                : `repeat(${col}, minmax(0, 1fr))`,
          })),
          gap: '6px',
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
    },
  });
};
