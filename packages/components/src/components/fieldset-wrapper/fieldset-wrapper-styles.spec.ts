import { getComponentCss } from './fieldset-wrapper-styles';
import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['none', 'medium', true, 'light'],
    ['none', 'medium', true, 'dark'],
    ['none', 'medium', false, 'light'],
    ['none', 'small', true, 'light'],
    ['none', 'small', true, 'dark'],
    ['none', 'small', false, 'light'],
    ['success', 'medium', false, 'light'],
    ['success', 'medium', false, 'dark'],
    ['error', 'medium', false, 'light'],
    ['error', 'medium', false, 'dark'],
  ])('should return correct css for state: %s, labelSize: %s, hasLabel: %s and theme: %s', (...args) => {
    validateCssAndMatchSnapshot(getComponentCss(...args));
  });
});
