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
  value: string | number | undefined; // This matches the p-select-option value type
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
  // `null` is treated the same as `undefined` (no preselection / unset value) and matches
  // an option whose value is `undefined`. Otherwise we compare via `String(...)` coercion so a
  // numeric host value matches a string option value and vice versa. This mirrors the platform:
  // form data and `formStateRestoreCallback` always deliver strings, so coercion guarantees the
  // same option is selected before and after a form-state restore regardless of the original
  // JS type used in `value`.
  const isValueUnset = value === undefined || value === null;
  const optionToSelect = options.find((option) =>
    isValueUnset ? option.value === undefined : option.value !== undefined && String(option.value) === String(value)
  );

  if (optionToSelect) {
    optionToSelect.selected = true;
    forceUpdate(optionToSelect);
    return optionToSelect;
  }

  if (!isValueUnset && !preventWarning) {
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
