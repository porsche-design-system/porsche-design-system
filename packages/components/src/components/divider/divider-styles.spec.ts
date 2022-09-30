import { getComponentCss } from './divider-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
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
  ])('should return correct css for color: %s, orientation: %j and theme %s', (...args) => {
    expect(getComponentCss(...args)).toMatchSnapshot();
  });
});
