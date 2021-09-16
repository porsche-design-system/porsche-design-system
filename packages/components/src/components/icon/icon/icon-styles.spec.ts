import type { IconSize, TextColor as IconColor, Theme } from '../../../types';
import { getComponentCss } from './icon-styles';
import * as jssUtils from './../../../utils/jss';

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
