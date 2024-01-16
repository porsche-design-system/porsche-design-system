import { getComponentCss } from './divider-styles';
import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';

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
    [
      'contrast-low',
      { base: 'horizontal', xs: 'vertical', s: 'horizontal', m: 'vertical', l: 'horizontal', xl: 'vertical' },
      'light',
    ],
  ])('should return correct css for color: %s, orientation: %j and theme %s', (...args) => {
    validateCssAndMatchSnapshot(getComponentCss(...args));
  });
});
