import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import { getComponentCss } from './display-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['large', 'start', 'primary', false],
    ['large', 'start', 'primary', false],
    ['large', 'start', 'primary', false],
    ['large', 'end', 'primary', false],
    ['large', 'end', 'primary', true],
    ['large', 'center', 'primary', false],
    ['large', 'start', 'primary', true],
    ['large', 'start', 'primary', true],
    ['medium', 'end', 'inherit', true],
    ['medium', 'start', 'inherit', false],
    ['small', 'end', 'inherit', true],
    ['small', 'start', 'inherit', false],
    ['small', 'inherit', 'primary', false],
    ['inherit', 'center', 'primary', false],
    [{ base: 'medium', xs: 'large', s: 'medium', m: 'inherit', l: 'large', xl: 'medium' }, 'center', 'primary', true],
  ])('should return correct css for size: %j, align: %s, color: %s and ellipsis: %o', (...args) => {
    validateCssAndMatchSnapshot(getComponentCss(...args));
  });
});
