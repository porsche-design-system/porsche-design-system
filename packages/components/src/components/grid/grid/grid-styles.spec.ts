import type { GridDirection, GridGutter, GridWrap } from './grid-utils';
import { GRID_DIRECTIONS, GRID_GUTTERS, GRID_WRAPS } from './grid-utils';
import { getComponentCss } from './grid-styles';

xdescribe('getComponentCss()', () => {
  const dataDirections: GridDirection[] = [
    ...GRID_DIRECTIONS,
    { base: 'column', xs: 'row', s: 'column', m: 'row', l: 'column', xl: 'row' },
  ];
  it.each<GridDirection>(dataDirections)('should return correct css for direction: %j', (direction) => {
    expect(getComponentCss(direction, 'wrap', { base: 16, s: 24, m: 36 })).toMatchSnapshot();
  });

  const dataWraps: GridWrap[] = [
    ...GRID_WRAPS,
    { base: 'wrap', xs: 'nowrap', s: 'wrap', m: 'nowrap', l: 'wrap', xl: 'nowrap' },
  ];
  it.each<GridWrap>(dataWraps)('should return correct css for wrap: %j', (wrap) => {
    expect(getComponentCss('row', wrap, { base: 16, s: 24, m: 36 })).toMatchSnapshot();
  });

  const dataGutters: GridGutter[] = [...GRID_GUTTERS, { base: 16, xs: 24, s: 36, m: 16, l: 24, xl: 36 }];
  it.each<GridGutter>(dataGutters)('should return correct css for gutter: %j', (gutter) => {
    expect(getComponentCss('row', 'wrap', gutter)).toMatchSnapshot();
  });
});
