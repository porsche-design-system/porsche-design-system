import { hasAttribute } from '../dom';
import { getTagName } from '../tag-name';
import { SelectDropdownDirectionInternal } from './select-dropdown';

export type OptionMap = {
  value: string;
  disabled: boolean;
  hidden: boolean; // used for filtering
  initiallyHidden: boolean;
  selected: boolean;
  highlighted: boolean;
  title?: string; // for optgroup
};

const onComboboxKeyDown = (
  e: KeyboardEvent,
  searchString: string,
  isOpen: boolean,
  isFilter: boolean,
  optionMaps: OptionMap[],
  cycleDropdown: (direction: SelectDropdownDirectionInternal) => void,
  setOptionSelected: (newIndex: number) => void,
  setDropdownVisibility: (type: DropdownInteractionType) => void,
  resetHighlightedToSelectedOptionMaps: () => void
): void => {
  switch (e.key) {
    case 'ArrowUp':
    case 'Up':
      e.preventDefault();
      cycleDropdown('up');
      break;
    case 'ArrowDown':
    case 'Down':
      e.preventDefault();
      cycleDropdown('down');
      break;
    case ' ':
    case 'Spacebar':
    case 'Enter':
      if (isFilter) {
        if (e.key === 'Enter') {
          e.preventDefault();
          onSelectEnter(optionMaps, searchString, setOptionSelected);
        }
      } else {
        e.preventDefault();
        if (isOpen) {
          setOptionSelected(getHighlightedOptionMapIndex(optionMaps));
        } else {
          setDropdownVisibility('show');
        }
      }
      break;
    case 'Escape':
    case 'Tab':
      setDropdownVisibility('hide');
      resetHighlightedToSelectedOptionMaps();
      break;
    case 'PageUp':
      if (isOpen) {
        e.preventDefault();
        optionMaps = setFirstHighlightedOptionMaps(optionMaps);
      }
      break;
    case 'PageDown':
      if (isOpen) {
        e.preventDefault();
        optionMaps = setLastHighlightedOptionMaps(optionMaps);
      }
      break;
    default:
      if (!isFilter) {
        // TODO: seems to be difficult to combine multiple keys as native select does
        optionMaps = setHighlightedFirstMatchingOptionMaps(optionMaps, e.key);
      }
  }
};

export const onSelectEnter = (
  optionMaps: OptionMap[],
  searchString: string,
  setOptionSelected: (newIndex: number) => void
): void => {
  const matchingOptions = getMatchingOptionMaps(optionMaps, searchString);
  if (matchingOptions.length === 1) {
    setOptionSelected(optionMaps.indexOf(matchingOptions[0]));
  } else {
    setOptionSelected(getHighlightedOptionMapIndex(optionMaps));
  }
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

export const getNewOptionMapIndex = (options: OptionMap[], direction: SelectDropdownDirectionInternal): number => {
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
