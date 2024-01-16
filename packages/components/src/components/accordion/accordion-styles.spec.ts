import { getComponentCss } from './accordion-styles';
import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['small', false, true, 'light'],
    ['small', false, false, 'light'],
    ['small', true, true, 'light'],
    ['small', true, false, 'light'],
    ['medium', false, true, 'light'],
    ['medium', false, false, 'light'],
    ['medium', true, true, 'light'],
    ['medium', true, false, 'light'],
    ['small', false, true, 'dark'],
    ['medium', true, false, 'dark'],
    [{ base: 'small', xs: 'medium', s: 'small', m: 'medium', l: 'small', xl: 'medium' }, false, true, 'dark'],
  ])('should return correct css for size: %j, compact: %s, open: %s and theme: %s', (...args) => {
    validateCssAndMatchSnapshot(getComponentCss(...args));
  });
});
