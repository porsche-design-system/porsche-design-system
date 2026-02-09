import { getComponentCss } from './tabs-bar-styles';
import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['small', 'regular',],
    ['small', 'regular'],
    ['medium', 'regular',],
    ['medium', 'regular'],
    ['small', 'semi-bold',],
    [{ base: 'small', xs: 'medium', s: 'small', m: 'medium', l: 'small', xl: 'medium' }, 'regular'],
  ])('should return correct css for size: %j and weight: %s', (...args) => {
    validateCssAndMatchSnapshot(getComponentCss(...args));
  });
});
