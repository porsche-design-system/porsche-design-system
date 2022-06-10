import { getButtonDisabledBusyAriaAttributes } from './aria-button';

describe('getButtonAttributes()', () => {
  it.each<Parameters<typeof getButtonDisabledBusyAriaAttributes>>([
    [false, false],
    [true, false],
    [false, true],
    [true, true],
  ])('should return correct aria attributes for isDisabled: %s and isLoading: %s', (...args) => {
    expect(getButtonDisabledBusyAriaAttributes(...args)).toMatchSnapshot();
  });
});
