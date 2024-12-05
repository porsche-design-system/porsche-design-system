import { validateCssAndMatchSnapshot } from '../../../../tests/unit/helpers';
import { getComponentCss } from './select-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['down', false, true, false, 'none', false, 'light', false],
    ['down', false, true, false, 'none', true, 'light', true],
    ['down', true, true, false, 'none', false, 'light', false],
    ['down', false, true, true, 'none', false, 'light', false],
    ['down', true, false, true, 'none', false, 'light', false],
    ['down', false, false, false, 'none', false, 'light', false],
    ['down', true, false, false, 'none', false, 'light', false],
    ['down', false, true, true, 'none', false, 'light', false],
    ['down', true, true, true, 'none', false, 'light', false],
    ['down', false, true, false, 'none', false, 'light', false],
    ['down', true, false, false, 'none', false, 'light', false],
    ['down', false, false, true, 'success', false, 'light', false],
    ['down', true, false, true, 'success', false, 'light', false],
    ['down', false, true, false, 'success', false, 'light', false],
    ['up', true, true, false, 'success', false, 'dark', false],
    ['up', true, true, false, 'success', true, 'dark', false],
    ['up', false, true, true, 'success', false, 'dark', false],
    ['up', true, false, true, 'success', false, 'dark', false],
    ['up', false, false, false, 'success', false, 'dark', false],
    ['up', true, false, false, 'error', false, 'dark', false],
    ['up', false, true, true, 'error', false, 'dark', false],
    ['up', true, true, true, 'error', false, 'dark', false],
    ['up', false, true, false, 'error', false, 'dark', false],
    ['up', true, false, false, 'error', false, 'dark', false],
    ['up', false, false, true, 'error', false, 'dark', false],
    ['up', true, false, true, 'error', false, 'dark', false],
    ['up', false, true, false, 'error', false, 'dark', false],
    ['up', true, true, false, 'error', false, 'dark', false],
  ])(
    'should return correct css for direction: %s, isOpen: %s, isDisabled: %s, hideLabel: %o, state: %s, isNativePopoverCase: %s, theme: %s and hasSlottedImage: %s',
    (...args) => {
      validateCssAndMatchSnapshot(getComponentCss(...args));
    }
  );
});
