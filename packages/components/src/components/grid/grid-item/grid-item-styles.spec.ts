import type { GridGutter } from '../grid/grid-utils';
import { GRID_GUTTERS } from '../grid/grid-utils';
import type { GridItemOffset, GridItemSize } from './grid-item-utils';
import { GRID_ITEM_OFFSETS, GRID_ITEM_SIZES } from './grid-item-utils';
import { getComponentCss } from './grid-item-styles';
import type { BreakpointCustomizable } from '../../../types';

xdescribe('getComponentCss()', () => {
  const defaultGutter: BreakpointCustomizable<GridGutter> = { base: 16, s: 24, m: 36 };

  const dataSizes: BreakpointCustomizable<GridItemSize>[] = [
    ...GRID_ITEM_SIZES,
    { base: 6, xs: 12, s: 6, m: 12, l: 6, xl: 12 },
  ];
  it.each<BreakpointCustomizable<GridItemSize>>(dataSizes)('should return correct css for size: %j', (size) => {
    expect(getComponentCss(size, 0, defaultGutter)).toMatchSnapshot();
  });

  const dataOffsets: BreakpointCustomizable<GridItemOffset>[] = [
    ...GRID_ITEM_OFFSETS,
    { base: 6, xs: 0, s: 6, m: 0, l: 6, xl: 0 },
  ];
  it.each<BreakpointCustomizable<GridItemOffset>>(dataOffsets)('should return correct css for offset: %j', (offset) => {
    expect(getComponentCss(1, offset, defaultGutter)).toMatchSnapshot();
  });

  const dataOffsetsReversed = dataOffsets.reverse(); // revert so that size 12 and offset 0 come together
  dataOffsetsReversed.push(dataOffsetsReversed.shift()); // move first element to last position which is breakpoint customizable object
  it.each<[BreakpointCustomizable<GridItemSize>, BreakpointCustomizable<GridItemOffset>]>(
    dataSizes.map((x, i) => [x, dataOffsetsReversed[i]])
  )('should return correct css for size: %j and offset: %j', (size, offset) => {
    expect(getComponentCss(size, offset, defaultGutter)).toMatchSnapshot();
  });

  const dataGutters: BreakpointCustomizable<GridGutter>[] = [
    ...GRID_GUTTERS,
    { base: 16, xs: 24, s: 36, m: 16, l: 24, xl: 36 },
  ];
  it.each<BreakpointCustomizable<GridGutter>>(dataGutters)('should return correct css for gutter: %j', (gutter) => {
    expect(getComponentCss(1, 0, gutter)).toMatchSnapshot();
  });
});
