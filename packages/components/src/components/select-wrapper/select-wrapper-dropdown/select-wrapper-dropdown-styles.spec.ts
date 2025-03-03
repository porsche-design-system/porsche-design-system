import { getComponentCss } from './select-wrapper-dropdown-styles';
import { validateCssAndMatchSnapshot } from '../../../../tests/unit/helpers';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [true, 'none', false, false, 'light'],
    [true, 'none', false, false, 'light'],
    [false, 'none', false, false, 'light'],
    [true, 'none', false, true, 'light'],
    [false, 'none', false, true, 'light'],
    [true, 'none', false, false, 'light'],
    [true, 'none', false, false, 'light'],
    [false, 'none', false, false, 'light'],
    [true, 'none', false, true, 'light'],
    [false, 'none', false, true, 'light'],
    [true, 'none', true, false, 'light'],
    [false, 'none', true, false, 'light'],
    [true, 'none', true, true, 'light'],
    [false, 'none', true, true, 'light'],
    [true, 'none', true, false, 'light'],
    [false, 'none', true, false, 'light'],
    [true, 'none', true, true, 'light'],
    [false, 'none', true, true, 'light'],
  ])('should return correct css for isOpen: %s, state: %s, disabled: %s, filter: %s, and theme: %s', (...args) => {
    validateCssAndMatchSnapshot(getComponentCss(...args));
  });
});
