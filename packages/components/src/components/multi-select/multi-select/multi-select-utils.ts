import type { FormState } from '../../../utils/form/form-state';
import type { SelectDropdownDirections, SelectDropdownDirectionInternal, Theme } from '../../../utils';
import { consoleWarn, determineDropdownDirection, setAttribute, setAttributes } from '../../../utils';
import type { MultiSelectOptionInternalHTMLProps } from '../multi-select-option/multi-select-option-utils';
import { forceUpdate } from '@stencil/core';

export type MultiSelectState = FormState;
export type MultiSelectDropdownDirection = SelectDropdownDirections;
export type MultiSelectOption = HTMLPMultiSelectOptionElement & MultiSelectOptionInternalHTMLProps;

/** @deprecated */
export type MultiSelectUpdateEvent = {
  name: string;
  value: string[];
};
export type MultiSelectUpdateEventDetail = MultiSelectUpdateEvent;

export const syncMultiSelectOptionProps = (options: MultiSelectOption[], theme: Theme): void => {
  options
    .filter((option) => option.theme !== theme)
    .forEach((option) => {
      option.theme = theme;
      forceUpdate(option);
    });
};

export const initNativeMultiSelect = (
  host: HTMLElement,
  name: string,
  disabled: boolean,
  required: boolean
): HTMLSelectElement => {
  const nativeSelect = document.createElement('select');
  setAttributes(nativeSelect, {
    multiple: 'true',
    'aria-hidden': 'true',
    tabindex: '-1',
    slot: 'internal-select',
  });
  syncNativeMultiSelect(nativeSelect, name, disabled, required);
  host.prepend(nativeSelect);
  return nativeSelect;
};

export const syncNativeMultiSelect = (
  nativeSelect: HTMLSelectElement,
  name: string,
  disabled: boolean,
  required: boolean
): void => {
  setAttribute(nativeSelect, 'name', name);
  nativeSelect.toggleAttribute('disabled', disabled);
  nativeSelect.toggleAttribute('required', required);
};

export const updateNativeOptions = (nativeSelect: HTMLSelectElement, multiSelectOptions: MultiSelectOption[]): void => {
  nativeSelect.innerHTML = getSelectedOptions(multiSelectOptions)
    .map((option) => `<option value="${option.value}" selected="${option.selected}">${option.textContent}</option>`)
    .join('');
};

export const updateOptionsFilterState = (searchString: string, options: MultiSelectOption[]): void => {
  options.forEach((option) => (option.hidden = !option.textContent.toLowerCase().includes(searchString.toLowerCase())));
};

export const hasFilterOptionResults = (options: MultiSelectOption[]): boolean =>
  options.some((option) => !option.hidden);

export const resetFilteredOptions = (options: MultiSelectOption[]): void =>
  options.forEach((option) => (option.hidden = false));

export const getSelectedOptions = (options: MultiSelectOption[]): MultiSelectOption[] =>
  options.filter((option) => option.selected);

export const getSelectedOptionValues = (options: MultiSelectOption[]): string[] =>
  options.filter((option) => option.selected).map((option) => option.value);

export const getSelectedOptionsString = (options: MultiSelectOption[]): string =>
  getSelectedOptions(options)
    .map((option) => option.textContent)
    .join(', ');

export const getUsableOptions = (options: MultiSelectOption[]): MultiSelectOption[] =>
  options.filter((option) => !option.hidden && !option.disabled);

export const getHighlightedOption = (options: MultiSelectOption[]): MultiSelectOption =>
  options.find((option) => option.highlighted);

export const setSelectedOptions = (options: MultiSelectOption[], value: string[]): void => {
  const selectedValues = new Set(value);

  options.forEach((option) => {
    const shouldBeSelected = selectedValues.has(option.value);
    if ((option.selected ?? false) !== shouldBeSelected) {
      option.selected = shouldBeSelected;
      forceUpdate(option);
    }
  });

  const valuesNotIncluded = value.filter((val) => !options.some((option) => option.value === val));

  if (valuesNotIncluded.length > 0) {
    consoleWarn(
      'The following values are not included in the options of the p-multi-select:',
      valuesNotIncluded.join(', ')
    );
  }
};

export const setHighlightedOption = (option: MultiSelectOption, highlighted: boolean): void => {
  option.highlighted = highlighted;
  forceUpdate(option);
};

export const getHighlightedOptionIndex = (options: MultiSelectOption[]): number =>
  options.indexOf(getHighlightedOption(options));

export const setNextOptionHighlighted = (host: HTMLElement, options: MultiSelectOption[], newIndex: number): void => {
  const oldIndex = getHighlightedOptionIndex(options);
  if (oldIndex !== -1) {
    setHighlightedOption(options[oldIndex], false);
  }
  setHighlightedOption(options[newIndex], true);
  handleDropdownScroll(host, options[newIndex]);
};

export const setFirstOptionHighlighted = (host: HTMLElement, options: MultiSelectOption[]): void => {
  const validOptions = getUsableOptions(options);
  setNextOptionHighlighted(host, options, options.indexOf(validOptions[0]));
};

export const setLastOptionHighlighted = (host: HTMLElement, options: MultiSelectOption[]): void => {
  const validOptions = getUsableOptions(options);
  setNextOptionHighlighted(host, options, options.indexOf(validOptions.at(-1)));
};

export const resetHighlightedOptions = (options: MultiSelectOption[]): void =>
  options.forEach((option) => setHighlightedOption(option, false));

export const resetSelectedOptions = (options: MultiSelectOption[]): void =>
  options.forEach((option) => {
    if (option.selected) {
      option.selected = false;
      forceUpdate(option);
    }
  });

export const getNewOptionIndex = (options: MultiSelectOption[], direction: SelectDropdownDirectionInternal): number => {
  const validItems = getUsableOptions(options);
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
  options: MultiSelectOption[],
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
  direction: SelectDropdownDirections,
  host: HTMLElement,
  options: MultiSelectOption[]
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
