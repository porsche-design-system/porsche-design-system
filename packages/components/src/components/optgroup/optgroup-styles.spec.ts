import { getComponentCss } from './optgroup-styles';
import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [true, 'light'],
    [false, 'light'],
    [true, 'dark'],
    [false, 'dark'],
  ])('should return correct css for theme: %s', (...args) => {
    validateCssAndMatchSnapshot(getComponentCss(...args));
  });
});
