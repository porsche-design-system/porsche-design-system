import type { GridItemSize, GridItemOffset } from '../../../src/components/layout/grid/grid-item/grid-item-utils';
import {
  getDynamicCss,
  GRID_ITEM_SIZES,
  GRID_ITEM_OFFSETS,
} from '../../../src/components/layout/grid/grid-item/grid-item-utils';
import { stringify } from '../helper';
import { GRID_GUTTERS, GridGutter } from '../../../src/components/layout/grid/grid/grid-utils';

describe('getDynamicCss()', () => {
  const defaultGutter: GridGutter = { base: 16, s: 24, m: 36 };

  const dataSizes: GridItemSize[] = [...GRID_ITEM_SIZES, { base: 6, xs: 12, s: 6, m: 12, l: 6, xl: 12 }];
  it.each(dataSizes.map(stringify))('should return correct css for size: %s', (size: GridItemSize) => {
    expect(getDynamicCss(size, 0, defaultGutter)).toMatchSnapshot();
  });

  const dataOffsets: GridItemOffset[] = [...GRID_ITEM_OFFSETS, { base: 6, xs: 0, s: 6, m: 0, l: 6, xl: 0 }];
  it.each(dataOffsets.map(stringify))('should return correct css for offset: %s', (offset: GridItemOffset) => {
    expect(getDynamicCss(1, offset, defaultGutter)).toMatchSnapshot();
  });

  const dataOffsetsReversed = dataOffsets.reverse(); // revert so that size 12 and offset 0 come together
  dataOffsetsReversed.push(dataOffsetsReversed.shift()); // move first element to last position which is breakpoint customizable object
  it.each(
    dataSizes.map<[GridItemSize, GridItemOffset]>((x, i) => [stringify(x), stringify(dataOffsetsReversed[i])])
  )('should return correct css for size: %s and offset: %s', (size: GridItemSize, offset: GridItemOffset) => {
    expect(getDynamicCss(size, offset, defaultGutter)).toMatchSnapshot();
  });

  const dataGutters: GridGutter[] = [...GRID_GUTTERS, { base: 16, xs: 24, s: 36, m: 16, l: 24, xl: 36 }];
  it.each(dataGutters.map(stringify))('should return correct css for gutter: %s', (gutter: GridGutter) => {
    expect(getDynamicCss(1, 0, gutter)).toMatchSnapshot();
  });
});
