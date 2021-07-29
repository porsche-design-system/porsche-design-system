import { getHTMLElements, hasAttribute } from '../../../utils';

export const CHANGE_EVENT_NAME = 'internalChange';

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

export const updateSelectedOptionMap = (options: OptionMap[], newIndex: number): OptionMap[] =>
  options.map((item, index) => ({
    ...item,
    selected: index === newIndex,
    highlighted: index === newIndex,
    hidden: false,
  }));

export const updatedFilteredOptionMaps = (options: OptionMap[], searchString: string): OptionMap[] => {
  const lowerCaseSearchString = searchString.toLowerCase();

  return options.map((item) => ({
    ...item,
    hidden: !item.initiallyHidden && !item.value.toLowerCase().includes(lowerCaseSearchString),
  }));
};

export const getHighlightedIndex = (arr: OptionMap[]): number => arr.findIndex((item) => item.highlighted);
