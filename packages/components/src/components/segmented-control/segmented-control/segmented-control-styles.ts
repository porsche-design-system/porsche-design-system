import { spacingStaticXSmall } from '@porsche-design-system/emotion';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  getDisabledBaseStyles,
  hostHiddenStyles,
  preventFoucOfNestedElementsStyles,
} from '../../../styles';
import type { BreakpointCustomizable } from '../../../types';
import { buildResponsiveStyles, getCss } from '../../../utils';
import { getFunctionalComponentLabelStyles } from '../../common/label/label-styles';
import { getFunctionalComponentStateMessageStyles } from '../../common/state-message/state-message-styles';
import type { SegmentedControlColumns, SegmentedControlState } from './segmented-control-utils';

export const MIN_ITEM_WIDTH = 46;
const MAX_ITEM_WIDTH = 220;

export const getComponentCss = (
  minWidth: number | string,
  maxWidth: number,
  columns: BreakpointCustomizable<SegmentedControlColumns>,
  disabled: boolean,
  hideLabel: BreakpointCustomizable<boolean>,
  state: SegmentedControlState
): string => {
  return getCss({
    '@global': {
      ':host': {
        ...addImportantToEachRule({
          ...(disabled && getDisabledBaseStyles()),
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
              ? `repeat(auto-fit, ${(maxWidth > MAX_ITEM_WIDTH && MAX_ITEM_WIDTH) || (maxWidth < MIN_ITEM_WIDTH && minWidth) || maxWidth}px)`
              : `repeat(${col}, minmax(0, 1fr))`,
        })),
        gap: '6px',
      },
    },
    root: {
      all: 'unset',
      display: 'grid',
      gap: spacingStaticXSmall,
    },
    // .label / .required
    ...getFunctionalComponentLabelStyles(disabled, hideLabel, {
      ...(disabled ? getDisabledBaseStyles() : { cursor: 'inherit' }), // the label is not clickable
    }),
    // .message
    ...getFunctionalComponentStateMessageStyles(state),
  });
};
