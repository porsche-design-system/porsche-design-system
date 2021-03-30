import type { GridDirection, GridWrap } from '../../../src/components/layout/grid/grid/grid-utils';
import { getDynamicCss, GRID_DIRECTIONS, GRID_WRAPS } from '../../../src/components/layout/grid/grid/grid-utils';
import { stringify } from '../helper';

describe('getDynamicCss()', () => {
  const dataDirections: GridDirection[] = [
    ...GRID_DIRECTIONS,
    { base: 'column', xs: 'row', s: 'column', m: 'row', l: 'column', xl: 'row' },
  ];
  it.each(dataDirections.map(stringify))('should return correct css for direction: %s', (direction: GridDirection) => {
    expect(getDynamicCss(direction, 'wrap')).toMatchSnapshot();
  });

  const dataWraps: GridWrap[] = [
    ...GRID_WRAPS,
    { base: 'wrap', xs: 'nowrap', s: 'wrap', m: 'nowrap', l: 'wrap', xl: 'nowrap' },
  ];
  it.each(dataWraps.map(stringify))('should return correct css for wrap: %s', (wrap: GridWrap) => {
    expect(getDynamicCss('row', wrap)).toMatchSnapshot();
  });
});
