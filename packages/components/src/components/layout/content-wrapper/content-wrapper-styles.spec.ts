import { getComponentCss } from './content-wrapper-styles';
import type { BackgroundColor, Width } from './content-wrapper-utils';
import type { Theme } from '../../../types';

describe('getComponentCss()', () => {
  it.each<[Width, BackgroundColor, Theme]>([
    ['basic', 'transparent', 'light'],
    ['extended', 'transparent', 'light'],
    ['fluid', 'transparent', 'light'],
    ['fluid', 'transparent', 'dark'],
    ['basic', 'default', 'light'],
    ['basic', 'default', 'dark'],
  ])('should return correct css for width: %s, background-color: %s, theme: %s', (width, backgroundColor, theme) => {
    expect(getComponentCss(width, backgroundColor, theme)).toMatchSnapshot();
  });
});
