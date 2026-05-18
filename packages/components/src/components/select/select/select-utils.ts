import { forceUpdate } from '@stencil/core';
import { consoleWarn, getTagNameWithoutPrefix, type SelectComponentsDropdownDirection } from '../../../utils';
import type { FormState } from '../../../utils/form/form-state';
import type { SelectOptionInternalHTMLProps } from '../select-option/select-option-utils';

export type SelectState = FormState;
export type SelectOption = HTMLPSelectOptionElement & SelectOptionInternalHTMLProps;
export type SelectDropdownDirection = SelectComponentsDropdownDirection;
export type SelectOptgroup = HTMLPOptgroupElement;

export type SelectChangeEventDetail = {
  name: string;
  value: string | number | null | undefined; // Mirrors the p-select-option value type
};
export type SelectToggleEventDetail = { open: boolean };

export const getSelectedOptionString = (options: SelectOption[]): string =>
  options.find((option) => option.selected)?.textContent ?? '';

export const resetSelectedOption = (options: SelectOption[]): void => {
  const currentSelectedOption = options.find((option) => option.selected);
  if (currentSelectedOption) {
    currentSelectedOption.selected = false;
    forceUpdate(currentSelectedOption);
  }
};

export const internalSelect = {
  resetSelectedOption,
};

export const selectOptionByValue = (
  host: HTMLElement,
  options: SelectOption[],
  value: string | number | null | undefined,
  preventWarning = false
): SelectOption | null => {
  internalSelect.resetSelectedOption(options);
  // Strict equality matching: a host value of `null`, `undefined`, a `string` or a `number`
  // only matches an option whose `value` is strictly equal (same type and value). No
  // cross-type coercion (e.g. number `5` does NOT match string `"5"`), and `null` and
  // `undefined` are treated as distinct values.
  const optionToSelect = options.find((option) => option.value === value);

  if (optionToSelect) {
    optionToSelect.selected = true;
    forceUpdate(optionToSelect);
    return optionToSelect;
  }

  if (value !== undefined && value !== null && !preventWarning) {
    consoleWarn(
      `The provided value: ${value} is not included in the options of the ${getTagNameWithoutPrefix(host)}:`,
      host
    );
  }

  return null;
};

export const setSelectedOption = (options: SelectOption[], selectedOption: SelectOption): void => {
  internalSelect.resetSelectedOption(options);
  selectedOption.selected = true;
  forceUpdate(selectedOption);
};
