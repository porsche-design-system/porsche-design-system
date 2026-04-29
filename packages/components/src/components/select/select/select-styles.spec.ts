import { validateCssAndMatchSnapshot } from '../../../../tests/unit/helpers';
import { getComponentCss } from './select-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, true, false, 'none', false],
    [false, true, false, 'none', false],
    [true, true, false, 'none', false],
    [false, true, true, 'none', false],
    [true, false, true, 'none', false],
    [false, false, false, 'none', false],
    [true, false, false, 'none', false],
    [true, true, true, 'none', false],
    [false, false, true, 'success', false],
    [true, false, true, 'success', false],
    [false, true, false, 'success', false],
    [false, true, false, 'none', true],
    [true, false, false, 'none', false],
    [true, true, false, 'success', false],
    [false, true, true, 'success', false],
    [true, false, true, 'success', false],
    [false, false, false, 'success', false],
    [true, false, false, 'error', false],
    [false, true, true, 'error', false],
    [true, true, true, 'error', false],
    [false, true, false, 'error', false],
    [false, false, true, 'error', false],
    [true, false, true, 'error', false],
    [true, true, false, 'error', false],
    [true, true, false, 'success', true],
    [true, false, false, 'none', false],
  ])(
    'should return correct css for isOpen: %s, isDisabled: %s, hideLabel: %o, state: %s and compact: %s',
    (...args) => {
      validateCssAndMatchSnapshot(getComponentCss(...args));
    }
  );
});
