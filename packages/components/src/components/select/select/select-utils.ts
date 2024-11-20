import { forceUpdate } from '@stencil/core';
import {
  type SelectComponentsDropdownDirection,
  type SelectDropdownDirectionInternal,
  type Theme,
  consoleWarn,
  determineDropdownDirection,
  getHighlightedSelectOptionIndex,
  getUsableSelectOptions,
} from '../../../utils';
import type { FormState } from '../../../utils/form/form-state';
import type { OptgroupInternalHTMLProps } from '../../optgroup/optgroup-utils';
import type { SelectOptionInternalHTMLProps } from '../select-option/select-option-utils';
export type SelectState = FormState;
export type SelectOption = HTMLPSelectOptionElement & SelectOptionInternalHTMLProps;
export type SelectDropdownDirection = SelectComponentsDropdownDirection;
export type SelectOptgroup = HTMLPOptgroupElement & OptgroupInternalHTMLProps;

export type SelectUpdateEventDetail = {
  name: string;
  value: string;
};

// TODO: share between select & multi-select
export const syncSelectChildrenProps = (children: (SelectOption | SelectOptgroup)[], theme: Theme): void => {
  for (const child of children.filter((child) => child.theme !== theme)) {
    child.theme = theme;
    forceUpdate(child);
  }
};

export const getSelectedOptionString = (options: SelectOption[]): string =>
  options.find((option) => option.selected)?.textContent ?? '';

export const resetSelectedOption = (options: SelectOption[]): void => {
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
      // TODO: Add select node
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

// TODO: This is copied from multi-select, extract and reuse in both components
export const getSelectDropdownDirection = (
  direction: SelectComponentsDropdownDirection,
  host: HTMLElement,
  options: SelectOption[]
): SelectDropdownDirectionInternal => {
  if (direction !== 'auto') {
    return direction;
  }
  if (host) {
    const visibleOptionsLength = options.filter((option) => !option.hidden).length;
    return determineDropdownDirection(host, visibleOptionsLength);
  }
  return 'down';
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
