import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import { getComponentCss } from './heading-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['xx-large', 'start', 'primary', false],
    ['x-large', 'start', 'primary', false],
    ['x-large', 'end', 'primary', false],
    ['large', 'center', 'inherit', true],
    ['medium', 'center', 'inherit', true],
    ['small', 'center', 'inherit', true],
    ['small', 'inherit', 'inherit', true],
    ['inherit', 'center', 'inherit', true],
    [{ base: 'small', xs: 'medium', s: 'large', m: 'x-large', l: 'xx-large', xl: 'large' }, 'end', 'inherit', false],
  ])('should return correct css for size: %j, align: %s, color: %s and ellipsis: %s', (...args) => {
    validateCssAndMatchSnapshot(getComponentCss(...args));
  });
});
