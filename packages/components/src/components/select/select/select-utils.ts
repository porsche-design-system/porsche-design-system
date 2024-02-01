import { FormState } from '../../../utils/form/form-state';
import {
  consoleWarn,
  determineDropdownDirection,
  SelectDropdownDirection,
  SelectDropdownDirectionInternal,
  setAttribute,
  setAttributes,
  Theme,
} from '../../../utils';
import { SelectOptionInternalHTMLProps } from '../select-option/select-option-utils';
import { forceUpdate } from '@stencil/core';

export type SelectState = FormState;
export type SelectOption = HTMLPSelectOptionElement & SelectOptionInternalHTMLProps;

export type SelectUpdateEventDetail = {
  name: string;
  value: string;
};

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
  if (value === undefined) {
    // Option without value for empty selection
    const optionToSelect = options.find((option) => option.value === undefined);
    if (optionToSelect) {
      optionToSelect.selected = true;
      forceUpdate(optionToSelect);
    }
  } else {
    resetSelectedOption(options);
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

export const updateNativeSelectOption = (nativeSelect: HTMLSelectElement, value: string): void => {
  nativeSelect.innerHTML = value ? `<option value="${value}" selected></option>` : '';
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

// TODO: Similar to multi-select
export const getHighlightedSelectOptionIndex = (options: SelectOption[]): number =>
  options.indexOf(getHighlightedSelectOption(options));

// TODO: Similiar to multi-select
export const getHighlightedSelectOption = (options: SelectOption[]): SelectOption =>
  options.find((option) => option.highlighted);

// TODO: Kind of similar to multi-select
export const resetHighlightedSelectOption = (options: SelectOption[]): void => {
  setHighlightedSelectOption(getHighlightedSelectOption(options), false);
};

// TODO: Similar to multi-select
export const setHighlightedSelectOption = (option: SelectOption, highlighted: boolean): void => {
  option.highlighted = highlighted;
  forceUpdate(option);
};

// TODO: Similar to multi-select
export const getUsableSelectOptions = (options: SelectOption[]): SelectOption[] =>
  options.filter((option) => !option.hidden && !option.disabled);

// TODO: Similar to multi-select
export const setNextSelectOptionHighlighted = (host: HTMLElement, options: SelectOption[], newIndex: number): void => {
  const oldIndex = getHighlightedSelectOptionIndex(options);
  if (oldIndex !== -1) {
    setHighlightedSelectOption(options[oldIndex], false);
  }
  setHighlightedSelectOption(options[newIndex], true);
  handleSelectDropdownScroll(host, options[newIndex]);
};

// TODO: Similar to multi-select
export const setFirstSelectOptionHighlighted = (host: HTMLElement, options: SelectOption[]): void => {
  const validOptions = getUsableSelectOptions(options);
  setNextSelectOptionHighlighted(host, options, options.indexOf(validOptions[0]));
};

// TODO: Similar to multi-select
export const setLastSelectOptionHighlighted = (host: HTMLElement, options: SelectOption[]): void => {
  const validOptions = getUsableSelectOptions(options);
  setNextSelectOptionHighlighted(host, options, options.indexOf(validOptions.at(-1)));
};

// TODO: Similar to multi-select
export const getNewSelectOptionIndex = (
  options: SelectOption[],
  direction: SelectDropdownDirectionInternal
): number => {
  const validItems = getUsableSelectOptions(options);
  const validMax = validItems.length - 1;
  if (validMax < 0) {
    return;
  }
  const oldIndex = getHighlightedSelectOptionIndex(validItems);
  let newIndex = oldIndex;
  if (direction === 'down') {
    newIndex = oldIndex < validMax ? oldIndex + 1 : 0;
  } else if (direction === 'up') {
    newIndex = oldIndex > 0 ? oldIndex - 1 : validMax;
  }
  return options.indexOf(validItems[newIndex]);
};

// TODO: Similar to multi-select
export const updateHighlightedSelectOption = (
  host: HTMLElement,
  options: SelectOption[],
  direction: SelectDropdownDirectionInternal
): void => {
  const newIndex = getNewSelectOptionIndex(options, direction);
  setNextSelectOptionHighlighted(host, options, newIndex);
};

// TODO: Similar to multi-select
/**
 * Handles scrolling within the list to ensure that the highlighted item is always visible.
 * @param {HTMLElement} scrollElement - The HTML element to be scrolled.
 * @param {HTMLElement} element - The element to scroll to.
 * @returns {void}
 */
export const handleSelectDropdownScroll = (scrollElement: HTMLElement, element: HTMLElement): void => {
  const { maxHeight } = getComputedStyle(scrollElement);
  const hostElementHeight = parseInt(maxHeight, 10);
  if (scrollElement.scrollHeight > hostElementHeight) {
    element.scrollIntoView();
  }
};
