import { spacingStaticXSmall } from '@porsche-design-system/styles';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  hostHiddenStyles,
  preventFoucOfNestedElementsStyles,
} from '../../../styles';
import type { BreakpointCustomizable, Theme } from '../../../types';
import { buildResponsiveStyles, getCss } from '../../../utils';
import { getFunctionalComponentStateMessageStyles } from '../../common/state-message/state-message-styles';
import type { SegmentedControlColumns, SegmentedControlState } from './segmented-control-utils';
import { getScalingVar } from '../segmented-control-item/segmented-control-item-styles';

const MIN_ITEM_WIDTH = 46;
const MAX_ITEM_WIDTH = 220;

export const getComponentCss = (
  maxWidth: number,
  columns: BreakpointCustomizable<SegmentedControlColumns>,
  compact: boolean,
  state: SegmentedControlState,
  theme: Theme
): string => {
  const scalingVar = getScalingVar(compact);
  return getCss({
    '@global': {
      ':host': {
        display: 'grid',
        ...addImportantToEachRule({
          gap: `max(${spacingStaticXSmall}, ${scalingVar} * 6px)`,
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
      ...preventFoucOfNestedElementsStyles,
      'slot:not([name])': {
        display: 'grid',
        gridAutoRows: '1fr', // for equal height
        ...buildResponsiveStyles(columns, (col: SegmentedControlColumns) => ({
          gridTemplateColumns:
            col === 'auto'
              ? `repeat(auto-fit, ${(maxWidth > MAX_ITEM_WIDTH && MAX_ITEM_WIDTH) || (maxWidth < MIN_ITEM_WIDTH && MIN_ITEM_WIDTH) || maxWidth}px)`
              : `repeat(${col}, minmax(0, 1fr))`,
        })),
        gap: '6px',
      },
    },
    // .message
    ...getFunctionalComponentStateMessageStyles(theme, state),
  });
};
