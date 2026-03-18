import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import { getComponentCss } from './tabs-bar-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['none', 'small', false],
    ['canvas', 'small', false],
    ['surface', 'small', false],
    ['frosted', 'small', false],
    ['frosted', 'medium', false],
    ['frosted', 'medium', true],
    ['none', { base: 'small', xs: 'medium', s: 'small', m: 'medium', l: 'small', xl: 'medium' }, false],
  ])('should return correct css for background: %s, size: %j, isCompact: %s', (...args) => {
    validateCssAndMatchSnapshot(getComponentCss(...args));
  });
});
