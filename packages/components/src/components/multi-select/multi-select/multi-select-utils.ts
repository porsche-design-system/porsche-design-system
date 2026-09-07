import { forceUpdate } from '@stencil/core';
import type { SelectComponentsDropdownDirection } from '../../../utils';
import type { FormState } from '../../../utils/form/form-state';
import type { MultiSelectOptionInternalHTMLProps } from '../multi-select-option/multi-select-option-utils';

export type MultiSelectState = FormState;
export type MultiSelectDropdownDirection = SelectComponentsDropdownDirection;
export type MultiSelectOption = HTMLPMultiSelectOptionElement & MultiSelectOptionInternalHTMLProps;
export type MultiSelectOptgroup = HTMLPOptgroupElement;

export type MultiSelectChangeEventDetail = {
  name: string;
  value: string[] | number[];
};
export type MultiSelectToggleEventDetail = { open: boolean };

export const getSelectedOptions = (options: MultiSelectOption[]): MultiSelectOption[] =>
  options.filter((option) => option.selected);

export const getSelectedOptionsString = (options: MultiSelectOption[]): string =>
  getSelectedOptions(options)
    .map((option) => option.textContent)
    .join(', ');

export const selectOptionsByValue = (
  options: MultiSelectOption[],
  value: string[] | number[] | null | undefined
): MultiSelectOption[] => {
  const values: (string | number)[] = value ?? [];
  const selectedValues = new Set<string | number>(values);
  const selectedOptions: MultiSelectOption[] = [];

  for (const option of options) {
    const shouldBeSelected = selectedValues.has(option.value);
    if ((option.selected ?? false) !== shouldBeSelected) {
      option.selected = shouldBeSelected;
      forceUpdate(option);
    }
    if (option.selected) {
      selectedOptions.push(option);
    }
  }

  return selectedOptions;
};

export const resetSelectedOptions = (options: MultiSelectOption[]): void => {
  for (const option of options) {
    if (option.selected) {
      option.selected = false;
      forceUpdate(option);
    }
  }
};

export const setSelectedMultiSelectOption = (selectedOption: MultiSelectOption): void => {
  selectedOption.selected = !selectedOption.selected;
  forceUpdate(selectedOption);
};
