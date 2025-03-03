import { getComponentCss } from './multi-select-styles';
import { validateCssAndMatchSnapshot } from '../../../../tests/unit/helpers';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, true, false, 'none', 'light'],
    [false, true, false, 'none', 'light'],
    [true, true, false, 'none', 'light'],
    [false, true, true, 'none', 'light'],
    [true, false, true, 'none', 'light'],
    [false, false, false, 'none', 'light'],
    [true, false, false, 'none', 'light'],
    [true, true, true, 'none', 'light'],
    [false, false, true, 'success', 'light'],
    [true, false, true, 'success', 'light'],
    [false, true, false, 'success', 'light'],
    [true, true, false, 'success', 'dark'],
    [false, true, true, 'success', 'dark'],
    [true, false, true, 'success', 'dark'],
    [false, false, false, 'success', 'dark'],
    [true, false, false, 'error', 'dark'],
    [false, true, true, 'error', 'dark'],
    [true, true, true, 'error', 'dark'],
    [false, true, false, 'error', 'dark'],
    [false, false, true, 'error', 'dark'],
    [true, false, true, 'error', 'dark'],
    [true, true, false, 'error', 'dark'],
  ])('should return correct css for isOpen: %s, isDisabled: %s, hideLabel: %o, state: %s and theme: %s', (...args) => {
    validateCssAndMatchSnapshot(getComponentCss(...args));
  });
});
