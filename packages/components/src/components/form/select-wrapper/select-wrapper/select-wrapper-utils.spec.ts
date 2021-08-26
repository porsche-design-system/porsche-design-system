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
} from './select-wrapper-utils';

const defaultOptionMap: Partial<OptionMap> = {
  disabled: false,
  hidden: false,
  initiallyHidden: false,
  selected: false,
  highlighted: false,
};

type GetOptions = {
  selectedIndex?: number;
  hiddenIndex?: number;
};

const getOptions = (props?: GetOptions): OptionMap[] => {
  const { selectedIndex, hiddenIndex } = props || {};

  const options = ['First', 'Second', 'Third', 'Fourth'].map(
    (value) =>
      ({
        ...defaultOptionMap,
        value: `${value} Value`,
      } as OptionMap)
  );

  if (selectedIndex >= 0) {
    options[selectedIndex].selected = true;
    options[selectedIndex].highlighted = true;
  }
  if (hiddenIndex >= 0) {
    options[hiddenIndex].hidden = true;
  }
  return options;
};

const getIndexOfHighlightedOption = (options: OptionMap[]): number => {
  return options.findIndex((item) => item.highlighted);
};

const getIndexOfHiddenOption = (options: OptionMap[]): number => {
  return options.findIndex((item) => item.hidden);
};

describe('isCustomDropdown()', () => {
  it.each`
    filter   | native   | expected
    ${true}  | ${false} | ${true}
    ${true}  | ${true}  | ${true}
    ${false} | ${true}  | ${false}
    ${false} | ${false} | ${true}
  `('should be called with ($filter, $native) and result to $expected', ({ filter, native, expected }) => {
    expect(isCustomDropdown(filter, native)).toBe(expected);
  });
});

describe('updateSelectedOptionMaps()', () => {
  const getIndexOfSelectedOption = (options: OptionMap[]): number => {
    return options.findIndex((item) => item.selected);
  };

  it('should have no selected and highlighted option initially', () => {
    const options = getOptions();
    expect(getIndexOfSelectedOption(options)).toBe(-1);
    expect(getIndexOfHighlightedOption(options)).toBe(-1);
  });

  it('should set selected and highlighted on correct option', () => {
    const options = getOptions();
    const result1 = updateSelectedOptionMaps(options, 1);
    expect(getIndexOfSelectedOption(result1)).toBe(1);
    expect(getIndexOfHighlightedOption(result1)).toBe(1);

    const result2 = updateSelectedOptionMaps(options, 2);
    expect(getIndexOfSelectedOption(result2)).toBe(2);
    expect(getIndexOfHighlightedOption(result2)).toBe(2);
  });
});

describe('updateHighlightedOptionMaps()', () => {
  it('should update highlighted on second item', () => {
    const options = getOptions();
    expect(getIndexOfHighlightedOption(options)).toBe(-1);

    const result = updateHighlightedOptionMaps(options, 1);
    expect(getIndexOfHighlightedOption(result)).toBe(1);
  });
});

describe('resetHighlightedIndex()', () => {
  it('should reset highlighted index       ', () => {
    const options = getOptions({ selectedIndex: 1 });
    expect(getIndexOfHighlightedOption(options)).toBe(1);

    const result = resetHighlightedIndex(options);
    expect(getIndexOfHighlightedOption(result)).toBe(-1);
  });
});

describe('updateFirstHighlightedOptionMaps()', () => {
  it('should set highlight on first item', () => {
    const options = getOptions();
    expect(getIndexOfHighlightedOption(options)).toBe(-1);

    const result = updateFirstHighlightedOptionMaps(options);
    expect(getIndexOfHighlightedOption(result)).toBe(0);
  });
});

describe('updateLastHighlightedOptionMaps()', () => {
  it('should set highlight on last item', () => {
    const options = getOptions();
    expect(getIndexOfHighlightedOption(options)).toBe(-1);

    const result = updateLastHighlightedOptionMaps(options);
    expect(getIndexOfHighlightedOption(result)).toBe(3);
  });
});

describe('getHighlightedOptionMapIndex()', () => {
  it('should return index of highlighted item', () => {
    const options = getOptions();
    expect(getHighlightedOptionMapIndex(options)).toBe(-1);

    options[1].highlighted = true;
    expect(getHighlightedOptionMapIndex(options)).toBe(1);
  });
});

describe('getSelectedOptionMapIndex()', () => {
  it('should return index of selected item', () => {
    const options = getOptions();
    expect(getSelectedOptionMapIndex(options)).toBe(-1);

    options[1].selected = true;
    expect(getSelectedOptionMapIndex(options)).toBe(1);
  });
});

describe('getSelectedOptionMap()', () => {
  it('should return selected option map', () => {
    const options = getOptions({ selectedIndex: 1 });

    expect(getSelectedOptionMap(options)).toEqual(options[1]);

    options[1].selected = false;
    options[0].selected = true;

    expect(getSelectedOptionMap(options)).toEqual(options[0]);
  });
});

describe('getValidOptions()', () => {
  it('should return ', () => {
    const options = getOptions();
    expect(getValidOptions(options).length).toBe(4);

    options[0].disabled = true;
    options[1].hidden = true;
    options[2].initiallyHidden = true;

    expect(getValidOptions(options).length).toBe(1);
  });
});

describe('updateFilteredOptionMaps()', () => {
  const options = getOptions();
  const getVisibleOptionsAmount = (options: OptionMap[]): number => {
    return options.filter((item) => !item.hidden).length;
  };

  it.each`
    searchString     | expected
    ${'First Value'} | ${1}
    ${'Value'}       | ${4}
    ${'value'}       | ${4}
    ${'ir'}          | ${2}
    ${'st Val'}      | ${1}
  `("should be called with ('$searchString') and have '$expected' visible options", ({ searchString, expected }) => {
    const result = updateFilteredOptionMaps(options, searchString);
    expect(getVisibleOptionsAmount(result)).toBe(expected);
  });
});

describe('resetFilteredOptionMaps()', () => {
  it('should reset hidden to false', () => {
    const options = getOptions({ hiddenIndex: 1 });
    expect(getIndexOfHiddenOption(options)).toBe(1);

    expect(getIndexOfHiddenOption(resetFilteredOptionMaps(options))).toBe(-1);
  });
});

describe('getNewOptionMapIndex()', () => {
  it('should return undefined if there are no valid option to navigate to', () => {
    const options = getOptions();
    const disabledOptionMap = options.map((item) => ({
      ...item,
      disabled: true,
    }));

    expect(getNewOptionMapIndex(disabledOptionMap, 'down')).toBeUndefined();
  });

  it.each`
    selectedIndex | direction  | expected
    ${0}          | ${'down'}  | ${1}
    ${0}          | ${'right'} | ${1}
    ${3}          | ${'down'}  | ${0}
    ${3}          | ${'right'} | ${0}
    ${1}          | ${'up'}    | ${0}
    ${1}          | ${'left'}  | ${0}
    ${0}          | ${'up'}    | ${3}
    ${0}          | ${'left'}  | ${3}
  `(
    "should be called with selectedIndex='$selectedIndex' and direction='$direction' and result to '$expected'",
    ({ selectedIndex, direction, expected }) => {
      const options = getOptions({ selectedIndex });

      expect(getNewOptionMapIndex(options, direction)).toBe(expected);
    }
  );
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
