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

const MIN_ITEM_WIDTH = 46;
const MAX_ITEM_WIDTH = 220;

export const getComponentCss = (
  maxWidth: number,
  columns: BreakpointCustomizable<SegmentedControlColumns>,
  state: SegmentedControlState,
  theme: Theme
): string => {
  return getCss({
    '@global': {
      ':host': {
        ...addImportantToEachRule({
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
    ...(state !== 'none' && {
      root: {
        display: 'grid',
        gap: spacingStaticXSmall,
      },
    }),
    // .message
    ...getFunctionalComponentStateMessageStyles(theme, state),
  });
};
