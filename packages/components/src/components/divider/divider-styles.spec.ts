import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import { getComponentCss } from './divider-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['contrast-low', 'horizontal'],
    ['contrast-low', 'vertical'],
    ['contrast-low', 'horizontal'],
    ['contrast-low', 'vertical'],
    ['contrast-medium', 'horizontal'],
    ['contrast-medium', 'vertical'],
    ['contrast-medium', 'horizontal'],
    ['contrast-medium', 'vertical'],
    ['contrast-high', 'horizontal'],
    ['contrast-high', 'vertical'],
    ['contrast-high', 'horizontal'],
    ['contrast-high', 'vertical'],
    [
      'contrast-low',
      { base: 'horizontal', xs: 'vertical', s: 'horizontal', m: 'vertical', l: 'horizontal', xl: 'vertical' },
    ],
  ])('should return correct css for color: %s, orientation: %j and theme %s', (...args) => {
    validateCssAndMatchSnapshot(getComponentCss(...args));
  });
});
