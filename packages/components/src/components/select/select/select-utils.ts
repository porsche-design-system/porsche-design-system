import { forceUpdate } from '@stencil/core';
import { type SelectComponentsDropdownDirection, type Theme, consoleWarn } from '../../../utils';
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
    if (optionToSelect) {
      optionToSelect.selected = true;
      forceUpdate(optionToSelect);
    } else {
      // TODO: Add select node
      consoleWarn('The provided value is not included in the options of the p-select:', value);
    }
  }
};

export const setSelectedOption = (options: SelectOption[], selectedOption: SelectOption): void => {
  resetSelectedOption(options);
  selectedOption.selected = true;
  forceUpdate(selectedOption);
};

export const updateFilterResults = (
  options: SelectOption[],
  optgroups: SelectOptgroup[],
  filterValue: string
): { hasFilterResults: boolean } => {
  const value = filterValue.toLowerCase();

  for (const option of options) {
    const matches = option.textContent.toLowerCase().includes(value);
    // Highlighted state is only kept if highlighted option matches the filter, otherwise reset
    if (option.highlighted && !matches) {
      option.highlighted = false;
      forceUpdate(option);
    }
    // Use display none to preserve hidden state
    option.style.display = matches ? 'block' : 'none';
  }

  for (const optgroup of optgroups) {
    const visibleOptions = Array.from(optgroup.children).some(
      (child) => (child as HTMLPSelectOptionElement).style.display !== 'none'
    );
    (optgroup as HTMLOptGroupElement).style.display = visibleOptions ? 'block' : 'none';
  }

  return { hasFilterResults: options.some((option) => option.style.display !== 'none' && !option.hidden) };
};
