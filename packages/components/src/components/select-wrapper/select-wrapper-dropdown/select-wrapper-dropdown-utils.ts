import type { DropdownDirectionInternal } from '../select-wrapper/select-wrapper-utils';
import { getHTMLElements, getTagName, hasAttribute } from '../../../utils';

/**
 * Handles scrolling within the list to ensure that the highlighted item is always visible.
 * @param {HTMLElement} ul - The HTML element to be scrolled.
 * @param {number} highlightedIndex - The index of the currently highlighted item within the element.
 * @returns {void}
 */
export const handleScroll = (ul: HTMLElement, highlightedIndex: number): void => {
  const { maxHeight } = getComputedStyle(ul);
  const hostElementHeight = parseInt(maxHeight, 10);
  if (ul.scrollHeight > hostElementHeight) {
    const highlightedNode = getHTMLElements(ul, 'li')[highlightedIndex];

    if (highlightedNode) {
      highlightedNode.scrollIntoView({ block: 'center' });
    }
  }
};

export type OptionMap = {
  value: string;
  disabled: boolean;
  hidden: boolean; // used for filtering
  initiallyHidden: boolean;
  selected: boolean;
  highlighted: boolean;
  title?: string; // for optgroup
};

export const getOptionsElements = (select: HTMLSelectElement): HTMLOptionElement[] => Array.from(select.options);

export const getOptionMaps = (options: HTMLOptionElement[]): OptionMap[] =>
  options.map((item) => {
    const { selected, parentElement, previousElementSibling } = item;
    const option: OptionMap = {
      value: item.text,
      disabled: hasAttribute(item, 'disabled'),
      hidden: false,
      initiallyHidden: hasAttribute(item, 'hidden'),
      selected,
      highlighted: selected,
      ...(getTagName(parentElement) === 'optgroup' &&
        previousElementSibling === null && { title: (parentElement as HTMLOptGroupElement).label }),
    };
    return option;
  });

export const setSelectedOptionMaps = (options: OptionMap[], newIndex: number): OptionMap[] =>
  options.map((item, idx) => ({
    ...item,
    selected: idx === newIndex,
    highlighted: idx === newIndex,
    hidden: false,
  }));

export const setHighlightedOptionMaps = (options: OptionMap[], newIndex: number): OptionMap[] =>
  options.map((item, idx) => ({
    ...item,
    highlighted: idx === newIndex,
  }));

export const resetHighlightedToSelectedOptionMaps = (options: OptionMap[]): OptionMap[] =>
  options.map((item) => ({ ...item, highlighted: item.selected }));

export const setFirstHighlightedOptionMaps = (options: OptionMap[]): OptionMap[] =>
  setHighlightedOptionMaps(options, 0);

export const setLastHighlightedOptionMaps = (options: OptionMap[]): OptionMap[] =>
  setHighlightedOptionMaps(options, options.length - 1);

export const getHighlightedOptionMapIndex = (arr: OptionMap[]): number => arr.findIndex((item) => item.highlighted);
export const getSelectedOptionMapIndex = (arr: OptionMap[]): number => arr.findIndex((item) => item.selected);

export const getSelectedOptionMap = (arr: OptionMap[]): OptionMap => arr.find((item) => item.selected);

export const getHighlightedOptionMap = (arr: OptionMap[]): OptionMap => arr.find((item) => item.highlighted);

export const getValidOptions = (options: OptionMap[]): OptionMap[] =>
  options.filter((item) => !item.hidden && !item.initiallyHidden && !item.disabled);

export const getAmountOfVisibleOptionsAndOptgroups = (options: OptionMap[]): number => {
  return options.reduce((count, { hidden, initiallyHidden, title }) => {
    count += !hidden && !initiallyHidden ? 1 : 0;
    count += title ? 1 : 0;
    return count;
  }, 0);
};

export const getMatchingOptionMaps = (options: OptionMap[], searchString: string): OptionMap[] => {
  const lowerCaseSearchString = searchString.toLowerCase();
  return lowerCaseSearchString && options.filter((item) => item.value.toLowerCase() === lowerCaseSearchString);
};

export const getFirstMatchingOptionMapIndex = (options: OptionMap[], key: string): number => {
  // TODO: what about other characters?
  if ([...'abcdefghijklmnopqrstuvwxyzäöüß1234567890'].includes(key)) {
    const lowerCaseSearchString = key.toLowerCase();
    const firstMatchingIndex =
      lowerCaseSearchString && options.findIndex((item) => item.value.toLowerCase().startsWith(lowerCaseSearchString));
    // jump to last item if no match is found
    return firstMatchingIndex >= 0 ? firstMatchingIndex : options.length - 1;
  }
};

export const setHighlightedFirstMatchingOptionMaps = (options: OptionMap[], key: string): OptionMap[] => {
  const targetIndex = getFirstMatchingOptionMapIndex(options, key);
  return targetIndex >= 0 ? options.map((item, idx) => ({ ...item, highlighted: idx === targetIndex })) : options;
};

export const setFilteredOptionMaps = (options: OptionMap[], searchString: string): OptionMap[] => {
  const lowerCaseSearchString = searchString.toLowerCase();
  return options.map((item) => ({
    ...item,
    hidden: !item.initiallyHidden && !item.value.toLowerCase().includes(lowerCaseSearchString),
  }));
};

export const resetFilteredOptionMaps = (options: OptionMap[]): OptionMap[] =>
  options.map((item) => ({
    ...item,
    hidden: false,
  }));

export const hasFilterResults = (options: OptionMap[]): boolean =>
  options.some((item) => !item.hidden && !item.initiallyHidden);

export const getNewOptionMapIndex = (options: OptionMap[], direction: DropdownDirectionInternal): number => {
  const validItems = getValidOptions(options);
  const validMax = validItems.length - 1;
  // prob. needs to be <= 0
  if (validMax < 0) {
    return;
  }

  let i = getHighlightedOptionMapIndex(validItems);
  if (direction === 'down') {
    i = i < validMax ? i + 1 : 0;
  } else if (direction === 'up') {
    i = i > 0 ? i - 1 : validMax;
  }

  return options.indexOf(validItems[i]);
};

export type DropdownInteractionType = 'show' | 'hide' | 'toggle';
export const getDropdownVisibility = (
  isOpen: boolean,
  type: DropdownInteractionType,
  resetFilter?: () => void
): boolean => {
  if (isOpen && (type === 'hide' || type === 'toggle')) {
    if (resetFilter) {
      resetFilter();
    }
    return false;
  } else if (!isOpen && (type === 'show' || type === 'toggle')) {
    return true;
  } else {
    return isOpen;
  }
};
