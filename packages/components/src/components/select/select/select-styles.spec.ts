import { getComponentCss } from './select-styles';
import { validateCssAndMatchSnapshot } from '../../../../tests/unit/helpers';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['down', false, true, false, 'none', false, 'light'],
    ['down', false, true, false, 'none', true, 'light'],
    ['down', true, true, false, 'none', false, 'light'],
    ['down', false, true, true, 'none', false, 'light'],
    ['down', true, false, true, 'none', false, 'light'],
    ['down', false, false, false, 'none', false, 'light'],
    ['down', true, false, false, 'none', false, 'light'],
    ['down', false, true, true, 'none', false, 'light'],
    ['down', true, true, true, 'none', false, 'light'],
    ['down', false, true, false, 'none', false, 'light'],
    ['down', true, false, false, 'none', false, 'light'],
    ['down', false, false, true, 'success', false, 'light'],
    ['down', true, false, true, 'success', false, 'light'],
    ['down', false, true, false, 'success', false, 'light'],
    ['up', true, true, false, 'success', false, 'dark'],
    ['up', true, true, false, 'success', true, 'dark'],
    ['up', false, true, true, 'success', false, 'dark'],
    ['up', true, false, true, 'success', false, 'dark'],
    ['up', false, false, false, 'success', false, 'dark'],
    ['up', true, false, false, 'error', false, 'dark'],
    ['up', false, true, true, 'error', false, 'dark'],
    ['up', true, true, true, 'error', false, 'dark'],
    ['up', false, true, false, 'error', false, 'dark'],
    ['up', true, false, false, 'error', false, 'dark'],
    ['up', false, false, true, 'error', false, 'dark'],
    ['up', true, false, true, 'error', false, 'dark'],
    ['up', false, true, false, 'error', false, 'dark'],
    ['up', true, true, false, 'error', false, 'dark'],
  ])(
    'should return correct css for direction: %s, isOpen: %s, isDisabled: %s, hideLabel: %o, state: %s, isNativePopoverCase: %s and theme: %s',
    (...args) => {
      validateCssAndMatchSnapshot(getComponentCss(...args));
    }
  );
});
