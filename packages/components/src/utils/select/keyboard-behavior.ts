import { SelectOption } from '../../components/select/select/select-utils';
import { forceUpdate } from '@stencil/core';

// Save a list of named combobox actions, for future readability
export enum SelectActions {
  Close = 0,
  CloseSelect = 1,
  First = 2,
  Last = 3,
  Next = 4,
  Open = 5,
  PageDown = 6,
  PageUp = 7,
  Previous = 8,
  Select = 9,
  Type = 10,
}

type Option = {
  textContent: string;
  hidden: boolean;
  disabled?: boolean;
};

// TODO: Improve this to be a smooth transition
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

export const filterOptions = <T extends Option>(options: T[], filter: string): T[] =>
  options.filter((option) => {
    if (option.hidden || option.disabled) return false;
    return option.textContent.toLowerCase().indexOf(filter.toLowerCase()) === 0;
  });

// map a key press to an action
export const getActionFromKey = (event: KeyboardEvent, menuOpen: boolean) => {
  const { key, altKey, ctrlKey, metaKey } = event;
  const openKeys = ['ArrowDown', 'ArrowUp', 'Enter', ' ']; // all keys that will do the default open action
  // handle opening when closed
  if (!menuOpen && openKeys.includes(key)) {
    return SelectActions.Open;
  }

  // home and end move the selected option when open or closed
  if (key === 'Home') {
    return SelectActions.First;
  }
  if (key === 'End') {
    return SelectActions.Last;
  }

  // handle typing characters when open or closed
  if (key === 'Backspace' || key === 'Clear' || (key.length === 1 && key !== ' ' && !altKey && !ctrlKey && !metaKey)) {
    return SelectActions.Type;
  }

  // handle keys when open
  if (menuOpen) {
    if (key === 'ArrowUp' && altKey) {
      return SelectActions.CloseSelect;
    } else if (key === 'ArrowDown' && !altKey) {
      return SelectActions.Next;
    } else if (key === 'ArrowUp') {
      return SelectActions.Previous;
    } else if (key === 'PageUp') {
      return SelectActions.PageUp;
    } else if (key === 'PageDown') {
      return SelectActions.PageDown;
    } else if (key === 'Escape') {
      return SelectActions.Close;
    } else if (key === 'Enter' || key === ' ') {
      return SelectActions.CloseSelect;
    }
  }
};

// get an updated option index after performing an action
export const getUpdatedIndex = (currentIndex: number, maxIndex: number, action: SelectActions) => {
  const pageSize = 10; // used for pageup/pagedown

  switch (action) {
    case SelectActions.First:
      return 0;
    case SelectActions.Last:
      return maxIndex;
    case SelectActions.Previous:
      return Math.max(0, currentIndex - 1);
    case SelectActions.Next:
      return Math.min(maxIndex, currentIndex + 1);
    case SelectActions.PageUp:
      return Math.max(0, currentIndex - pageSize);
    case SelectActions.PageDown:
      return Math.min(maxIndex, currentIndex + pageSize);
    default:
      return currentIndex;
  }
};

export const setNextSelectOptionHighlighted = (
  listElement: HTMLElement,
  options: SelectOption[],
  newIndex: number
): void => {
  const oldIndex = getHighlightedSelectOptionIndex(options);
  if (oldIndex !== -1) {
    setHighlightedSelectOption(options[oldIndex], false);
  }
  setHighlightedSelectOption(options[newIndex], true);
  handleSelectDropdownScroll(listElement, options[newIndex]);
};

const getUsableSelectOptions = (options: SelectOption[]): SelectOption[] =>
  options.filter((option) => !option.hidden && !option.disabled);

const filterSelectOptions = (options: SelectOption[], filter: string): SelectOption[] =>
  getUsableSelectOptions(options).filter(
    (option) => option.textContent.trim().toLowerCase().indexOf(filter.toLowerCase()) === 0
  );

export const setMatchingSelectOptionIndex = (options: SelectOption[], filter: string): number => {
  const startIndex = getHighlightedSelectOptionIndex(options) + 1;
  // Shift already searched options to the end of the array in order to find the next matching option
  const orderedOptions = [...options.slice(startIndex), ...options.slice(0, startIndex)];
  const firstMatch = filterSelectOptions(orderedOptions, filter)[0];

  const allSameLetter = (str: string): boolean => str.split('').every((letter: string) => letter === str[0]);

  // first check if there is an exact match for the typed string
  if (firstMatch) {
    return options.indexOf(firstMatch);
  }
  // if the same letter is being repeated, cycle through first-letter matches
  else if (allSameLetter(filter)) {
    const matches = filterSelectOptions(orderedOptions, filter[0]);
    return options.indexOf(matches[0]);
  }
  // No matching option found
  else {
    return -1;
  }
};

// TODO: Use this in select-wrapper as well
export const setMatchingSelectOptionHighlighted = (
  listElement: HTMLElement,
  options: SelectOption[],
  filter: string
): void => {
  const matchingIndex = setMatchingSelectOptionIndex(options, filter);
  if (matchingIndex !== -1) {
    setNextSelectOptionHighlighted(listElement, options, matchingIndex);
  }
};

export const setHighlightedSelectOption = (option: SelectOption, highlighted: boolean): void => {
  option.highlighted = highlighted;
  forceUpdate(option);
};

export const getHighlightedSelectOptionIndex = (options: SelectOption[]): number =>
  options.indexOf(getHighlightedSelectOption(options));

export const getHighlightedSelectOption = (options: SelectOption[]): SelectOption =>
  options.find((option) => option.highlighted);
