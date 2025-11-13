import { forceUpdate } from '@stencil/core';
import {
  consoleWarn,
  getTagNameWithoutPrefix,
  type SelectComponentsDropdownDirection,
  type Theme,
} from '../../../utils';
import type { FormState } from '../../../utils/form/form-state';
import type { OptgroupInternalHTMLProps } from '../../optgroup/optgroup-utils';
import type { MultiSelectOptionInternalHTMLProps } from '../multi-select-option/multi-select-option-utils';

export type MultiSelectState = FormState;
export type MultiSelectDropdownDirection = SelectComponentsDropdownDirection;
export type MultiSelectOption = HTMLPMultiSelectOptionElement & MultiSelectOptionInternalHTMLProps;
export type MultiSelectOptgroup = HTMLPOptgroupElement & OptgroupInternalHTMLProps;

/** @deprecated */
export type MultiSelectUpdateEvent = {
  name: string;
  value: string[];
};
/** @deprecated */
export type MultiSelectUpdateEventDetail = MultiSelectUpdateEvent;
export type MultiSelectChangeEventDetail = MultiSelectUpdateEventDetail;
export type MultiSelectToggleEventDetail = { open: boolean };

// TODO: share between select & multi-select
export const syncMultiSelectChildrenProps = (
  children: (MultiSelectOption | MultiSelectOptgroup)[],
  theme: Theme
): void => {
  for (const child of children.filter((child) => child.theme !== theme)) {
    child.theme = theme;
    forceUpdate(child);
  }
};

export const getSelectedOptions = (options: MultiSelectOption[]): MultiSelectOption[] =>
  options.filter((option) => option.selected);

export const getSelectedOptionValues = (options: MultiSelectOption[]): string[] =>
  options.filter((option) => option.selected).map((option) => option.value);

export const getSelectedOptionsString = (options: MultiSelectOption[]): string =>
  getSelectedOptions(options)
    .map((option) => option.textContent)
    .join(', ');

export const selectOptionsByValue = (
  host: HTMLElement,
  options: MultiSelectOption[],
  value: string[],
  preventWarning = false
): MultiSelectOption[] => {
  const selectedValues = new Set(value);
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

  const valuesNotIncluded = value.filter((val) => !options.some((option) => option.value === val));

  if (valuesNotIncluded.length > 0 && !preventWarning) {
    consoleWarn(
      `The provided value: ${valuesNotIncluded.join(', ')} is not included in the options of the ${getTagNameWithoutPrefix(host)}:`,
      host
    );
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
