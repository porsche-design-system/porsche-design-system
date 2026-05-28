import { getRadioGroupOptionAriaAttributes } from './radio-group-option-utils';

describe('getRadioGroupOptionAriaAttributes()', () => {
  it.each([
    [true, false, false, 'none', { role: 'radio', 'aria-checked': 'true', 'aria-disabled': null, 'aria-invalid': null }],
    [false, false, false, 'none', { role: 'radio', 'aria-checked': 'false', 'aria-disabled': null, 'aria-invalid': null }],
    [false, true, false, 'none', { role: 'radio', 'aria-checked': 'false', 'aria-disabled': 'true', 'aria-invalid': null }],
    [false, false, true, 'none', { role: 'radio', 'aria-checked': 'false', 'aria-disabled': 'true', 'aria-invalid': null }],
    [false, false, false, 'error', { role: 'radio', 'aria-checked': 'false', 'aria-disabled': null, 'aria-invalid': 'true' }],
  ] as const)(
    'should return correct aria attributes for isSelected: %s, isDisabled: %s, isLoading: %s, state: %s',
    (isSelected, isDisabled, isLoading, state, expected) => {
      expect(getRadioGroupOptionAriaAttributes(isSelected, isDisabled, isLoading, state)).toEqual(expected);
    }
  );
});
