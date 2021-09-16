import { addComponentCss, getComponentCss, getSlottedCss } from './banner-styles';
import * as jssUtils from './../../../utils/jss';

describe('addComponentCss()', () => {
  it('should call getCachedComponentCss() to retrieve cached css', () => {
    const host = document.createElement('p-banner');
    jest.spyOn(jssUtils, 'attachCss').mockImplementation(() => {});
    const spy = jest.spyOn(jssUtils, 'getCachedComponentCss').mockImplementation(() => '');

    addComponentCss(host);

    expect(spy).toHaveBeenCalledWith(host, expect.anything());
  });
});

describe('getComponentCss()', () => {
  it('should return correct css', () => {
    expect(getComponentCss()).toMatchSnapshot();
  });
});

describe('getSlottedCss()', () => {
  it('should return correct css', () => {
    const host = document.createElement('p-banner');
    expect(getSlottedCss(host)).toMatchSnapshot();
  });

  it('should return correct css with prefix', () => {
    const host = document.createElement('prefixed-p-banner');
    expect(getSlottedCss(host)).toMatchSnapshot();
  });
});
