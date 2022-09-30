import { getButtonAriaAttributes } from './button-utils';

describe('getButtonAttributes()', () => {
  it.each<Parameters<typeof getButtonAriaAttributes>>([
    [false, false, {}],
    [true, false, {}],
    [false, true, {}],
    [true, true, {}],
    [
      true,
      true,
      {
        'aria-label': 'Some more detailed label',
        'aria-expanded': true,
        'aria-haspopup': true,
        'aria-pressed': true,
      },
    ],
  ])('should return correct aria attributes for isDisabled: %s, isLoading: %s and aria: %s', (...args) => {
    expect(getButtonAriaAttributes(...args)).toMatchSnapshot();
  });
});
