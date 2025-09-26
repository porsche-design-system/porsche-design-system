import { validateCssAndMatchSnapshot } from '../../../../tests/unit/helpers';
import { getComponentCss } from './radio-group-option-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    // state = none
    [false, false, 'none', 'light'],
    [false, true, 'none', 'light'],
    [true, false, 'none', 'light'],
    [true, true, 'none', 'light'],

    [false, false, 'none', 'dark'],
    [false, true, 'none', 'dark'],
    [true, false, 'none', 'dark'],
    [true, true, 'none', 'dark'],

    // state = success
    [false, false, 'success', 'light'],
    [false, true, 'success', 'light'],
    [true, false, 'success', 'light'],
    [true, true, 'success', 'light'],

    [false, false, 'success', 'dark'],
    [false, true, 'success', 'dark'],
    [true, false, 'success', 'dark'],
    [true, true, 'success', 'dark'],

    // state = error
    [false, false, 'error', 'light'],
    [false, true, 'error', 'light'],
    [true, false, 'error', 'light'],
    [true, true, 'error', 'light'],

    [false, false, 'error', 'dark'],
    [false, true, 'error', 'dark'],
    [true, false, 'error', 'dark'],
    [true, true, 'error', 'dark'],
  ])('should return correct css for disabled: %s, loading: %s, state: %s, theme: %s', (...args) => {
    validateCssAndMatchSnapshot(getComponentCss(...args));
  });
});
