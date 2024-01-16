import { getComponentCss } from './multi-select-styles';
import { validateCssAndMatchSnapshot } from '../../../../tests/unit/helpers';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['down', false, true, false, 'none', true, 'light'],
    ['down', true, true, false, 'none', true, 'light'],
    ['down', false, true, true, 'none', true, 'light'],
    ['down', true, false, true, 'none', true, 'light'],
    ['down', false, false, false, 'none', true, 'light'],
    ['down', true, false, false, 'none', true, 'light'],
    ['down', false, true, true, 'none', true, 'light'],
    ['down', true, true, true, 'none', true, 'light'],
    ['down', false, true, false, 'none', true, 'light'],
    ['down', true, false, false, 'none', true, 'light'],
    ['down', false, false, true, 'success', true, 'light'],
    ['down', true, false, true, 'success', true, 'light'],
    ['down', false, true, false, 'success', true, 'light'],
    ['up', true, true, false, 'success', true, 'dark'],
    ['up', false, true, true, 'success', true, 'dark'],
    ['up', true, false, true, 'success', true, 'dark'],
    ['up', false, false, false, 'success', true, 'dark'],
    ['up', true, false, false, 'error', true, 'dark'],
    ['up', false, true, true, 'error', true, 'dark'],
    ['up', true, true, true, 'error', true, 'dark'],
    ['up', false, true, false, 'error', true, 'dark'],
    ['up', true, false, false, 'error', true, 'dark'],
    ['up', false, false, true, 'error', true, 'dark'],
    ['up', true, false, true, 'error', true, 'dark'],
    ['up', false, true, false, 'error', true, 'dark'],
    ['up', true, true, false, 'error', true, 'dark'],
  ])(
    'should return correct css for direction: %s, isOpen: %s, isDisabled: %s, hideLabel: %o, state: %s, isWithinForm: %s and theme: %s',
    (...args) => {
      validateCssAndMatchSnapshot(getComponentCss(...args));
    }
  );
});
