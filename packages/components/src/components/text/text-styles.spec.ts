import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import { getComponentCss } from './text-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['small', 'regular', 'start', 'primary', false],
    ['small', 'regular', 'start', 'primary', false],
    ['small', 'regular', 'end', 'primary', false],
    ['small', 'regular', 'inherit', 'primary', false],
    ['large', 'semi-bold', 'start', 'info', true],
    ['medium', 'bold', 'end', 'contrast-high', true],
    [
      { base: 'small', xs: 'large', s: 'medium', m: 'inherit', l: 'x-small', xl: 'x-large' },
      'bold',
      'center',
      'error',
      true,
    ],
  ])('should return correct css for size: %j, weight: %s, align: %s, color: %s and ellipsis: %o', (...args) => {
    validateCssAndMatchSnapshot(getComponentCss(...args));
  });
});
