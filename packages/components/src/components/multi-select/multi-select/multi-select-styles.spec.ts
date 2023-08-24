import { getComponentCss } from './multi-select-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['down', false, true, false, 'none', true, true, 'light'],
    ['down', true, true, false, 'none', true, true, 'light'],
    ['down', false, true, true, 'none', true, true, 'light'],
    ['down', true, false, true, 'none', true, true, 'light'],
    ['down', false, false, false, 'none', true, true, 'light'],
    ['down', true, false, false, 'none', true, true, 'light'],
    ['down', false, true, true, 'none', true, true, 'light'],
    ['down', true, true, true, 'none', true, true, 'light'],
    ['down', false, true, false, 'none', true, true, 'light'],
    ['down', true, false, false, 'none', true, true, 'light'],
    ['down', false, false, true, 'success', true, true, 'light'],
    ['down', true, false, true, 'success', true, true, 'light'],
    ['down', false, true, false, 'success', true, true, 'light'],
    ['up', true, true, false, 'success', true, false, 'dark'],
    ['up', false, true, true, 'success', true, false, 'dark'],
    ['up', true, false, true, 'success', true, false, 'dark'],
    ['up', false, false, false, 'success', true, false, 'dark'],
    ['up', true, false, false, 'error', true, false, 'dark'],
    ['up', false, true, true, 'error', true, false, 'dark'],
    ['up', true, true, true, 'error', true, false, 'dark'],
    ['up', false, true, false, 'error', true, false, 'dark'],
    ['up', true, false, false, 'error', true, false, 'dark'],
    ['up', false, false, true, 'error', true, false, 'dark'],
    ['up', true, false, true, 'error', true, false, 'dark'],
    ['up', false, true, false, 'error', true, false, 'dark'],
    ['up', true, true, false, 'error', true, false, 'dark'],
  ])(
    'should return correct css for direction: %s, isOpen: %s, isDisabled: %s, hideLabel: %o, state: %s, isWithinForm: %s and theme: %s',
    (...args) => {
      expect(getComponentCss(...args)).toMatchSnapshot();
    }
  );
});
