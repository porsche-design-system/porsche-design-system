import { getComponentCss } from './button-pure-styles';
import { BreakpointCustomizable } from '../../../utils';

describe('getComponentCss()', () => {
  it.each<BreakpointCustomizable<boolean>>([
    false,
    true,
    { base: true, xs: false, s: true, m: false, l: true, xl: false },
  ])('should return correct css for stretch: %o', (stretch) => {
    expect(getComponentCss(stretch)).toMatchSnapshot();
  });
});
