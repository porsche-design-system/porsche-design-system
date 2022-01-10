import type { AriaAttributes } from '../../../../types';
import type { DropdownDirectionInternal } from '../select-wrapper/select-wrapper-utils';
import { getHTMLElements, getTagName, hasAttribute } from '../../../../utils';
import { OPTION_HEIGHT } from '../select-wrapper/select-wrapper-styles';
import { INPUT_HEIGHT } from '../../form-styles';

const MAX_CHILDREN = 10;

export const getButtonAriaAttributes = (
  isOpen: boolean,
  labelId: string,
  descriptionId: string,
  dropdownId: string
): AriaAttributes => {
  return {
    'aria-labelledby': labelId,
    'aria-describedby': descriptionId || null,
    'aria-haspopup': 'listbox',
    'aria-expanded': isOpen ? 'true' : 'false',
    'aria-controls': dropdownId,
  };
};

export const getFilterInputAriaAttributes = (
  isOpen: boolean,
  isRequired: boolean,
  labelId: string,
  descriptionId: string,
  dropdownId: string,
  activeDescendantId: number
): AriaAttributes => {
  return {
    'aria-labelledby': labelId,
    'aria-describedby': descriptionId || null,
    'aria-haspopup': 'listbox',
    'aria-expanded': isOpen ? 'true' : 'false',
    'aria-autocomplete': 'list',
    'aria-controls': dropdownId,
    ...(isOpen && {
      'aria-activedescendant': `option-${activeDescendantId}`,
    }),
    ...(isRequired && {
      'aria-required': 'true',
    }),
  };
};

export const getListAriaAttributes = (
  label: string,
  isRequired: boolean,
  optionMaps: OptionMap[],
  hasFilter: boolean
): AriaAttributes => {
  const highlightedIndex = getHighlightedOptionMapIndex(optionMaps);
  return {
    ...(highlightedIndex >= 0 && !hasFilter && { 'aria-activedescendant': `option-${highlightedIndex}` }),
    'aria-label': label,
    ...(isRequired &&
      !hasFilter && {
        'aria-required': 'true',
      }),
  };
};

export const getOptionAriaAttributes = (option: OptionMap): AriaAttributes => ({
  'aria-selected': option.highlighted ? 'true' : null,
  'aria-disabled': option.disabled ? 'true' : null,
  'aria-hidden': option.hidden || option.initiallyHidden ? 'true' : null,
  'aria-label': option.value ? null : 'Empty value',
});

export const determineDirection = (host: HTMLElement): DropdownDirectionInternal => {
  const { length } = getHTMLElements(host.shadowRoot, '.option:not([aria-hidden="true"])');
  const { top } = host.getBoundingClientRect();

  const listHeight = length >= MAX_CHILDREN ? OPTION_HEIGHT * MAX_CHILDREN : OPTION_HEIGHT * length;
  const spaceBottom = window.innerHeight - top - INPUT_HEIGHT;
  return spaceBottom <= listHeight && top >= listHeight ? 'up' : 'down';
};

export const handleScroll = (host: HTMLElement, highlightedIndex: number): void => {
  const hostElementHeightThreshold = 276; // based on 10 * OPTION_HEIGHT with some buffer
  const { scrollHeight, scrollTop } = host;

  if (scrollHeight > hostElementHeightThreshold) {
    const highlightedNode = getHTMLElements(host, 'li')[highlightedIndex];

    if (highlightedNode) {
      const { offsetTop, offsetHeight } = highlightedNode; // offsetHeight is usually 32px but can be more if multiline
      const scrollBottom = hostElementHeightThreshold + scrollTop;
      const elementBottom = offsetTop + offsetHeight;
      if (elementBottom > scrollBottom) {
        host.scrollTop = elementBottom - hostElementHeightThreshold;
      } else if (offsetTop - OPTION_HEIGHT < scrollTop) {
        host.scrollTop = offsetTop - OPTION_HEIGHT;
      }
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
