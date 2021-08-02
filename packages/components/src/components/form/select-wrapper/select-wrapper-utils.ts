import { getHTMLElements, getTagName, hasAttribute, isTouchDevice } from '../../../utils';

export const CHANGE_EVENT_NAME = 'internalChange';
export type InternalChangeEvent = { newIndex: number };

export type DropdownDirectionInternal = 'down' | 'up';
export type DropdownDirection = DropdownDirectionInternal | 'auto';

export type KeyboardDirectionInternal = DropdownDirectionInternal | 'left' | 'right';

export const isCustomDropdown = (filter: boolean, native: boolean): boolean => {
  if (filter) {
    return true;
  } else if (native) {
    return false;
  } else {
    return !isTouchDevice();
  }
};

export type OptionMap = {
  key: number; // unused?
  // name: string;
  value: string;
  disabled: boolean; // TODO: rename
  hidden: boolean; // TODO: rename
  initiallyHidden: boolean; // TODO: rename
  selected: boolean; // TODO: rename
  highlighted: boolean; // TODO: rename
  title?: string;
};

export const getOptionsElements = (select: HTMLSelectElement): HTMLOptionElement[] => getHTMLElements(select, 'option');

export const getOptionMaps = (options: HTMLOptionElement[]): OptionMap[] =>
  options.map((item, idx) => {
    const { selected, parentElement, previousElementSibling } = item;
    const option: OptionMap = {
      key: idx,
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

export const updateSelectedOptionMaps = (options: OptionMap[], newIndex: number): OptionMap[] =>
  options.map((item, idx) => ({
    ...item,
    selected: idx === newIndex,
    highlighted: idx === newIndex,
    hidden: false,
  }));

export const updateFilteredOptionMaps = (options: OptionMap[], searchString: string): OptionMap[] => {
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

export const updateHighlightedOptionMaps = (options: OptionMap[], newIndex: number): OptionMap[] =>
  options.map((item, idx) => ({
    ...item,
    highlighted: idx === newIndex,
  }));

export const updateHighlightedAndSelectedOptionMaps = (options: OptionMap[], newIndex: number): OptionMap[] =>
  options.map((item, idx) => ({
    ...item,
    highlighted: idx === newIndex,
    selected: idx === newIndex,
  }));

export const updateFirstHighlightedOptionMaps = (options: OptionMap[]): OptionMap[] =>
  updateHighlightedOptionMaps(options, 0);

export const updateLastHighlightedOptionMaps = (options: OptionMap[]): OptionMap[] =>
  updateHighlightedOptionMaps(options, options.length - 1);

export const getHighlightedIndex = (arr: OptionMap[]): number => arr.findIndex((item) => item.highlighted);
export const getSelectedIndex = (arr: OptionMap[]): number => arr.findIndex((item) => item.selected);

export const getSelectedOption = (arr: OptionMap[]): OptionMap => arr.find((item) => item.selected);

export const getValidOptions = (options: OptionMap[]): OptionMap[] =>
  options.filter((item) => !item.hidden && !item.initiallyHidden && !item.disabled);

export const getNextOptionMapIndex = (options: OptionMap[], direction: KeyboardDirectionInternal): number => {
  const validItems = getValidOptions(options);
  const validMax = validItems.length - 1;
  if (validMax < 0) {
    return;
  }

  let i = getHighlightedIndex(validItems);
  if (direction === 'down' || direction === 'right') {
    i = i < validMax ? i + 1 : 0;
  } else if (direction === 'up' || direction === 'left') {
    i = i > 0 ? i - 1 : validMax;
  }

  return validItems[i].key;
};
