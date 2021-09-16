import { getComponentCss, getSlottedCss } from './banner-styles';
import * as jssUtils from './../../../utils/jss';

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
