import { validateCssAndMatchSnapshot } from '../../../../tests/unit/helpers';
import { getComponentCss } from './select-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, true, false, 'none', false, false, 'light', false],
    [false, true, false, 'none', false, false, 'light', true],
    [true, true, false, 'none', false, false, 'light', false],
    [false, true, true, 'none', false, false, 'light', false],
    [true, false, true, 'none', false, false, 'light', false],
    [false, false, false, 'none', false, false, 'light', false],
    [true, false, false, 'none', false, false, 'light', false],
    [true, true, true, 'none', false, false, 'light', false],
    [false, false, true, 'success', false, false, 'light', false],
    [true, false, true, 'success', false, false, 'light', false],
    [false, true, false, 'success', false, false, 'light', false],
    [false, true, false, 'none', true, false, 'light', false],
    [true, false, false, 'none', false, true, 'light', false],
    [true, true, false, 'success', false, false, 'dark', false],
    [false, true, true, 'success', false, false, 'dark', false],
    [true, false, true, 'success', false, false, 'dark', false],
    [false, false, false, 'success', false, false, 'dark', false],
    [true, false, false, 'error', false, false, 'dark', false],
    [false, true, true, 'error', false, false, 'dark', false],
    [true, true, true, 'error', false, false, 'dark', false],
    [false, true, false, 'error', false, false, 'dark', false],
    [false, false, true, 'error', false, false, 'dark', false],
    [true, false, true, 'error', false, false, 'dark', false],
    [true, true, false, 'error', false, false, 'dark', false],
    [true, true, false, 'success', true, false, 'dark', false],
    [true, false, false, 'none', false, true, 'dark', false],
  ])(
    'should return correct css for isOpen: %s, isDisabled: %s, hideLabel: %o, state: %s, compact: %s, hasFilter: %s, theme: %s and hasSlottedImage: %s',
    (...args) => {
      validateCssAndMatchSnapshot(getComponentCss(...args));
    }
  );
});
