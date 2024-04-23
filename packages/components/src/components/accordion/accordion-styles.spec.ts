import { getComponentCss } from './accordion-styles';
import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['small', false, true, 'light', false],
    ['small', false, false, 'light', false],
    ['small', true, true, 'light', false],
    ['small', true, false, 'light', false],
    ['medium', false, true, 'light', false],
    ['medium', false, false, 'light', false],
    ['medium', true, true, 'light', false],
    ['medium', true, false, 'light', false],
    ['medium', true, false, 'light', true],
    ['small', false, true, 'dark', false],
    ['medium', true, false, 'dark', false],
    ['medium', true, false, 'dark', true],
    [{ base: 'small', xs: 'medium', s: 'small', m: 'medium', l: 'small', xl: 'medium' }, false, true, 'dark', false],
  ])('should return correct css for size: %j, compact: %s, open: %s, theme: %s and sticky: %s', (...args) => {
    validateCssAndMatchSnapshot(getComponentCss(...args));
  });
});
