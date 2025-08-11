import type { HTMLStencilElement } from '@stencil/core/internal';
import type { MultiSelectAction } from './getMultiSelectActionFromKeyboardEvent';
import type { SelectAction } from './getSelectActionFromKeyboardEvent';

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
 * Gets the updated index based on the current index, maximum index, and the select action.
 *
 * @param {number} currentIndex - The current index in the list of options.
 * @param {number} maxIndex - The maximum index in the list of options.
 * @param {SelectAction} action - The select action indicating how to update the index.
 * @returns {number} - The updated index after applying the specified action.
 */
export const getUpdatedIndex = (
  currentIndex: number,
  maxIndex: number,
  action: SelectAction | MultiSelectAction
): number => {
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
 * Determines the next option to highlight in a select dropdown based on the given action.
 *
 * @template T - The type of the option.
 * @param {T[]} options - The array of all available options.
 * @param {T | null} currentlyHighlightedOption - The currently highlighted option, if any.
 * @param {SelectAction | MultiSelectAction} action - The action indicating the navigation direction.
 * @returns {T | null} The next option to highlight, or null if none is available.
 */
export const getNextOptionToHighlight = <T extends Option>(
  options: T[],
  currentlyHighlightedOption: T | null,
  action: SelectAction | MultiSelectAction
): Option | null => {
  const usableOptions = getUsableSelectOptions(options);
  const currentIndex = usableOptions.indexOf(currentlyHighlightedOption);
  const newIndex = getUpdatedIndex(currentIndex, usableOptions.length - 1, action);
  return newIndex !== -1 ? usableOptions[newIndex] : null;
};

/**
 * Updates the highlighted option in a select dropdown.
 *
 * @template T - The type of the option.
 * @param {T | null} currentlyHighlightedOption - The currently highlighted option, if any.
 * @param {T} newHighlightedOption - The option to highlight.
 * @param {boolean} [scrollIntoView=true] - Whether to scroll the new option into view.
 * @returns {T} The newly highlighted option.
 */
export const updateHighlightedOption = <T extends Option>(
  currentlyHighlightedOption: T | null,
  newHighlightedOption: T | null,
  scrollIntoView: boolean = true
): Option | null => {
  if (currentlyHighlightedOption === newHighlightedOption) return currentlyHighlightedOption;
  currentlyHighlightedOption && setHighlightedSelectOption(currentlyHighlightedOption, false);
  if (newHighlightedOption !== null) {
    setHighlightedSelectOption(newHighlightedOption, true);
    if (scrollIntoView) {
      // Need to wait until the listbox is opened before scrolling
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          newHighlightedOption.scrollIntoView({
            block: 'nearest',
            // behavior: 'smooth' // Intentionally not smooth since highlighted options can quickly change when searching
          });
        });
      });
    }
  }
  return newHighlightedOption;
};

/**
 * Filters an array of select options to include only those that are usable.
 *
 * @template T - The type of options in the array.
 * @param {T[]} options - The array of select options to filter.
 * @returns {T[]} - An array of usable select options.
 */
export const getUsableSelectOptions = <T extends Option>(options: T[]): T[] =>
  options.filter((option) => isUsableOption(option));

/**
 * Checks if an option is usable (not hidden, disabled or with a display style of none).
 *
 * @template T - The type of option.
 * @param {T} option - The option to check.
 * @returns {boolean} - A boolean flag indicating if the option is usable.
 */
export const isUsableOption = <T extends Option>(option: T): boolean =>
  !option.hidden && !option.disabled && option.style.display !== 'none';

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
 * @returns {T | null} - The next matching select option, or null if none is found.
 */
export const getMatchingSelectOptionIndex = <T extends Option>(options: T[], filter: string): T | null => {
  const usableOptions = getUsableSelectOptions(options);
  const startIndex = getHighlightedSelectOptionIndex(options) + 1;
  // Shift already searched options to the end of the array in order to find the next matching option
  const orderedOptions = [...usableOptions.slice(startIndex), ...usableOptions.slice(0, startIndex)];
  const firstMatch = filterSelectOptions(orderedOptions, filter)[0];

  const allSameLetter = (str: string): boolean => str.split('').every((letter: string) => letter === str[0]);

  // first check if there is an exact match for the typed string
  if (firstMatch) {
    return usableOptions[usableOptions.indexOf(firstMatch)];
  }
  // if the same letter is being repeated, cycle through first-letter matches
  if (allSameLetter(filter)) {
    const matches = filterSelectOptions(orderedOptions, filter[0]);
    return usableOptions[usableOptions.indexOf(matches[0])];
  }
  // No matching option found

  return null;
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
  // Avoid rerender for improved performance
  option.shadowRoot.querySelector('.option').classList.toggle('option--highlighted', highlighted);
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
 * Gets the currently selected select option.
 *
 * @template T - The type of options in the array.
 * @param {T[]} options - The array of select options.
 * @returns {T} - The currently selected select option, or undefined if none is selected.
 */
export const getSelectedOption = <T extends Option>(options: T[]): T => options.find((option) => option.selected);

/**
 * Gets the last selected select option.
 *
 * @template T - The type of options in the array.
 * @param {T[]} options - The array of select options.
 * @returns {T} - The last selected select option, or undefined if none is selected.
 */
export const getLastSelectedOption = <T extends Option>(options: T[]): T | undefined => {
  for (let i = options.length - 1; i >= 0; i--) {
    if (options[i].selected) {
      return options[i];
    }
  }
  return undefined;
};
