import type { AriaAttributes } from '../../../types';

export const getFilterInputAriaAttributes = (
  isOpen: boolean,
  isRequired: boolean,
  labelId: string,
  descriptionId: string,
  dropdownId: string,
  activeDescendantId?: number
): AriaAttributes => {
  return {
    ...getSelectDropdownButtonAriaAttributes(isOpen, labelId, descriptionId, dropdownId, activeDescendantId),
    'aria-autocomplete': 'list',
    ...(isRequired && {
      'aria-required': 'true',
    }),
  };
};

export const getSelectDropdownButtonAriaAttributes = (
  isOpen: boolean,
  labelId: string,
  descriptionId: string,
  dropdownId: string,
  activeDescendantId?: number
): AriaAttributes => {
  return {
    'aria-labelledby': labelId || null,
    'aria-describedby': descriptionId || null,
    'aria-haspopup': 'listbox',
    'aria-expanded': isOpen ? 'true' : 'false',
    'aria-controls': dropdownId,
    ...(isOpen &&
      activeDescendantId !== undefined && {
        'aria-activedescendant': `option-${activeDescendantId}`,
      }),
  };
};

// TODO: Change to aria-labelledby
export const getListAriaAttributes = (
  label: string,
  isRequired: boolean,
  hasFilter: boolean,
  isOpen: boolean,
  multiple = false
): AriaAttributes => {
  return {
    role: 'listbox',
    'aria-label': label,
    ...(isRequired &&
      !hasFilter && {
        'aria-required': 'true',
      }),
    ...(!isOpen && {
      'aria-hidden': 'true',
    }),
    ...(multiple && {
      'aria-multiselectable': 'true',
    }),
  };
};

export const getOptionAriaAttributes = (
  isSelected: boolean,
  isDisabled: boolean,
  isHidden: boolean,
  hasValue: boolean
): AriaAttributes => ({
  ...(!isHidden && { 'aria-selected': isSelected ? 'true' : 'false' }),
  'aria-disabled': isDisabled ? 'true' : null,
  'aria-hidden': isHidden ? 'true' : null,
  'aria-label': hasValue ? null : 'Empty value',
});
