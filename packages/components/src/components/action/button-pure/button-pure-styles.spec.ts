import { addComponentCss, getComponentCss } from './button-pure-styles';
import { BreakpointCustomizable } from '../../../utils';
import * as jssUtils from './../../../utils/jss';

describe('addComponentCss()', () => {
  it('should call getCachedComponentCss() to retrieve cached css', () => {
    const host = document.createElement('p-button-pure');
    jest.spyOn(jssUtils, 'attachCss').mockImplementation(() => {});
    const spy = jest.spyOn(jssUtils, 'getCachedComponentCss').mockImplementation(() => '');

    addComponentCss(host, false);

    expect(spy).toHaveBeenCalledWith(host, expect.anything(), false);
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
