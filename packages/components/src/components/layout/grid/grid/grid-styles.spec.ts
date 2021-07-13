import type { GridDirection, GridGutter, GridWrap } from './grid-utils';
import { GRID_DIRECTIONS, GRID_GUTTERS, GRID_WRAPS } from './grid-utils';
import { getComponentCss } from './grid-styles';

describe('getComponentCss()', () => {
  const dataDirections: GridDirection[] = [
    ...GRID_DIRECTIONS,
    { base: 'column', xs: 'row', s: 'column', m: 'row', l: 'column', xl: 'row' },
  ];
  it.each(dataDirections)('should return correct css for direction: %o', (direction: GridDirection) => {
    expect(getComponentCss(direction, 'wrap', { base: 16, s: 24, m: 36 })).toMatchSnapshot();
  });

  const dataWraps: GridWrap[] = [
    ...GRID_WRAPS,
    { base: 'wrap', xs: 'nowrap', s: 'wrap', m: 'nowrap', l: 'wrap', xl: 'nowrap' },
  ];
  it.each(dataWraps)('should return correct css for wrap: %o', (wrap: GridWrap) => {
    expect(getComponentCss('row', wrap, { base: 16, s: 24, m: 36 })).toMatchSnapshot();
  });

  const dataGutters: GridGutter[] = [...GRID_GUTTERS, { base: 16, xs: 24, s: 36, m: 16, l: 24, xl: 36 }];
  it.each(dataGutters)('should return correct css for gutter: %o', (gutter: GridGutter) => {
    expect(getComponentCss('row', 'wrap', gutter)).toMatchSnapshot();
  });
});
