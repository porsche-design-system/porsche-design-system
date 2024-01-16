import { getComponentCss } from './flex-item-styles';
import type {
  FlexItemAlignSelf,
  FlexItemFlex,
  FlexItemGrow,
  FlexItemOffset,
  FlexItemShrink,
  FlexItemWidth,
} from './flex-item-utils';
import {
  FLEX_ITEM_ALIGN_SELFS,
  FLEX_ITEM_FLEXS,
  FLEX_ITEM_GROWS,
  FLEX_ITEM_OFFSETS,
  FLEX_ITEM_SHRINKS,
  FLEX_ITEM_WIDTHS,
} from './flex-item-utils';
import type { BreakpointCustomizable } from '../../../types';
import { validateCssAndMatchSnapshot } from '../../../../tests/unit/helpers';

describe('getComponentCss()', () => {
  const dataWidth: BreakpointCustomizable<FlexItemWidth>[] = [
    ...FLEX_ITEM_WIDTHS,
    { base: 'auto', xs: 'half', s: 'auto', m: 'half', l: 'auto', xl: 'half' },
  ];
  it.each<BreakpointCustomizable<FlexItemWidth>>(dataWidth)('should return correct css for width: %j', (width) => {
    validateCssAndMatchSnapshot(getComponentCss(width, 'none', 'auto', 0, 1, 'initial'));
  });

  const dataOffset: BreakpointCustomizable<FlexItemOffset>[] = [
    ...FLEX_ITEM_OFFSETS,
    { base: 'one-third', xs: 'half', s: 'one-third', m: 'half', l: 'one-third', xl: 'half' },
  ];
  it.each<BreakpointCustomizable<FlexItemOffset>>(dataOffset)('should return correct css for offset: %j', (offset) => {
    validateCssAndMatchSnapshot(getComponentCss('auto', offset, 'auto', 0, 1, 'initial'));
  });

  const dataAlignSelf: BreakpointCustomizable<FlexItemAlignSelf>[] = [
    ...FLEX_ITEM_ALIGN_SELFS,
    { base: 'stretch', xs: 'center', s: 'stretch', m: 'center', l: 'stretch', xl: 'center' },
  ];
  it.each<BreakpointCustomizable<FlexItemAlignSelf>>(dataAlignSelf)(
    'should return correct css for alignSelf: %j',
    (alignSelf) => {
      validateCssAndMatchSnapshot(getComponentCss('auto', 'none', alignSelf, 0, 1, 'initial'));
    }
  );

  const dataGrow: BreakpointCustomizable<FlexItemGrow>[] = [
    ...FLEX_ITEM_GROWS,
    { base: 1, xs: 0, s: 1, m: 0, l: 1, xl: 0 },
  ];
  it.each<BreakpointCustomizable<FlexItemGrow>>(dataGrow)('should return correct css for grow: %j', (grow) => {
    validateCssAndMatchSnapshot(getComponentCss('auto', 'none', 'auto', grow, 1, 'initial'));
  });

  const dataShrink: BreakpointCustomizable<FlexItemShrink>[] = [
    ...FLEX_ITEM_SHRINKS,
    { base: 0, xs: 1, s: 0, m: 1, l: 0, xl: 1 },
  ];
  it.each<BreakpointCustomizable<FlexItemShrink>>(dataShrink)('should return correct css for shrink: %j', (shrink) => {
    validateCssAndMatchSnapshot(getComponentCss('auto', 'none', 'auto', 0, shrink, 'initial'));
  });

  const dataFlex: BreakpointCustomizable<FlexItemFlex>[] = [
    ...FLEX_ITEM_FLEXS,
    { base: 'auto', xs: 'equal', s: 'auto', m: 'equal', l: 'auto', xl: 'equal' },
  ];
  it.each<BreakpointCustomizable<FlexItemFlex>>(dataFlex)('should return correct css for flex: %j', (flex) => {
    validateCssAndMatchSnapshot(getComponentCss('auto', 'none', 'auto', 0, 1, flex));
  });

  it('should return correct css for all props being breakpoint customizable', () => {
    validateCssAndMatchSnapshot(
      getComponentCss(
        [...dataWidth].pop(),
        [...dataOffset].pop(),
        [...dataAlignSelf].pop(),
        [...dataGrow].pop(),
        [...dataShrink].pop(),
        [...dataFlex].pop()
      )
    );
  });
});
