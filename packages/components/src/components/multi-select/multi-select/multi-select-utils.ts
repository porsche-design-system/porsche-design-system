import { FormState } from '../../../utils/form/form-state';
import {
  determineDropdownDirection,
  SelectDropdownDirection,
  SelectDropdownDirectionInternal,
} from '../../../utils/select/select-dropdown';
import { Theme } from '../../../utils';
import { forceUpdate } from '@stencil/core';
import { MultiSelectOptionInternalHTMLProps } from '../multi-select-option/multi-select-option-utils';

export type MultiSelectState = FormState;
export type MultiSelectDropdownDirection = SelectDropdownDirection;

export const syncMultiSelectOptionProps = (options: HTMLPMultiSelectOptionElement[], theme: Theme): void => {
  options.forEach((item: HTMLElement & MultiSelectOptionInternalHTMLProps) => {
    item.theme = theme;
    forceUpdate(item);
  });
};

export const syncNativeSelect = (
  nativeSelect: HTMLSelectElement,
  host: HTMLElement,
  name: string,
  disabled: boolean,
  required: boolean
): void => {
  nativeSelect.multiple = true;
  nativeSelect.name = name;
  nativeSelect.disabled = disabled;
  nativeSelect.required = required;
  nativeSelect.ariaHidden = 'true';
  nativeSelect.tabIndex = -1;
  nativeSelect.slot = 'select';
  if (!host.querySelector('SELECT')) {
    host.prepend(nativeSelect);
  }
};

export const updateNativeSelectOptions = (
  nativeSelect: HTMLSelectElement,
  multiSelectOptions: HTMLPMultiSelectOptionElement[]
): void => {
  nativeSelect.innerHTML = getSelectedOptions(multiSelectOptions)
    .map((option) => `<option value="${option.value}" selected="${option.selected}">${option.textContent}</option>`)
    .join('');
};

export const updateMultiSelectOptionsFilterState = (
  searchString: string,
  options: HTMLPMultiSelectOptionElement[]
): void => {
  options.forEach((option) => (option.hidden = !optionIncludesSearchString(option, searchString)));
};

export const optionIncludesSearchString = (option: HTMLPMultiSelectOptionElement, searchString: string): boolean =>
  option.textContent.toLowerCase().includes(searchString.toLowerCase());

export const hasFilterOptionResults = (options: HTMLPMultiSelectOptionElement[]): boolean =>
  options?.some((option) => !option.hidden);

export const resetFilteredOptions = (options: HTMLPMultiSelectOptionElement[]): void =>
  options.forEach((option) => (option.hidden = false));

export const getSelectedOptions = (options: HTMLPMultiSelectOptionElement[]): HTMLPMultiSelectOptionElement[] =>
  options.filter((option) => option.selected);

export const getSelectedOptionsString = (options: HTMLPMultiSelectOptionElement[]): string =>
  getSelectedOptions(options)
    .map((option) => option.textContent)
    .join(', ');

export const getValidSelectOptions = (options: HTMLPMultiSelectOptionElement[]): HTMLPMultiSelectOptionElement[] =>
  options.filter((option) => !option.hidden && !option.disabled);

export const getHighlightedOption = (options: HTMLPMultiSelectOptionElement[]): HTMLPMultiSelectOptionElement =>
  options.find((option) => option.shadowRoot.querySelector('.option').classList.contains('option--highlighted'));

export const setHighlightedOption = (option: HTMLPMultiSelectOptionElement, highlighted: boolean): void =>
  option.shadowRoot.querySelector('.option').classList[highlighted ? 'add' : 'remove']('option--highlighted');

export const getHighlightedOptionIndex = (options: HTMLPMultiSelectOptionElement[]): number =>
  options.findIndex((option) => option === getHighlightedOption(options));

export const setNextOptionHighlighted = (
  host: HTMLElement,
  options: HTMLPMultiSelectOptionElement[],
  newIndex: number
): void => {
  const oldIndex = getHighlightedOptionIndex(options);
  if (oldIndex !== -1) {
    setHighlightedOption(options[oldIndex], false);
  }
  setHighlightedOption(options[newIndex], true);
  handleDropdownScroll(host, options[newIndex]);
};

export const setFirstOptionHighlighted = (host: HTMLElement, options: HTMLPMultiSelectOptionElement[]): void => {
  const validOptions = getValidSelectOptions(options);
  setNextOptionHighlighted(host, options, options.indexOf(validOptions[0]));
};

export const setLastOptionHighlighted = (host: HTMLElement, options: HTMLPMultiSelectOptionElement[]): void => {
  const validOptions = getValidSelectOptions(options);
  setNextOptionHighlighted(host, options, options.indexOf(validOptions.at(-1)));
};

export const resetHighlightedOptions = (options: HTMLPMultiSelectOptionElement[]): void =>
  options.forEach((option) => setHighlightedOption(option, false));

export const getNewOptionIndex = (
  options: HTMLPMultiSelectOptionElement[],
  direction: SelectDropdownDirectionInternal
): number => {
  const validItems = getValidSelectOptions(options);
  const validMax = validItems.length - 1;
  if (validMax < 0) {
    return;
  }
  const oldIndex = getHighlightedOptionIndex(validItems);
  let newIndex = oldIndex;
  if (direction === 'down') {
    newIndex = oldIndex < validMax ? oldIndex + 1 : 0;
  } else if (direction === 'up') {
    newIndex = oldIndex > 0 ? oldIndex - 1 : validMax;
  }
  return options.indexOf(validItems[newIndex]);
};

export const updateHighlightedOption = (
  host: HTMLElement,
  options: HTMLPMultiSelectOptionElement[],
  direction: SelectDropdownDirectionInternal
): void => {
  const newIndex = getNewOptionIndex(options, direction);
  setNextOptionHighlighted(host, options, newIndex);
};

/**
 * Handles scrolling within the list to ensure that the highlighted item is always visible.
 * @param {HTMLElement} scrollElement - The HTML element to be scrolled.
 * @param {HTMLElement} element - The element to scroll to.
 * @returns {void}
 */
export const handleDropdownScroll = (scrollElement: HTMLElement, element: HTMLElement): void => {
  const { maxHeight } = getComputedStyle(scrollElement);
  const hostElementHeight = parseInt(maxHeight, 10);
  if (scrollElement.scrollHeight > hostElementHeight) {
    element.scrollIntoView();
  }
};

export const getDropdownDirection = (
  direction: SelectDropdownDirection,
  host: HTMLElement,
  options: HTMLPMultiSelectOptionElement[]
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
