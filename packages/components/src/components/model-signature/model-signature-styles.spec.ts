import { getComponentCss } from './model-signature-styles';
import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['small', 'primary', 'light'],
    ['small', 'contrast-low', 'light'],
    ['small', 'contrast-medium', 'light'],
    ['small', 'contrast-high', 'light'],
    ['small', 'inherit', 'light'],
    ['inherit', 'primary', 'light'],
    ['inherit', 'inherit', 'light'],
    ['small', 'primary', 'dark'],
    ['small', 'contrast-low', 'dark'],
    ['small', 'contrast-medium', 'dark'],
    ['small', 'contrast-high', 'dark'],
    ['small', 'inherit', 'dark'],
    ['inherit', 'primary', 'dark'],
    ['inherit', 'inherit', 'dark'],
  ])('should return correct css for size: %s, color: %s and theme: %s', (...args) => {
    validateCssAndMatchSnapshot(getComponentCss(...args));
  });
});
