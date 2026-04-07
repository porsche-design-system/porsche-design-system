import { getOptionAriaAttributes } from './select-aria';

describe('getOptionAriaAttributes()', () => {
  it.each<Parameters<typeof getOptionAriaAttributes>>([
    [true, true, false, false],
    [true, false, true, false],
    [true, false, false, false],
    [true, true, true, true],
  ])(
    'should return correct aria attributes for isSelected: %s, isDisabled: %s, isHidden: %s and hasValue: %s',
    (...args) => {
      expect(getOptionAriaAttributes(...args)).toMatchSnapshot();
    }
  );
});
