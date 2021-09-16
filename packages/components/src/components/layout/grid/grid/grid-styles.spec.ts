import type { GridDirection, GridGutter, GridWrap } from './grid-utils';
import { GRID_DIRECTIONS, GRID_GUTTERS, GRID_WRAPS } from './grid-utils';
import { addComponentCss, getComponentCss } from './grid-styles';
import * as jssUtils from './../../../../utils/jss';

describe('addComponentCss()', () => {
  it('should call getCachedComponentCss() to retrieve cached css', () => {
    const host = document.createElement('p-grid');
    jest.spyOn(jssUtils, 'attachCss').mockImplementation(() => {});
    const spy = jest.spyOn(jssUtils, 'getCachedComponentCss').mockImplementation(() => '');

    addComponentCss(host, 'column', 'wrap', 16);

    expect(spy).toHaveBeenCalledWith(host, expect.anything(), 'column', 'wrap', 16);
  });
});

describe('getComponentCss()', () => {
  const dataDirections: GridDirection[] = [
    ...GRID_DIRECTIONS,
    { base: 'column', xs: 'row', s: 'column', m: 'row', l: 'column', xl: 'row' },
  ];
  it.each(dataDirections)('should return correct css for direction: %j', (direction: GridDirection) => {
    expect(getComponentCss(direction, 'wrap', { base: 16, s: 24, m: 36 })).toMatchSnapshot();
  });

  const dataWraps: GridWrap[] = [
    ...GRID_WRAPS,
    { base: 'wrap', xs: 'nowrap', s: 'wrap', m: 'nowrap', l: 'wrap', xl: 'nowrap' },
  ];
  it.each(dataWraps)('should return correct css for wrap: %j', (wrap: GridWrap) => {
    expect(getComponentCss('row', wrap, { base: 16, s: 24, m: 36 })).toMatchSnapshot();
  });

  const dataGutters: GridGutter[] = [...GRID_GUTTERS, { base: 16, xs: 24, s: 36, m: 16, l: 24, xl: 36 }];
  it.each(dataGutters)('should return correct css for gutter: %j', (gutter: GridGutter) => {
    expect(getComponentCss('row', 'wrap', gutter)).toMatchSnapshot();
  });
});
