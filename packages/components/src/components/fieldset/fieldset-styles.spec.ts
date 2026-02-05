import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import { getComponentCss } from './fieldset-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['none', 'medium', true],
    ['none', 'medium', true],
    ['none', 'medium', false],
    ['none', 'small', true],
    ['none', 'small', true],
    ['none', 'small', false],
    ['success', 'medium', false],
    ['success', 'medium', false],
    ['error', 'medium', false],
    ['error', 'medium', false],
  ])('should return correct css for state: %s, labelSize: %s, hasLabel: %s and theme: %s', (...args) => {
    validateCssAndMatchSnapshot(getComponentCss(...args));
  });
});
