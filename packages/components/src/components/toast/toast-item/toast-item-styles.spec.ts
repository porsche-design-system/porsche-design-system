import { getComponentCss } from './toast-item-styles';
import { validateCssAndMatchSnapshot } from '../../../../tests/unit/helpers';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['neutral', 'light'],
    ['success', 'light'],
    ['info', 'light'],
    ['neutral', 'dark'],
    ['success', 'dark'],
    ['info', 'dark'],
  ])('should return correct css for state: %s and theme: %s', (...args) => {
    validateCssAndMatchSnapshot(getComponentCss(...args), true);
  });
});
