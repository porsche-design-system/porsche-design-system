import type { IconSize, TextColor as IconColor, Theme } from '../../../types';
import { addComponentCss, getComponentCss } from './icon-styles';
import * as jssUtils from './../../../utils/jss';

describe('addComponentCss()', () => {
  it('should call getCachedComponentCss() to retrieve cached css', () => {
    const host = document.createElement('p-icon');
    jest.spyOn(jssUtils, 'attachCss').mockImplementation(() => {});
    const spy = jest.spyOn(jssUtils, 'getCachedComponentCss').mockImplementation(() => '');

    addComponentCss(host, 'default', 'small', 'light');

    expect(spy).toHaveBeenCalledWith(host, expect.anything(), 'default', 'small', 'light');
  });
});

describe('getComponentCss()', () => {
  it.each<[IconColor, IconSize, Theme]>([
    ['default', 'small', 'light'],
    ['default', 'small', 'dark'],
    ['brand', 'small', 'light'],
    ['inherit', 'small', 'light'],
    ['default', 'large', 'light'],
    ['default', 'inherit', 'light'],
  ])('should return correct css for color: %s, size: %s and theme: %s', (color, size, theme) => {
    expect(getComponentCss(color, size, theme)).toMatchSnapshot();
  });
});
