import { getComponentCss } from './wordmark-styles';
import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['small', 'light'],
    ['inherit', 'light'],
    ['small', 'dark'],
    ['inherit', 'dark'],
  ])('should return correct css for size: %s and theme: %s', (...args) => {
    validateCssAndMatchSnapshot(getComponentCss(...args));
  });
});
