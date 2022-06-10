import { getButtonAriaAttributes } from './switch-styles-utils';

describe('getButtonAttributes()', () => {
  it.each<Parameters<typeof getButtonAriaAttributes>>([
    [false, false, false],
    [true, false, false],
    [false, true, false],
    [false, false, true],
    [true, true, false],
    [false, true, true],
    [true, true, true],
  ])('should return correct aria attributes for isDisabled: %s, isLoading: %s and isChecked: %s', (...args) => {
    expect(getButtonAriaAttributes(...args)).toMatchSnapshot();
  });
});
