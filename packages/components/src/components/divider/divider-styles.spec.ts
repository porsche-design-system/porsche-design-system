import { getComponentCss } from './divider-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['contrast-low', 'horizontal', 'light'],
    ['contrast-low', 'vertical', 'light'],
    ['contrast-low', 'horizontal', 'dark'],
    ['contrast-low', 'vertical', 'dark'],
    ['contrast-medium', 'horizontal', 'light'],
    ['contrast-medium', 'vertical', 'light'],
    ['contrast-medium', 'horizontal', 'dark'],
    ['contrast-medium', 'vertical', 'dark'],
    ['contrast-high', 'horizontal', 'light'],
    ['contrast-high', 'vertical', 'light'],
    ['contrast-high', 'horizontal', 'dark'],
    ['contrast-high', 'vertical', 'dark'],
    ['neutral-contrast-low', 'horizontal', 'light'], // deprecated
    ['neutral-contrast-low', 'vertical', 'light'], // deprecated
    ['neutral-contrast-low', 'horizontal', 'dark'], // deprecated
    ['neutral-contrast-low', 'vertical', 'dark'], // deprecated
    ['neutral-contrast-medium', 'horizontal', 'light'], // deprecated
    ['neutral-contrast-medium', 'vertical', 'light'], // deprecated
    ['neutral-contrast-medium', 'horizontal', 'dark'], // deprecated
    ['neutral-contrast-medium', 'vertical', 'dark'], // deprecated
    ['neutral-contrast-high', 'horizontal', 'light'], // deprecated
    ['neutral-contrast-high', 'vertical', 'light'], // deprecated
    ['neutral-contrast-high', 'horizontal', 'dark'], // deprecated
    ['neutral-contrast-high', 'vertical', 'dark'], // deprecated
    [
      'neutral-contrast-low',
      { base: 'horizontal', xs: 'vertical', s: 'horizontal', m: 'vertical', l: 'horizontal', xl: 'vertical' },
      'light',
    ],
  ])('should return correct css for color: %s, orientation: %j and theme %s', (...args) => {
    expect(getComponentCss(...args)).toMatchSnapshot();
  });
});
