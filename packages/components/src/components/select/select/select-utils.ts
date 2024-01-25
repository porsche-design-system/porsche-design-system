import { FormState } from '../../../utils/form/form-state';
import {
  consoleWarn,
  determineDropdownDirection,
  SelectDropdownDirection,
  SelectDropdownDirectionInternal,
  setAttribute,
  setAttributes,
} from '../../../utils';
import { SelectOptionInternalHTMLProps } from '../select-option/select-option-utils';
import { forceUpdate } from '@stencil/core';

export type SelectState = FormState;
export type SelectDirection = SelectDropdownDirection;
export type SelectOption = HTMLPSelectOptionElement & SelectOptionInternalHTMLProps;

export type SelectUpdateEventDetail = {
  name: string;
  value: string;
};

const resetSelectedOption = (options: SelectOption[]) => {
  const currentSelectedOption = options.find((option) => option.selected);
  if (currentSelectedOption) {
    currentSelectedOption.selected = false;
    forceUpdate(currentSelectedOption);
  }
};

export const setSelectedValue = (options: SelectOption[], value: string) => {
  resetSelectedOption(options);
  // TODO: Do we want to cover multiple options with the same value?
  const optionToSelect = options.find((option) => option.value === value);
  if (!optionToSelect) {
    consoleWarn('The provided value is not included in the options of the p-select:', value);
  } else {
    optionToSelect.selected = true;
    forceUpdate(optionToSelect);
  }
};

export const setSelectedOption = (options: SelectOption[], selectedOption: SelectOption): void => {
  resetSelectedOption(options);
  selectedOption.selected = true;
  forceUpdate(selectedOption);
};

// TODO: Mostly same as multi-select
// TODO: Extract slot name into const
export const initNativeSelect = (
  host: HTMLElement,
  name: string,
  disabled: boolean,
  required: boolean
): HTMLSelectElement => {
  const nativeSelect = document.createElement('select');
  setAttributes(nativeSelect, {
    'aria-hidden': 'true',
    tabindex: '-1',
    slot: 'internal-select',
  });
  syncNativeSelect(nativeSelect, name, disabled, required);
  host.prepend(nativeSelect);
  return nativeSelect;
};

// TODO: Same as multi-select
export const syncNativeSelect = (
  nativeSelect: HTMLSelectElement,
  name: string,
  disabled: boolean,
  required: boolean
): void => {
  setAttribute(nativeSelect, 'name', name);
  nativeSelect.toggleAttribute('disabled', disabled);
  nativeSelect.toggleAttribute('required', required);
};

// TODO: Kind of similar as multi-select
export const updateNativeOption = (nativeSelect: HTMLSelectElement, options: SelectOption[]): void => {
  const selectedOption = options.find((option) => option.selected);
  if (selectedOption) {
    nativeSelect.innerHTML = `<option value="${selectedOption.value}" selected>${selectedOption.textContent}</option>`;
  }
};

// TODO: This is copied from multi-select, extract and reuse in both components
export const getSelectDropdownDirection = (
  direction: SelectDropdownDirection,
  host: HTMLElement,
  options: SelectOption[]
): SelectDropdownDirectionInternal => {
  if (direction !== 'auto') {
    return direction;
  } else if (host) {
    const visibleOptionsLength = options.filter((option) => !option.hidden).length;
    return determineDropdownDirection(host, visibleOptionsLength);
  } else {
    return 'down';
  }
};
