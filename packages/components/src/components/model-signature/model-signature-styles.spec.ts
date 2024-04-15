import { getComponentCss } from './model-signature-styles';
import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['911', true, 'small', 'primary', 'light'],
    ['cayenne', true, 'small', 'primary', 'light'],
    ['cayenne', false, 'small', 'primary', 'light'],
    ['cayenne', false, 'small', 'primary', 'auto'],
    ['911', true, 'small', 'contrast-low', 'light'],
    ['911', true, 'small', 'contrast-medium', 'light'],
    ['911', true, 'small', 'contrast-high', 'light'],
    ['911', true, 'small', 'inherit', 'light'],
    ['911', true, 'inherit', 'primary', 'light'],
    ['911', true, 'inherit', 'inherit', 'light'],
    ['911', true, 'small', 'primary', 'dark'],
    ['911', true, 'small', 'contrast-low', 'dark'],
    ['911', true, 'small', 'contrast-medium', 'dark'],
    ['911', true, 'small', 'contrast-high', 'dark'],
    ['911', true, 'small', 'inherit', 'dark'],
    ['911', true, 'inherit', 'primary', 'dark'],
    ['911', true, 'inherit', 'inherit', 'dark'],
  ])('should return correct css for model: %s, safe-zone: %s, size: %s, color: %s and theme: %s', (...args) => {
    validateCssAndMatchSnapshot(getComponentCss(...args));
  });
});
