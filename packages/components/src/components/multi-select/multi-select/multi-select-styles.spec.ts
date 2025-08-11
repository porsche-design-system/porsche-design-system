import { validateCssAndMatchSnapshot } from '../../../../tests/unit/helpers';
import { getComponentCss } from './multi-select-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, true, false, 'none', false, 'light'],
    [false, true, false, 'none', false, 'light'],
    [true, true, false, 'none', false, 'light'],
    [false, true, true, 'none', false, 'light'],
    [true, false, true, 'none', false, 'light'],
    [false, false, false, 'none', false, 'light'],
    [true, false, false, 'none', false, 'light'],
    [true, true, true, 'none', false, 'light'],
    [false, false, true, 'success', false, 'light'],
    [true, false, true, 'success', false, 'light'],
    [false, true, false, 'success', false, 'light'],
    [false, true, false, 'none', true, 'light'],
    [true, false, false, 'none', false, 'light'],
    [true, true, false, 'success', false, 'dark'],
    [false, true, true, 'success', false, 'dark'],
    [true, false, true, 'success', false, 'dark'],
    [false, false, false, 'success', false, 'dark'],
    [true, false, false, 'error', false, 'dark'],
    [false, true, true, 'error', false, 'dark'],
    [true, true, true, 'error', false, 'dark'],
    [false, true, false, 'error', false, 'dark'],
    [false, false, true, 'error', false, 'dark'],
    [true, false, true, 'error', false, 'dark'],
    [true, true, false, 'error', false, 'dark'],
    [true, true, false, 'success', true, 'dark'],
    [true, false, false, 'none', false, 'dark'],
  ])(
    'should return correct css for isOpen: %s, isDisabled: %s, hideLabel: %o, state: %s, compact: %s and theme: %s',
    (...args) => {
      validateCssAndMatchSnapshot(getComponentCss(...args));
    }
  );
});
