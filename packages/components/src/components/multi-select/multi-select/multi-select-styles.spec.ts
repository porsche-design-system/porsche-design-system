import { getComponentCss } from './multi-select-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [true, 'down', false, true, false, 'none', true, 'light'],
    [false, 'down', true, true, false, 'none', true, 'light'],
    [true, 'down', false, true, true, 'none', true, 'light'],
    [false, 'down', true, false, true, 'none', true, 'light'],
    [true, 'down', false, false, false, 'none', true, 'light'],
    [false, 'down', true, false, false, 'none', true, 'light'],
    [true, 'down', false, true, true, 'none', true, 'light'],
    [false, 'down', true, true, true, 'none', true, 'light'],
    [true, 'down', false, true, false, 'none', true, 'light'],
    [false, 'down', true, false, false, 'none', true, 'light'],
    [true, 'down', false, false, true, 'success', true, 'light'],
    [false, 'down', true, false, true, 'success', true, 'light'],
    [true, 'down', false, true, false, 'success', true, 'light'],
    [false, 'up', true, true, false, 'success', true, 'dark'],
    [true, 'up', false, true, true, 'success', true, 'dark'],
    [false, 'up', true, false, true, 'success', true, 'dark'],
    [true, 'up', false, false, false, 'success', true, 'dark'],
    [false, 'up', true, false, false, 'error', true, 'dark'],
    [true, 'up', false, true, true, 'error', true, 'dark'],
    [false, 'up', true, true, true, 'error', true, 'dark'],
    [true, 'up', false, true, false, 'error', true, 'dark'],
    [false, 'up', true, false, false, 'error', true, 'dark'],
    [true, 'up', false, false, true, 'error', true, 'dark'],
    [false, 'up', true, false, true, 'error', true, 'dark'],
    [true, 'up', false, true, false, 'error', true, 'dark'],
    [false, 'up', true, true, false, 'error', true, 'dark'],
  ])(
    'should return correct css for hasSelection: %s, direction: %s, isOpen: %s, isDisabled: %s, hideLabel: %o, state: %s, isWithinForm: %s and theme: %s',
    (...args) => {
      expect(getComponentCss(...args)).toMatchSnapshot();
    }
  );
});
