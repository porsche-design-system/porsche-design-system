import { getSwitchButtonAriaAttributes } from './switch-utils';

describe('getSwitchButtonAriaAttributes()', () => {
  it.each<Parameters<typeof getSwitchButtonAriaAttributes>>([
    [false, false, false],
    [true, false, false],
    [false, true, false],
    [false, false, true],
    [true, true, false],
    [false, true, true],
    [true, true, true, { 'aria-label': 'Dark mode', 'aria-description': 'Toggles the color theme' }],
  ])(
    'should return correct aria attributes for isDisabled: %s, isLoading: %s, isChecked: %s and aria: %s',
    (...args) => {
      expect(getSwitchButtonAriaAttributes(...args)).toMatchSnapshot();
    }
  );
});
