import { getComponentCss } from './stepper-horizontal-styles';
import { validateCssAndMatchSnapshot } from '../../../../tests/unit/helpers';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['small'],
    ['medium'],
    [{ base: 'small', xs: 'medium', s: 'small', m: 'medium', l: 'small', xl: 'medium' }],
  ])('should return correct css for size: %j', (...args) => {
    validateCssAndMatchSnapshot(getComponentCss(...args));
  });
});
