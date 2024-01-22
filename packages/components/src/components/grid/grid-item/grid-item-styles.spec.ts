import type { GridItemOffset, GridItemSize } from './grid-item-utils';
import { GRID_ITEM_OFFSETS, GRID_ITEM_SIZES } from './grid-item-utils';
import { getComponentCss } from './grid-item-styles';
import type { BreakpointCustomizable } from '../../../types';
import { validateCssAndMatchSnapshot } from '../../../../tests/unit/helpers';

describe('getComponentCss()', () => {
  const dataSizes: BreakpointCustomizable<GridItemSize>[] = [
    ...GRID_ITEM_SIZES,
    { base: 6, xs: 12, s: 6, m: 12, l: 6, xl: 12 },
  ];
  it.each<BreakpointCustomizable<GridItemSize>>(dataSizes)('should return correct css for size: %j', (size) => {
    validateCssAndMatchSnapshot(getComponentCss(size, 0));
  });

  const dataOffsets: BreakpointCustomizable<GridItemOffset>[] = [
    ...GRID_ITEM_OFFSETS,
    { base: 6, xs: 0, s: 6, m: 0, l: 6, xl: 0 },
  ];
  it.each<BreakpointCustomizable<GridItemOffset>>(dataOffsets)('should return correct css for offset: %j', (offset) => {
    validateCssAndMatchSnapshot(getComponentCss(1, offset));
  });

  const dataOffsetsReversed = dataOffsets.reverse(); // revert so that size 12 and offset 0 come together
  dataOffsetsReversed.push(dataOffsetsReversed.shift()); // move first element to last position which is breakpoint customizable object
  it.each<[BreakpointCustomizable<GridItemSize>, BreakpointCustomizable<GridItemOffset>]>(
    dataSizes.map((x, i) => [x, dataOffsetsReversed[i]])
  )('should return correct css for size: %j and offset: %j', (size, offset) => {
    validateCssAndMatchSnapshot(getComponentCss(size, offset));
  });
});
