import type { GridGutter } from '../grid/grid-utils';
import type { GridItemSize, GridItemOffset } from './grid-item-utils';
import { getComponentCss } from './grid-item-styles';
import { GRID_GUTTERS } from '../grid/grid-utils';
import { GRID_ITEM_SIZES, GRID_ITEM_OFFSETS } from './grid-item-utils';

xdescribe('getComponentCss()', () => {
  const defaultGutter: GridGutter = { base: 16, s: 24, m: 36 };

  const dataSizes: GridItemSize[] = [...GRID_ITEM_SIZES, { base: 6, xs: 12, s: 6, m: 12, l: 6, xl: 12 }];
  it.each<GridItemSize>(dataSizes)('should return correct css for size: %j', (size) => {
    expect(getComponentCss(size, 0, defaultGutter)).toMatchSnapshot();
  });

  const dataOffsets: GridItemOffset[] = [...GRID_ITEM_OFFSETS, { base: 6, xs: 0, s: 6, m: 0, l: 6, xl: 0 }];
  it.each<GridItemOffset>(dataOffsets)('should return correct css for offset: %j', (offset) => {
    expect(getComponentCss(1, offset, defaultGutter)).toMatchSnapshot();
  });

  const dataOffsetsReversed = dataOffsets.reverse(); // revert so that size 12 and offset 0 come together
  dataOffsetsReversed.push(dataOffsetsReversed.shift()); // move first element to last position which is breakpoint customizable object
  it.each<[GridItemSize, GridItemOffset]>(dataSizes.map((x, i) => [x, dataOffsetsReversed[i]]))(
    'should return correct css for size: %j and offset: %j',
    (size, offset) => {
      expect(getComponentCss(size, offset, defaultGutter)).toMatchSnapshot();
    }
  );

  const dataGutters: GridGutter[] = [...GRID_GUTTERS, { base: 16, xs: 24, s: 36, m: 16, l: 24, xl: 36 }];
  it.each<GridGutter>(dataGutters)('should return correct css for gutter: %j', (gutter) => {
    expect(getComponentCss(1, 0, gutter)).toMatchSnapshot();
  });
});
