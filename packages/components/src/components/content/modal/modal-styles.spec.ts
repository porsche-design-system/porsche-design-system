import { getComponentCss } from './modal-styles';
import type { BreakpointCustomizable } from '../../../types';

describe('getComponentCss()', () => {
  it.each<[boolean, BreakpointCustomizable<boolean>]>([
    [false, false],
    [false, true],
    [true, false],
    [true, true],
    [true, { base: true, xs: false, s: true, m: false, l: true, xl: false }],
  ])('should return correct css for open: %s, fullscreen: %s', (open, fullscreen) => {
    expect(getComponentCss(open, fullscreen)).toMatchSnapshot();
  });
});
