import { getDynamicCss, GRID_DIRECTIONS, GridDirection } from '../../../src/components/layout/grid/grid/grid-utils';
import { stringify } from '../helper';

describe('getDynamicCss()', () => {
  const data: GridDirection[] = [
    ...GRID_DIRECTIONS,
    { base: 'column', xs: 'row', s: 'column', m: 'row', l: 'column', xl: 'row' },
  ];
  it.each(data.map(stringify))('should return correct css for direction: %s', (direction: GridDirection) => {
    expect(getDynamicCss(direction)).toMatchSnapshot();
  });
});
