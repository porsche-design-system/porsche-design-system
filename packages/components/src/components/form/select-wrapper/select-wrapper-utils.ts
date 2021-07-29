import { getHTMLElements, hasAttribute } from '../../../utils';

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

export const applyFilterOnOptionMaps = (optionMaps: OptionMap[], searchString: string): OptionMap[] => {
  const lowerCaseSearchString = searchString.toLowerCase();

  return optionMaps.map((item) => ({
    ...item,
    hidden: !item.initiallyHidden && !item.value.toLowerCase().includes(lowerCaseSearchString),
  }));
};

export const getOptions = (select: HTMLSelectElement): HTMLOptionElement[] => getHTMLElements(select, 'option');

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
