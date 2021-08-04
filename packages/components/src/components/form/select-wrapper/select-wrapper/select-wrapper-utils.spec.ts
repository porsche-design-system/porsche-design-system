import { updateFilteredOptionMaps, OptionMap, updateSelectedOptionMaps } from './select-wrapper-utils';

const defaultOptionMap: Partial<OptionMap> = {
  disabled: false,
  hidden: false,
  initiallyHidden: false,
  selected: false,
  highlighted: false,
};

const options: OptionMap[] = ['First', 'Second', 'Third'].map(
  (value, idx) =>
    ({
      ...defaultOptionMap,
      key: idx + 1,
      value: `${value} Value`,
    } as OptionMap)
);

describe('updateFilteredOptionMaps()', () => {
  const getVisibleOptionsAmount = (options: OptionMap[]): number => {
    return options.filter((item) => !item.hidden).length;
  };

  it.each`
    searchString     | expected
    ${'First Value'} | ${1}
    ${'Value'}       | ${3}
    ${'value'}       | ${3}
    ${'ir'}          | ${2}
    ${'st Val'}      | ${1}
  `("should be called with ('$searchString') and have '$expected' visible options", ({ searchString, expected }) => {
    const result = updateFilteredOptionMaps(options, searchString);
    expect(getVisibleOptionsAmount(result)).toBe(expected);
  });
});

describe('updateSelectedOptionMaps()', () => {
  const getIndexOfSelectedOption = (options: OptionMap[]): number => {
    return options.findIndex((item) => item.selected);
  };
  const getIndexOfHighlightedOption = (options: OptionMap[]): number => {
    return options.findIndex((item) => item.highlighted);
  };

  it('should have no selected and highlighted option initially', () => {
    expect(getIndexOfSelectedOption(options)).toBe(-1);
    expect(getIndexOfHighlightedOption(options)).toBe(-1);
  });

  it('should set selected and highlighted on correct option', () => {
    const result1 = updateSelectedOptionMaps(options, 1);
    expect(getIndexOfSelectedOption(result1)).toBe(1);
    expect(getIndexOfHighlightedOption(result1)).toBe(1);

    const result2 = updateSelectedOptionMaps(options, 2);
    expect(getIndexOfSelectedOption(result2)).toBe(2);
    expect(getIndexOfHighlightedOption(result2)).toBe(2);
  });
});
