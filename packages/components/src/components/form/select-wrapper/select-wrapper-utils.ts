import { getHTMLElements, hasAttribute } from '../../../utils';

export const CHANGE_EVENT_NAME = 'internalChange';
export type InternalChangeEvent = { newIndex: number };

export type OptionMap = {
  key: number; // unused?
  // name: string;
  value: string;
  disabled: boolean; // TODO: rename
  hidden: boolean; // TODO: rename
  initiallyHidden: boolean; // TODO: rename
  selected: boolean; // TODO: rename
  highlighted: boolean; // TODO: rename
};

export const getOptionsElements = (select: HTMLSelectElement): HTMLOptionElement[] => getHTMLElements(select, 'option');

export const getOptionMaps = (options: HTMLOptionElement[]): OptionMap[] =>
  options.map((item, idx) => {
    const { selected } = item;
    const option: OptionMap = {
      key: idx,
      value: item.text,
      disabled: hasAttribute(item, 'disabled'),
      hidden: false,
      initiallyHidden: hasAttribute(item, 'hidden'),
      selected,
      highlighted: selected,
    };
    return option;
  });

export const updateSelectedOptionMaps = (options: OptionMap[], newIndex: number): OptionMap[] => {
  return options.map((item, idx) => ({
    ...item,
    selected: idx === newIndex,
    highlighted: idx === newIndex,
    hidden: false,
  }));
};

export const updateFilteredOptionMaps = (options: OptionMap[], searchString: string): OptionMap[] => {
  const lowerCaseSearchString = searchString.toLowerCase();
  return options.map((item) => ({
    ...item,
    hidden: !item.initiallyHidden && !item.value.toLowerCase().includes(lowerCaseSearchString),
  }));
};

export const updateHighlightedOptionMaps = (options: OptionMap[], newIndex: number): OptionMap[] => {
  return options.map((item, idx) => ({
    ...item,
    highlighted: idx === newIndex,
  }));
};

export const updateLastHighlightedOptionMaps = (options: OptionMap[]): OptionMap[] =>
  updateHighlightedOptionMaps(options, options.length - 1);

export const getHighlightedIndex = (arr: OptionMap[]): number => arr.findIndex((item) => item.highlighted);
