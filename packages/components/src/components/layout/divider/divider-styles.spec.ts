import { getComponentCss } from './divider-styles';
import type { Theme } from '../../../types';
import type { DividerColor, DividerOrientation } from './divider-utils';

describe('getComponentCss()', () => {
  it.each<[DividerColor, DividerOrientation, Theme]>([
    ['neutral-contrast-low', 'horizontal', 'light'],
    ['neutral-contrast-low', 'vertical', 'light'],
    ['neutral-contrast-low', 'horizontal', 'dark'],
    ['neutral-contrast-low', 'vertical', 'dark'],
    ['neutral-contrast-medium', 'horizontal', 'light'],
    ['neutral-contrast-medium', 'vertical', 'light'],
    ['neutral-contrast-medium', 'horizontal', 'dark'],
    ['neutral-contrast-medium', 'vertical', 'dark'],
    ['neutral-contrast-high', 'horizontal', 'light'],
    ['neutral-contrast-high', 'vertical', 'light'],
    ['neutral-contrast-high', 'horizontal', 'dark'],
    ['neutral-contrast-high', 'vertical', 'dark'],
    [
      'neutral-contrast-low',
      { base: 'horizontal', xs: 'vertical', s: 'horizontal', m: 'vertical', l: 'horizontal', xl: 'vertical' },
      'light',
    ],
  ])('should return correct css for color: %s, orientation: %j and theme %s', (color, orientation, theme) => {
    expect(getComponentCss(color, orientation, theme)).toMatchSnapshot();
  });
});
