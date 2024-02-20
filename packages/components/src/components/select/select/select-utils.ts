import { type FormState } from '../../../utils/form/form-state';
import {
  consoleWarn,
  determineDropdownDirection,
  getHighlightedSelectOptionIndex,
  getUsableSelectOptions,
  type SelectDropdownDirectionInternal,
  type SelectComponentsDropdownDirection,
  setAttribute,
  setAttributes,
  type Theme,
} from '../../../utils';
import { SelectOptionInternalHTMLProps } from '../select-option/select-option-utils';
import { forceUpdate } from '@stencil/core';

export type SelectState = FormState;
export type SelectOption = HTMLPSelectOptionElement & SelectOptionInternalHTMLProps;
export type SelectDropdownDirection = SelectComponentsDropdownDirection;

export type SelectUpdateEventDetail = {
  name: string;
  value: string;
};

export const INTERNAL_SELECT_SLOT = 'internal-select';

export const syncSelectOptionProps = (options: SelectOption[], theme: Theme): void => {
  options
    .filter((option) => option.theme !== theme)
    .forEach((option) => {
      option.theme = theme;
      forceUpdate(option);
    });
};

export const getSelectedOptionString = (options: SelectOption[]): string =>
  options.find((option) => option.selected)?.textContent ?? '';

const resetSelectedOption = (options: SelectOption[]): void => {
  const currentSelectedOption = options.find((option) => option.selected);
  if (currentSelectedOption) {
    currentSelectedOption.selected = false;
    forceUpdate(currentSelectedOption);
  }
};

export const updateSelectOptions = (options: SelectOption[], value: string): void => {
  resetSelectedOption(options);
  if (value === undefined) {
    // Option without value for empty selection
    const optionToSelect = options.find((option) => option.value === undefined);
    if (optionToSelect) {
      optionToSelect.selected = true;
      forceUpdate(optionToSelect);
    }
  } else {
    // TODO: Do we want to cover multiple options with the same value?
    const optionToSelect = options.find((option) => option.value === value);
    if (!optionToSelect) {
      consoleWarn('The provided value is not included in the options of the p-select:', value);
    } else {
      optionToSelect.selected = true;
      forceUpdate(optionToSelect);
    }
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
    slot: INTERNAL_SELECT_SLOT,
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

export const updateNativeSelectOption = (nativeSelect: HTMLSelectElement, selectOptions: SelectOption[]): void => {
  const selectedOption = selectOptions.find((option) => option.selected);
  // Check for value since empty option can also be selected
  nativeSelect.innerHTML = selectedOption?.value ? `<option value="${selectedOption.value}" selected></option>` : '';
};

// TODO: This is copied from multi-select, extract and reuse in both components
export const getSelectDropdownDirection = (
  direction: SelectComponentsDropdownDirection,
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

export const getSrHighlightedOptionText = (options: SelectOption[]): string => {
  const highlightedOptionIndex = getHighlightedSelectOptionIndex(options);
  const highlightedOption = getUsableSelectOptions(options)[highlightedOptionIndex];
  return (
    highlightedOption &&
    `${highlightedOption.textContent || 'Empty option'}${
      highlightedOption.selected ? ', selected' : ' not selected'
    } (${highlightedOptionIndex + 1} of ${options.length})`
  );
};
