import {
  getFilterInputAriaAttributes,
  getListAriaAttributes,
  getOptionAriaAttributes,
  getSelectDropdownButtonAriaAttributes,
} from './select-aria';

describe('getSelectDropdownButtonAriaAttributes()', () => {
  it.each<Parameters<typeof getSelectDropdownButtonAriaAttributes>>([
    [true, 'label-id', 'description-id', 'dropdown-id', 0],
    [false, 'label-id', 'description-id', 'dropdown-id', 1],
  ])(
    'should return correct aria attributes for isOpen: %o, labelId: %o, descriptionId: %o, dropdownId: %o and activeDescendantId: %o',
    (isOpen, labelId, descriptionId, dropdownId, activeDescendantId) => {
      expect(
        getSelectDropdownButtonAriaAttributes(isOpen, labelId, descriptionId, dropdownId, activeDescendantId)
      ).toMatchSnapshot();
    }
  );
});

describe('getFilterInputAriaAttributes()', () => {
  it.each<Parameters<typeof getFilterInputAriaAttributes>>([
    [true, true, 'label-id', 'description-id', 'dropdown-id', 0],
    [false, false, 'label-id', 'description-id', 'dropdown-id', 0],
    [false, false, 'label-id', 'description-id', 'dropdown-id', 1],
  ])(
    'should return correct aria attributes for isOpen: %o, isRequired: %o, labelId: %o, descriptionId: %o, dropdownId: %o and activeDescendantId: %o',
    (isOpen, isRequired, labelId, descriptionId, dropdownId, activeDescendantId) => {
      expect(
        getFilterInputAriaAttributes(isOpen, isRequired, labelId, descriptionId, dropdownId, activeDescendantId)
      ).toMatchSnapshot();
    }
  );
});

describe('getListAriaAttributes()', () => {
  it.each<Parameters<typeof getListAriaAttributes>>([
    ['Some label', true, false, false],
    ['Some label', false, true, false],
    ['Some label', false, false, false],
    ['Some label', true, true, true],
  ])(
    'should return correct aria attributes for label: %o, isRequired: %o, hasFilter: %o and isOpen: %o',
    (label, isRequired, hasFilter, isOpen) => {
      expect(getListAriaAttributes(label, isRequired, hasFilter, isOpen)).toMatchSnapshot();
    }
  );
});

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
