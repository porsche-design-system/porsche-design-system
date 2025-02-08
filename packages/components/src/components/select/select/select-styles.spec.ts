import { validateCssAndMatchSnapshot } from '../../../../tests/unit/helpers';
import { getComponentCss } from './select-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['down', false, true, false, 'none', false, false, 'light', false],
    ['down', false, true, false, 'none', true, false, 'light', true],
    ['down', true, true, false, 'none', false, false, 'light', false],
    ['down', false, true, true, 'none', false, false, 'light', false],
    ['down', true, false, true, 'none', false, false, 'light', false],
    ['down', false, false, false, 'none', false, false, 'light', false],
    ['down', true, false, false, 'none', false, false, 'light', false],
    ['down', false, true, true, 'none', false, false, 'light', false],
    ['down', true, true, true, 'none', false, false, 'light', false],
    ['down', false, true, false, 'none', false, false, 'light', false],
    ['down', true, false, false, 'none', false, false, 'light', false],
    ['down', false, false, true, 'success', false, false, 'light', false],
    ['down', true, false, true, 'success', false, false, 'light', false],
    ['down', false, true, false, 'success', false, false, 'light', false],
    ['down', false, true, false, 'none', false, true, 'light', false],
    ['up', true, true, false, 'success', false, false, 'dark', false],
    ['up', true, true, false, 'success', true, false, 'dark', false],
    ['up', false, true, true, 'success', false, false, 'dark', false],
    ['up', true, false, true, 'success', false, false, 'dark', false],
    ['up', false, false, false, 'success', false, false, 'dark', false],
    ['up', true, false, false, 'error', false, false, 'dark', false],
    ['up', false, true, true, 'error', false, false, 'dark', false],
    ['up', true, true, true, 'error', false, false, 'dark', false],
    ['up', false, true, false, 'error', false, false, 'dark', false],
    ['up', true, false, false, 'error', false, false, 'dark', false],
    ['up', false, false, true, 'error', false, false, 'dark', false],
    ['up', true, false, true, 'error', false, false, 'dark', false],
    ['up', false, true, false, 'error', false, false, 'dark', false],
    ['up', true, true, false, 'error', false, false, 'dark', false],
    ['up', true, true, false, 'success', false, true, 'dark', false],
  ])(
    'should return correct css for direction: %s, isOpen: %s, isDisabled: %s, hideLabel: %o, state: %s, isNativePopoverCase: %s, compact: %s, theme: %s and hasSlottedImage: %s',
    (...args) => {
      validateCssAndMatchSnapshot(getComponentCss(...args));
    }
  );
});
