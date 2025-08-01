import { forceUpdate } from '@stencil/core';
import type { HTMLStencilElement } from '@stencil/core/internal';

type SelectAction =
  | 'Close' // Close select dropdown
  | 'CloseSelect' // Close and select currently highlighted option
  | 'First' // Highlight first option
  | 'Last' // Highlight last option
  | 'Next' // Highlight next option
  | 'Open' // Open select dropdown
  | 'PageDown' // Go 10 options down or to the last option
  | 'PageUp' // Go 10 options up or to the first option
  | 'Previous' // Highlight the previous option
  | 'Select' // Select the currently highlighted option
  | 'Type'; // Jump to the matching option by searching

export type Option = HTMLElement &
  HTMLStencilElement & {
    disabled?: boolean;
    highlighted?: boolean;
    selected?: boolean;
  };

// The amount of time in ms after the last key press before the searchString will get cleared
export const SELECT_SEARCH_TIMEOUT: number = 500;
// The amount of options to be jumped when performing a page-based navigation using PageUp or PageDown.
const PAGE_UP_DOWN_STEP_AMOUNT: number = 10;

/**
 * Determines the action to be taken based on a keyboard event and the state of the select menu.
 *
 * @param {KeyboardEvent} event - The keyboard event triggering the action.
 * @param {boolean} menuOpen - A boolean indicating whether the select menu is open or closed.
 * @returns {SelectAction} - The corresponding action to be performed.
 */
export const getMultiSelectActionFromKeyboardEvent = (
  event: KeyboardEvent,
  menuOpen: boolean
): SelectAction | undefined => {
  const { key, altKey } = event;
  const openKeys = ['ArrowDown', 'ArrowUp', 'Enter', ' ']; // all keys that will do the default open action
  // handle opening when closed
  if (!menuOpen && openKeys.includes(key)) {
    return 'Open';
  }

  // home and end move the selected option when open or closed
  if (key === 'Home') {
    return 'First';
  }
  if (key === 'End') {
    return 'Last';
  }

  // handle keys when open
  if (menuOpen) {
    if (key === 'ArrowUp' && altKey) {
      return 'CloseSelect';
    }
    if (key === 'ArrowDown' && !altKey) {
      return 'Next';
    }
    if (key === 'ArrowUp') {
      return 'Previous';
    }
    if (key === 'PageUp') {
      return 'PageUp';
    }
    if (key === 'PageDown') {
      return 'PageDown';
    }
    if (key === 'Escape' || key === 'Tab') {
      return 'Close';
    }
    if (key === 'Enter' || key === ' ') {
      return 'CloseSelect';
    }
  }
  return undefined;
};

/**
 * Determines the action to be taken based on a keyboard event and the state of the select menu.
 *
 * @param {KeyboardEvent} event - The keyboard event triggering the action.
 * @param {boolean} menuOpen - A boolean indicating whether the select menu is open or closed.
 * @returns {SelectAction} - The corresponding action to be performed.
 */
export const getActionFromKeyboardEvent = (event: KeyboardEvent, menuOpen: boolean): SelectAction | undefined => {
  const { key, altKey, ctrlKey, metaKey } = event;
  const openKeys = ['ArrowDown', 'ArrowUp', 'Enter', ' ']; // all keys that will do the default open action
  // handle opening when closed
  if (!menuOpen && openKeys.includes(key)) {
    return 'Open';
  }

  // home and end move the selected option when open or closed
  if (key === 'Home') {
    return 'First';
  }
  if (key === 'End') {
    return 'Last';
  }

  // handle typing characters when open or closed
  if (key === 'Backspace' || key === 'Clear' || (key.length === 1 && key !== ' ' && !altKey && !ctrlKey && !metaKey)) {
    return 'Type';
  }

  // handle keys when open
  if (menuOpen) {
    if (key === 'ArrowUp' && altKey) {
      return 'CloseSelect';
    }
    if (key === 'ArrowDown' && !altKey) {
      return 'Next';
    }
    if (key === 'ArrowUp') {
      return 'Previous';
    }
    if (key === 'PageUp') {
      return 'PageUp';
    }
    if (key === 'PageDown') {
      return 'PageDown';
    }
    if (key === 'Escape') {
      return 'Close';
    }
    if (key === 'Enter' || key === ' ' || key === 'Tab') {
      return 'CloseSelect';
    }
  }
  return undefined;
};

/**
 * Gets the updated index based on the current index, maximum index, and the select action.
 *
 * @param {number} currentIndex - The current index in the list of options.
 * @param {number} maxIndex - The maximum index in the list of options.
 * @param {SelectAction} action - The select action indicating how to update the index.
 * @returns {number} - The updated index after applying the specified action.
 */
export const getUpdatedIndex = (currentIndex: number, maxIndex: number, action: SelectAction): number => {
  // No options available, return -1
  if (maxIndex === -1) return -1;

  switch (action) {
    case 'First':
      return 0;
    case 'Last':
      return maxIndex;
    case 'Previous':
      return Math.max(0, currentIndex - 1);
    case 'Next':
      return Math.min(maxIndex, currentIndex + 1);
    case 'PageUp':
      return Math.max(0, currentIndex - PAGE_UP_DOWN_STEP_AMOUNT);
    case 'PageDown':
      return Math.min(maxIndex, currentIndex + PAGE_UP_DOWN_STEP_AMOUNT);
    default:
      return currentIndex;
  }
};

/**
 * Sets the next option in a select dropdown as highlighted, updating the visual state and handling scrolling.
 *
 * @template T - The type of options in the dropdown.
 * @param {T[]} options - The array of options in the dropdown.
 * @param {number} newIndex - The index of the option to be highlighted.
 * @returns {void}
 */
export const setNextSelectOptionHighlighted = <T extends Option>(options: T[], newIndex: number): void => {
  const oldIndex = getHighlightedSelectOptionIndex(options);
  const usableOptions = getUsableSelectOptions(options);
  if (oldIndex !== -1) {
    setHighlightedSelectOption(usableOptions[oldIndex], false);
  }
  if (newIndex !== -1) {
    setHighlightedSelectOption(usableOptions[newIndex], true);
    usableOptions[newIndex].scrollIntoView({
      block: 'nearest',
      // behavior: 'smooth' // Intentionally not smooth since highlighted options can quickly change when searching
    });
  }
};

/**
 * Filters an array of select options to include only those that are usable (not hidden or disabled).
 *
 * @template T - The type of options in the array.
 * @param {T[]} options - The array of select options to filter.
 * @returns {T[]} - An array of usable select options.
 */
export const getUsableSelectOptions = <T extends Option>(options: T[]): T[] =>
  options.filter((option) => !option.hidden && !option.disabled && option.style.display !== 'none');

/**
 * Filters an array of select options based on a filter string, considering visibility and usability.
 *
 * @template T - The type of options in the array.
 * @param {T[]} options - The array of select options to filter.
 * @param {string} filter - The filter string to match against option text content.
 * @returns {T[]} - An array of filtered and usable select options.
 */
export const filterSelectOptions = <T extends Option>(options: T[], filter: string): T[] =>
  getUsableSelectOptions(options).filter(
    (option) => option.textContent.trim().toLowerCase().indexOf(filter.toLowerCase()) === 0
  );

/**
 * Determines the index of the next matching select option based on a filter string.
 *
 * @template T - The type of options in the array.
 * @param {T[]} options - The array of select options to search.
 * @param {string} filter - The filter string to match against option text content.
 * @returns {number} - The index of the next matching select option, or -1 if none is found.
 */
export const getMatchingSelectOptionIndex = <T extends Option>(options: T[], filter: string): number => {
  const usableOptions = getUsableSelectOptions(options);
  const startIndex = getHighlightedSelectOptionIndex(options) + 1;
  // Shift already searched options to the end of the array in order to find the next matching option
  const orderedOptions = [...usableOptions.slice(startIndex), ...usableOptions.slice(0, startIndex)];
  const firstMatch = filterSelectOptions(orderedOptions, filter)[0];

  const allSameLetter = (str: string): boolean => str.split('').every((letter: string) => letter === str[0]);

  // first check if there is an exact match for the typed string
  if (firstMatch) {
    return usableOptions.indexOf(firstMatch);
  }
  // if the same letter is being repeated, cycle through first-letter matches
  if (allSameLetter(filter)) {
    const matches = filterSelectOptions(orderedOptions, filter[0]);
    return usableOptions.indexOf(matches[0]);
  }
  // No matching option found

  return -1;
};

/**
 * Sets the highlighted state of a select option and triggers an update.
 *
 * @template T - The type of the select option.
 * @param {T} option - The select option to set the highlighted state for.
 * @param {boolean} highlighted - The new highlighted state.
 * @returns {void}
 */
export const setHighlightedSelectOption = <T extends Option>(option: T, highlighted: boolean): void => {
  option.highlighted = highlighted;
  forceUpdate(option);
};

/**
 * Gets the index of the currently highlighted select option.
 *
 * @template T - The type of options in the array.
 * @param {T[]} options - The array of select options.
 * @returns {number} - The index of the highlighted select option, or -1 if none is highlighted.
 */
export const getHighlightedSelectOptionIndex = <T extends Option>(options: T[]): number =>
  getUsableSelectOptions(options).indexOf(getHighlightedSelectOption(options));

/**
 * Gets the currently highlighted select option.
 *
 * @template T - The type of options in the array.
 * @param {T[]} options - The array of select options.
 * @returns {T} - The currently highlighted select option, or undefined if none is highlighted.
 */
export const getHighlightedSelectOption = <T extends Option>(options: T[]): T =>
  options.find((option) => option.highlighted);

/**
 * Gets the index of the currently selected select option.
 *
 * @template T - The type of options in the array.
 * @param {T[]} options - The array of select options.
 * @returns {number} - The index of the selected select option, or -1 if none is selected.
 */
export const getSelectedSelectOptionIndex = <T extends Option>(options: T[]): number =>
  getUsableSelectOptions(options).indexOf(getSelectedSelectOption(options));

/**
 * Gets the currently selected select option.
 *
 * @template T - The type of options in the array.
 * @param {T[]} options - The array of select options.
 * @returns {T} - The currently selected select option, or undefined if none is selected.
 */
export const getSelectedSelectOption = <T extends Option>(options: T[]): T => options.find((option) => option.selected);
