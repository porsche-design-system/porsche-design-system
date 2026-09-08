import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import { getComponentCss } from './model-signature-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['911', true, 'small', 'primary'],
    ['cayenne', true, 'small', 'primary'],
    ['cayenne', false, 'small', 'primary'],
    ['cayenne', false, 'small', 'primary'],
    ['911', true, 'small', 'contrast-low'],
    ['911', true, 'small', 'contrast-medium'],
    ['911', true, 'small', 'contrast-high'],
    ['911', true, 'small', 'inherit'],
    ['911', true, 'inherit', 'primary'],
    ['911', true, 'inherit', 'inherit'],
    ['911', true, 'small', 'primary'],
    ['911', true, 'small', 'contrast-low'],
    ['911', true, 'small', 'contrast-medium'],
    ['911', true, 'small', 'contrast-high'],
    ['911', true, 'small', 'inherit'],
    ['911', true, 'inherit', 'primary'],
    ['911', true, 'inherit', 'inherit'],
  ])('should return correct css for model: %s, safe-zone: %s, size: %s and color: %s', (...args) => {
    validateCssAndMatchSnapshot(getComponentCss(...args));
  });
});
