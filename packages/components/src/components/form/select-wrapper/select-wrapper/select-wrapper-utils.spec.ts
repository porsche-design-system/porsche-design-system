import {
  updateFilteredOptionMaps,
  OptionMap,
  updateSelectedOptionMaps,
  isCustomDropdown,
  updateHighlightedOptionMaps,
  resetHighlightedIndex,
  updateFirstHighlightedOptionMaps,
  updateLastHighlightedOptionMaps,
  getHighlightedOptionMapIndex,
  getSelectedOptionMapIndex,
  getSelectedOptionMap,
  resetFilteredOptionMaps,
  getValidOptions,
  getNewOptionMapIndex,
  DropdownInteractionType,
  getDropdownVisibility,
  KeyboardDirectionInternal,
} from './select-wrapper-utils';

const baseOptionMap: OptionMap = {
  value: 'Some Value',
  disabled: false,
  hidden: false,
  initiallyHidden: false,
  selected: false,
  highlighted: false,
};

type GenerateOptionMapsOptions = {
  amount?: number;
  selectedIndex?: number;
  hiddenIndex?: number;
};

export const generateOptionMaps = (props?: GenerateOptionMapsOptions): OptionMap[] => {
  const { amount = 4, selectedIndex, hiddenIndex } = props || {};

  return Array.from(Array(amount)).map<OptionMap>((_, idx) => ({
    ...baseOptionMap,
    value: `Value ${idx + 1}`,
    ...(selectedIndex === idx && { selected: true, highlighted: true }),
    ...(hiddenIndex === idx && { hidden: true }),
  }));
};

const getIndexOfSelectedOption = (options: OptionMap[]): number => options.findIndex((item) => item.selected);
const getIndexOfHighlightedOption = (options: OptionMap[]): number => options.findIndex((item) => item.highlighted);
const getIndexOfHiddenOption = (options: OptionMap[]): number => options.findIndex((item) => item.hidden);
const getVisibleOptionsAmount = (options: OptionMap[]): number => options.filter((item) => !item.hidden).length;

describe('isCustomDropdown()', () => {
  it.each<[boolean, boolean, boolean]>([
    [true, false, true],
    [true, true, true],
    [false, true, false],
    [false, false, true],
  ])('should be called with filter: $o, native: %o and return $o', (filter, native, expected) => {
    expect(isCustomDropdown(filter, native)).toBe(expected);
  });
});

describe('getOptionsElements()', () => {
  xit('todo', () => {});
});

describe('getOptionMaps()', () => {
  xit('todo', () => {});
});

describe('updateSelectedOptionMaps()', () => {
  it('should set selected and highlighted on correct option', () => {
    const options = generateOptionMaps();
    const result1 = updateSelectedOptionMaps(options, 1);
    expect(getIndexOfSelectedOption(result1)).toBe(1);
    expect(getIndexOfHighlightedOption(result1)).toBe(1);

    const result2 = updateSelectedOptionMaps(options, 2);
    expect(getIndexOfSelectedOption(result2)).toBe(2);
    expect(getIndexOfHighlightedOption(result2)).toBe(2);
  });
});

describe('updateHighlightedOptionMaps()', () => {
  it('should set highlighted on correct option', () => {
    const options = generateOptionMaps();
    expect(getIndexOfHighlightedOption(options)).toBe(-1);

    const result = updateHighlightedOptionMaps(options, 1);
    expect(getIndexOfHighlightedOption(result)).toBe(1);
  });
});

describe('resetHighlightedIndex()', () => {
  it('should reset highlighted index', () => {
    const options = generateOptionMaps({ selectedIndex: 1 });
    expect(getIndexOfHighlightedOption(options)).toBe(1);

    const result = resetHighlightedIndex(options);
    expect(getIndexOfHighlightedOption(result)).toBe(-1);
  });
});

describe('updateFirstHighlightedOptionMaps()', () => {
  it('should set highlight on first option', () => {
    const options = generateOptionMaps();
    expect(getIndexOfHighlightedOption(options)).toBe(-1);

    const result = updateFirstHighlightedOptionMaps(options);
    expect(getIndexOfHighlightedOption(result)).toBe(0);
  });
});

describe('updateLastHighlightedOptionMaps()', () => {
  it('should set highlighted on last option', () => {
    const options = generateOptionMaps();
    expect(getIndexOfHighlightedOption(options)).toBe(-1);

    const result = updateLastHighlightedOptionMaps(options);
    expect(getIndexOfHighlightedOption(result)).toBe(3);
  });
});

describe('getHighlightedOptionMapIndex()', () => {
  it('should return index of highlighted opotion', () => {
    const options = generateOptionMaps();
    expect(getHighlightedOptionMapIndex(options)).toBe(-1);

    options[1].highlighted = true;
    expect(getHighlightedOptionMapIndex(options)).toBe(1);
  });
});

describe('getSelectedOptionMapIndex()', () => {
  it('should return index of selected option', () => {
    const options = generateOptionMaps();
    expect(getSelectedOptionMapIndex(options)).toBe(-1);

    options[1].selected = true;
    expect(getSelectedOptionMapIndex(options)).toBe(1);
  });
});

describe('getSelectedOptionMap()', () => {
  it('should return selected option', () => {
    const options = generateOptionMaps({ selectedIndex: 1 });
    expect(getSelectedOptionMap(options)).toEqual(options[1]);

    options[1].selected = false;
    options[0].selected = true;

    expect(getSelectedOptionMap(options)).toEqual(options[0]);
  });
});

describe('getValidOptions()', () => {
  it('should return options that are not disabled, hidden or initiallyHidden', () => {
    const options = generateOptionMaps();
    const result1 = getValidOptions(options);
    expect(result1.length).toBe(options.length);

    options[0].disabled = true;
    options[1].hidden = true;
    options[2].initiallyHidden = true;

    const result2 = getValidOptions(options);
    expect(result2.length).toBe(1);
    expect(result2[0]).toBe(options[3]);
  });
});

describe('getMatchingOptionMaps()', () => {
  xit('todo', () => {});
});

describe('updateFilteredOptionMaps()', () => {
  it.each<[string, number]>([
    ['First Value', 1],
    ['Value', 4],
    ['value', 4],
    ['ir', 2],
    ['st Val', 1],
  ])('should be called with searchString %s and have %s visible options', (searchString, expected) => {
    const options = generateOptionMaps().map((item, idx) => ({
      ...item,
      value: `${['First', 'Second', 'Third', 'Fourth'][idx]} Value`,
    }));
    const result = updateFilteredOptionMaps(options, searchString);
    expect(getVisibleOptionsAmount(result)).toBe(expected);
  });
});

describe('resetFilteredOptionMaps()', () => {
  it('should set hidden to false', () => {
    const options = generateOptionMaps({ hiddenIndex: 1 });
    expect(getIndexOfHiddenOption(options)).toBe(1);

    const result = resetFilteredOptionMaps(options);
    expect(getIndexOfHiddenOption(result)).toBe(-1);
  });
});

describe('hasFilterResults()', () => {
  xit('todo', () => {});
});

describe('getNewOptionMapIndex()', () => {
  it('should return undefined if there is no valid option', () => {
    const options = generateOptionMaps().map((item) => ({
      ...item,
      disabled: true,
    }));

    const result = getNewOptionMapIndex(options, 'down');
    expect(result).toBeUndefined();
  });

  it.each<[number, KeyboardDirectionInternal, number]>([
    [0, 'down', 1],
    [0, 'right', 1],
    [3, 'down', 0],
    [3, 'right', 0],
    [1, 'up', 0],
    [1, 'left', 0],
    [0, 'up', 3],
    [0, 'left', 3],
  ])('should be called with selectedIndex: %o, direction %o and return %o', (selectedIndex, direction, expected) => {
    const options = generateOptionMaps({ selectedIndex });
    expect(getNewOptionMapIndex(options, direction)).toBe(expected);
  });
});

describe('getDropdownVisibility()', () => {
  const resetFilter = jest.fn();
  it.each<[boolean, DropdownInteractionType, boolean]>([
    [true, 'show', true],
    [true, 'toggle', false],
    [true, 'hide', false],
    [false, 'show', true],
    [false, 'toggle', true],
    [false, 'hide', false],
  ])('should for isOpen %s and type: %s return %s', (isOpen, type, result) => {
    expect(getDropdownVisibility(isOpen, type, resetFilter)).toBe(result);
  });
});
