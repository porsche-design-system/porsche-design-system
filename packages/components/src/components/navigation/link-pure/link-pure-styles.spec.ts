import { getComponentCss, getSlottedCss } from './link-pure-styles';
import { BreakpointCustomizable } from '../../../utils';

describe('getSlottedCss()', () => {
  it('should return correct css', () => {
    const host = document.createElement('p-link-pure');
    expect(getSlottedCss(host)).toMatchSnapshot();
  });

  it('should return correct css with prefix', () => {
    const host = document.createElement('prefixed-p-link-pure');
    expect(getSlottedCss(host)).toMatchSnapshot();
  });
});

describe('getComponentCss()', () => {
  it.each<BreakpointCustomizable<boolean>>([
    false,
    true,
    { base: true, xs: false, s: true, m: false, l: true, xl: false },
  ])('should return correct css for stretch: %o', (stretch) => {
    expect(getComponentCss(stretch)).toMatchSnapshot();
  });
});
