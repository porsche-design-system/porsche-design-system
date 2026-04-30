import { getComboboxAriaAttributes, getListboxAriaAttributes, getOptionAriaAttributes } from './select-aria';

describe('getComboboxAriaAttributes()', () => {
  it('should return correct aria attributes when open, required, with all IDs', () => {
    expect(
      getComboboxAriaAttributes(true, true, 'label-id', 'message-id', 'description-id', 'dropdown-id')
    ).toMatchSnapshot();
  });

  it('should return correct aria attributes when closed and not required', () => {
    expect(
      getComboboxAriaAttributes(false, false, 'label-id', 'message-id', 'description-id', 'dropdown-id')
    ).toMatchSnapshot();
  });

  it('should return correct aria attributes with empty labelId', () => {
    expect(
      getComboboxAriaAttributes(false, false, '', 'message-id', 'description-id', 'dropdown-id')
    ).toMatchSnapshot();
  });

  it('should return correct aria attributes with empty messageId and descriptionId', () => {
    expect(getComboboxAriaAttributes(true, false, 'label-id', '', '', 'dropdown-id')).toMatchSnapshot();
  });
});

describe('getListboxAriaAttributes()', () => {
  it('should return correct aria attributes when required and multiselectable, with all IDs', () => {
    expect(getListboxAriaAttributes(true, 'label-id', 'message-id', 'description-id', true)).toMatchSnapshot();
  });

  it('should return correct aria attributes when not required and not multiselectable', () => {
    expect(getListboxAriaAttributes(false, 'label-id', 'message-id', 'description-id', false)).toMatchSnapshot();
  });

  it('should return correct aria attributes with empty labelId', () => {
    expect(getListboxAriaAttributes(false, '', 'message-id', 'description-id', false)).toMatchSnapshot();
  });

  it('should return correct aria attributes with empty messageId and descriptionId', () => {
    expect(getListboxAriaAttributes(true, 'label-id', '', '', true)).toMatchSnapshot();
  });
});

describe('getOptionAriaAttributes()', () => {
  it.each<Parameters<typeof getOptionAriaAttributes>>([
    [true, true, false, false],
    [true, false, true, false],
    [true, false, false, false],
    [true, true, true, true],
  ])('should return correct aria attributes for isSelected: %s, isDisabled: %s, isHidden: %s and hasValue: %s', (...args) => {
    expect(getOptionAriaAttributes(...args)).toMatchSnapshot();
  });
});
