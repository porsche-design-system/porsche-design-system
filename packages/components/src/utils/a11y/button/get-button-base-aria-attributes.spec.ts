import { getButtonBaseAriaAttributes } from './get-button-base-aria-attributes';

describe('getButtonAttributes()', () => {
  it.each<Parameters<typeof getButtonBaseAriaAttributes>>([
    [false, false],
    [true, false],
    [false, true],
    [true, true],
  ])('should return correct aria attributes for isDisabled: %s and isLoading: %s', (...args) => {
    expect(getButtonBaseAriaAttributes(...args)).toMatchSnapshot();
  });
});
