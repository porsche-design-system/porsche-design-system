import type { AriaAttributes } from '../../../types';
import { setAriaIDREF } from '../a11y';

export const getComboboxAriaAttributes = (
  isOpen: boolean,
  isRequired: boolean,
  labelId: string,
  messageId: string,
  descriptionId: string,
  listboxId: string,
  multiselectable: boolean
): AriaAttributes => {
  return {
    'aria-labelledby': labelId || null,
    'aria-describedby': setAriaIDREF(messageId, descriptionId),
    'aria-haspopup': 'listbox',
    'aria-expanded': isOpen ? 'true' : 'false',
    'aria-required': isRequired ? 'true' : 'false',
    'aria-controls': listboxId || null,
    'aria-multiselectable': multiselectable ? 'true' : 'false',
  };
};

export const getListboxAriaAttributes = (
  isRequired: boolean,
  labelId: string,
  messageId: string,
  descriptionId: string
): AriaAttributes => {
  return {
    role: 'listbox',
    'aria-labelledby': labelId || null,
    'aria-describedby': setAriaIDREF(messageId, descriptionId),
    'aria-required': isRequired ? 'true' : 'false',
  };
};

export const getOptionAriaAttributes = (
  isSelected: boolean,
  isDisabled: boolean,
  isHidden: HTMLElement['hidden'],
  hasValue: boolean
): AriaAttributes => ({
  ...(!isHidden && { 'aria-selected': isSelected ? 'true' : 'false' }),
  'aria-disabled': isDisabled ? 'true' : null,
  'aria-hidden': isHidden ? 'true' : null,
  'aria-label': hasValue ? null : 'Empty value',
});
