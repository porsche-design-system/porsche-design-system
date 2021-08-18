import { getComponentCss } from './button-pure-styles';

describe('getComponentCss()', () => {
  it('should return correct css with stretch true', () => {
    expect(getComponentCss(true)).toMatchSnapshot();
  });

  it('should return correct css with stretch BreakpointCustomizable', () => {
    expect(getComponentCss({ base: true, xs: true, s: false, m: true, l: false, xl: true })).toMatchSnapshot();
  });

  it('should return correct css with stretch false', () => {
    expect(getComponentCss(false)).toMatchSnapshot();
  });
});
