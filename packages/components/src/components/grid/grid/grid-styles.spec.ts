import type { GridDirection, GridGutter, GridWrap } from './grid-utils';
import { GRID_DIRECTIONS, GRID_GUTTERS, GRID_WRAPS } from './grid-utils';
import { getComponentCss } from './grid-styles';
import type { BreakpointCustomizable } from '../../../types';

describe('getComponentCss()', () => {
  const dataDirections: BreakpointCustomizable<GridDirection>[] = [
    ...GRID_DIRECTIONS,
    { base: 'column', xs: 'row', s: 'column', m: 'row', l: 'column', xl: 'row' },
  ];
  it.each<BreakpointCustomizable<GridDirection>>(dataDirections)(
    'should return correct css for direction: %j',
    (direction) => {
      expect(getComponentCss(direction, 'wrap')).toMatchSnapshot();
    }
  );

  const dataWraps: BreakpointCustomizable<GridWrap>[] = [
    ...GRID_WRAPS,
    { base: 'wrap', xs: 'nowrap', s: 'wrap', m: 'nowrap', l: 'wrap', xl: 'nowrap' },
  ];
  it.each<BreakpointCustomizable<GridWrap>>(dataWraps)('should return correct css for wrap: %j', (wrap) => {
    expect(getComponentCss('row', wrap)).toMatchSnapshot();
  });

  const dataGutters: BreakpointCustomizable<GridGutter>[] = [
    ...GRID_GUTTERS,
    { base: 16, xs: 24, s: 36, m: 16, l: 24, xl: 36 },
  ];
  it.each<BreakpointCustomizable<GridGutter>>(dataGutters)('should return correct css for gutter: %j', () => {
    expect(getComponentCss('row', 'wrap')).toMatchSnapshot();
  });
});
