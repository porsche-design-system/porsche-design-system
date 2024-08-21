import { getComponentCss } from './select-wrapper-dropdown-styles';
import { validateCssAndMatchSnapshot } from '../../../../tests/unit/helpers';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['down', true, 'none', false, false, false, 'light'],
    ['down', true, 'none', false, false, true, 'light'],
    ['down', false, 'none', false, false, false, 'light'],
    ['down', true, 'none', false, true, false, 'light'],
    ['down', false, 'none', false, true, false, 'light'],
    ['up', true, 'none', false, false, false, 'light'],
    ['up', true, 'none', false, false, true, 'light'],
    ['up', false, 'none', false, false, false, 'light'],
    ['up', true, 'none', false, true, false, 'light'],
    ['up', false, 'none', false, true, false, 'light'],
    ['down', true, 'none', true, false, false, 'light'],
    ['down', false, 'none', true, false, false, 'light'],
    ['down', true, 'none', true, true, false, 'light'],
    ['down', false, 'none', true, true, false, 'light'],
    ['up', true, 'none', true, false, false, 'light'],
    ['up', false, 'none', true, false, false, 'light'],
    ['up', true, 'none', true, true, false, 'light'],
    ['up', false, 'none', true, true, false, 'light'],
  ])(
    'should return correct css for direction: %s, isOpen: %s, state: %s, disabled: %s, filter: %s, isNativePopoverCase: %s and theme: %s',
    (...args) => {
      validateCssAndMatchSnapshot(getComponentCss(...args));
    }
  );
});
