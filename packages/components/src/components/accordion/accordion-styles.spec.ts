import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import { getComponentCss } from './accordion-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['small', false, true, false],
    ['small', false, false, false],
    ['small', true, true, false],
    ['small', true, false, false],
    ['medium', false, true, false],
    ['medium', false, false, false],
    ['medium', true, true, false],
    ['medium', true, false, false],
    ['medium', true, false, true],
    ['small', false, true, false],
    ['medium', true, false, false],
    ['medium', true, false, true],
    [{ base: 'small', xs: 'medium', s: 'small', m: 'medium', l: 'small', xl: 'medium' }, false, true, false],
  ])('should return correct css for size: %j, compact: %s, open: %s and sticky: %s', (...args) => {
    validateCssAndMatchSnapshot(getComponentCss(...args));
  });
});
