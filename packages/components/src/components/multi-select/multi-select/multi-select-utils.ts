import { forceUpdate } from '@stencil/core';
import {
  type SelectComponentsDropdownDirection,
  type SelectDropdownDirectionInternal,
  type Theme,
  consoleWarn,
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
export type MultiSelectUpdateEventDetail = MultiSelectUpdateEvent;

export const MULTI_SELECT_OPTION_LIST_SAFE_ZONE = 6;

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

export const updateOptionsFilterState = (
  searchString: string,
  options: MultiSelectOption[],
  optGroups: MultiSelectOptgroup[]
): void => {
  for (const option of options) {
    option.hidden = !option.textContent.toLowerCase().includes(searchString.toLowerCase());
  }

  for (const optgroup of optGroups) {
    optgroup.hidden = !Array.from(optgroup.children).some((child) => !(child as HTMLPMultiSelectOptionElement).hidden);
  }
};

export const hasFilterOptionResults = (options: MultiSelectOption[]): boolean =>
  options.some((option) => !option.hidden);

export const resetFilteredOptions = (options: MultiSelectOption[], optGroups: MultiSelectOptgroup[]): void => {
  for (const option of options) {
    option.hidden = false;
  }

  for (const optgroup of optGroups) {
    optgroup.hidden = false;
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

export const getUsableOptions = (options: MultiSelectOption[]): MultiSelectOption[] =>
  options.filter((option) => !option.hidden && !option.disabled);

export const getHighlightedOption = (options: MultiSelectOption[]): MultiSelectOption =>
  options.find((option) => option.highlighted);

export const setSelectedOptions = (options: MultiSelectOption[], value: string[]): void => {
  const selectedValues = new Set(value);

  for (const option of options) {
    const shouldBeSelected = selectedValues.has(option.value);
    if ((option.selected ?? false) !== shouldBeSelected) {
      option.selected = shouldBeSelected;
      forceUpdate(option);
    }
  }

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

export const resetHighlightedOptions = (options: MultiSelectOption[]): void => {
  for (const option of options) {
    setHighlightedOption(option, false);
  }
};

export const resetSelectedOptions = (options: MultiSelectOption[]): void => {
  for (const option of options) {
    if (option.selected) {
      option.selected = false;
      forceUpdate(option);
    }
  }
};
export const getNewOptionIndex = (
  options: MultiSelectOption[],
  direction: SelectDropdownDirectionInternal
): number | undefined => {
  const validItems = getUsableOptions(options);
  const validMax = validItems.length - 1;
  if (validMax < 0) {
    return undefined;
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
  if (newIndex !== undefined) {
    setNextOptionHighlighted(host, options, newIndex);
  }
};

/**
 * Handles scrolling within the list to ensure that the highlighted item is always visible.
 * @param {HTMLElement} scrollElement - The HTML element to be scrolled.
 * @param {HTMLElement} element - The element to scroll to.
 * @returns {void}
 */
export const handleDropdownScroll = (scrollElement: HTMLElement, element: HTMLElement): void => {
  const { maxHeight } = getComputedStyle(scrollElement);
  const hostElementHeight = Number.parseInt(maxHeight, 10);
  if (scrollElement.scrollHeight > hostElementHeight) {
    element.scrollIntoView();
  }
};
