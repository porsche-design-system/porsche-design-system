import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import { getComponentCss } from './flag-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['xx-small'],
    ['x-small'],
    ['small'],
    ['medium'],
    ['large'],
    ['x-large'],
    ['inherit'],
  ])('should return correct css for size: %s', (...args) => {
    validateCssAndMatchSnapshot(getComponentCss(...args));
  });
});
