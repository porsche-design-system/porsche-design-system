import { getSwitchButtonAriaAttributes } from './switch-utils';

describe('getSwitchButtonAriaAttributes()', () => {
  it.each<Parameters<typeof getSwitchButtonAriaAttributes>>([
    [false, false, false],
    [true, false, false],
    [false, true, false],
    [false, false, true],
    [true, true, false],
    [false, true, true],
    [true, true, true],
  ])('should return correct aria attributes for isDisabled: %s, isLoading: %s and isChecked: %s', (...args) => {
    expect(getSwitchButtonAriaAttributes(...args)).toMatchSnapshot();
  });
});
