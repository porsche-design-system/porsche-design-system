import { addComponentCss, getComponentCss } from './marque-styles';
import type { MarqueSize } from './marque-utils';
import * as jssUtils from './../../../utils/jss';

describe('addComponentCss()', () => {
  it('should call getCachedComponentCss() to retrieve cached css', () => {
    const host = document.createElement('p-marque');
    jest.spyOn(jssUtils, 'attachCss').mockImplementation(() => {});
    const spy = jest.spyOn(jssUtils, 'getCachedComponentCss').mockImplementation(() => '');

    addComponentCss(host, 'responsive');

    expect(spy).toHaveBeenCalledWith(host, expect.anything(), 'responsive');
  });
});

describe('getComponentCss()', () => {
  it.each([['responsive'], ['small'], ['medium']])('should return correct css for size: %s', (size: MarqueSize) => {
    expect(getComponentCss(size)).toMatchSnapshot();
  });
});
