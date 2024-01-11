import { getComponentCss } from './tabs-bar-styles';
import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['small', 'regular', 'light'],
    ['small', 'regular', 'dark'],
    ['medium', 'regular', 'light'],
    ['medium', 'regular', 'dark'],
    ['small', 'semi-bold', 'light'],
    [{ base: 'small', xs: 'medium', s: 'small', m: 'medium', l: 'small', xl: 'medium' }, 'regular', 'light'],
  ])('should return correct css for size: %j, weight: %s and theme: %s', (...args) => {
    validateCssAndMatchSnapshot(getComponentCss, ...args);
  });
});
