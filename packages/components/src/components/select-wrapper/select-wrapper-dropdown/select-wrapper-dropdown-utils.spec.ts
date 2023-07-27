import type { DropdownDirectionInternal } from '../select-wrapper/select-wrapper-utils';
import {
  DropdownInteractionType,
  getAmountOfVisibleOptionsAndOptgroups,
  getDropdownVisibility,
  getFilterInputAriaAttributes,
  getHighlightedOptionMapIndex,
  getListAriaAttributes,
  getMatchingOptionMaps,
  getNewOptionMapIndex,
  getOptionAriaAttributes,
  getOptionMaps,
  getOptionsElements,
  getSelectedOptionMap,
  getSelectedOptionMapIndex,
  getSelectWrapperDropdownButtonAriaAttributes,
  getValidOptions,
  hasFilterResults,
  OptionMap,
  resetFilteredOptionMaps,
  resetHighlightedToSelectedOptionMaps,
  setFilteredOptionMaps,
  setFirstHighlightedOptionMaps,
  setHighlightedOptionMaps,
  setLastHighlightedOptionMaps,
  setSelectedOptionMaps,
} from './select-wrapper-dropdown-utils';

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
  highlightedIndex?: number;
  disabledIndex?: number;
  hiddenIndex?: number;
  initiallyHiddenIndex?: number;
  title?: string;
};

export const generateOptionMaps = (props?: GenerateOptionMapsOptions): OptionMap[] => {
  const {
    amount = 4,
    selectedIndex,
    highlightedIndex,
    disabledIndex,
    hiddenIndex,
    initiallyHiddenIndex,
    title,
  } = props || {};

  return Array.from(Array(amount)).map<OptionMap>((_, idx) => ({
    ...baseOptionMap,
    value: `Value ${idx + 1}`,
    ...(selectedIndex === idx && { selected: true, highlighted: true }),
    ...(highlightedIndex === idx && { highlighted: true }),
    ...(disabledIndex === idx && { disabled: true }),
    ...(hiddenIndex === idx && { hidden: true }),
    ...(initiallyHiddenIndex === idx && { initiallyHidden: true }),
    title,
  }));
};

export const mapValuesToBeBetterFilterable = (options: OptionMap[]): OptionMap[] =>
  options.map((item, idx) => ({
    ...item,
    value: idx < 4 ? `${['First', 'Second', 'Third', 'Fourth'][idx]} Value` : item.value,
  }));

describe('getSelectWrapperDropdownButtonAriaAttributes()', () => {
  it.each<[boolean, string, string, string, number]>([
    [true, 'label-id', 'description-id', 'dropdown-id', 0],
    [false, 'label-id', 'description-id', 'dropdown-id', 1],
  ])(
    'should return correct aria attributes for isOpen: %o, labelId: %o, descriptionId: %o, dropdownId: %o and activeDescendantId: %o',
    (isOpen, labelId, descriptionId, dropdownId, activeDescendantId) => {
      expect(
        getSelectWrapperDropdownButtonAriaAttributes(isOpen, labelId, descriptionId, dropdownId, activeDescendantId)
      ).toMatchSnapshot();
    }
  );
});

describe('getFilterInputAriaAttributes()', () => {
  it.each<[boolean, boolean, string, string, string, number]>([
    [true, true, 'label-id', 'description-id', 'dropdown-id', 0],
    [false, false, 'label-id', 'description-id', 'dropdown-id', 0],
    [false, false, 'label-id', 'description-id', 'dropdown-id', 1],
  ])(
    'should return correct aria attributes for isOpen: %o, isRequired: %o, labelId: %o, descriptionId: %o, dropdownId: %o and activeDescendantId: %o',
    (isOpen, isRequired, labelId, descriptionId, dropdownId, activeDescendantId) => {
      expect(
        getFilterInputAriaAttributes(isOpen, isRequired, labelId, descriptionId, dropdownId, activeDescendantId)
      ).toMatchSnapshot();
    }
  );
});

describe('getListAriaAttributes()', () => {
  it.each<[string, boolean, boolean, boolean]>([
    ['Some label', true, false, false],
    ['Some label', false, true, false],
    ['Some label', false, false, false],
    ['Some label', true, true, true],
  ])(
    'should return correct aria attributes for label: %o, isRequired: %o, hasFilter: %o and isOpen: %o',
    (label, isRequired, hasFilter, isOpen) => {
      expect(getListAriaAttributes(label, isRequired, hasFilter, isOpen)).toMatchSnapshot();
    }
  );
});

describe('getOptionAriaAttributes()', () => {
  const amount = 1;
  it.each<OptionMap>([
    generateOptionMaps({ amount })[0],
    generateOptionMaps({ amount, highlightedIndex: 0 })[0],
    generateOptionMaps({ amount, selectedIndex: 0 })[0],
    generateOptionMaps({ amount, disabledIndex: 0 })[0],
    generateOptionMaps({ amount, hiddenIndex: 0 })[0],
    generateOptionMaps({ amount, initiallyHiddenIndex: 0 })[0],
    generateOptionMaps({ amount }).map((x) => ({ ...x, value: undefined }))[0],
  ])('should return correct aria attributes for optionMap: %j', (optionMap) => {
    expect(getOptionAriaAttributes(optionMap)).toMatchSnapshot();
  });
});

// handleScroll is not tested on purpose
// describe('handleScroll()', () => {});

const getIndexOfSelectedOption = (options: OptionMap[]): number => options.findIndex((item) => item.selected);
const getIndexOfHighlightedOption = (options: OptionMap[]): number => options.findIndex((item) => item.highlighted);
const getIndexOfHiddenOption = (options: OptionMap[]): number => options.findIndex((item) => item.hidden);
const getVisibleOptionsAmount = (options: OptionMap[]): number => options.filter((item) => !item.hidden).length;

describe('getOptionsElements()', () => {
  it("should return a select's option elements", () => {
    const select = document.createElement('select');
    const option1 = document.createElement('option');
    option1.value = 'a';
    const option2 = document.createElement('option');
    option2.value = 'b';
    select.appendChild(option1);
    select.appendChild(option2);

    const result = getOptionsElements(select);
    expect(result.length).toBe(2);
    expect(result[0]).toBe(option1);
    expect(result[1]).toBe(option2);
  });
});

describe('getOptionMaps()', () => {
  type GenerateHTMLOptionElementOptions = {
    text?: string;
    disabled?: boolean;
    hidden?: boolean;
    selected?: boolean;
    isGrouped?: boolean;
  };

  const generateHTMLOptionElements = (opts?: GenerateHTMLOptionElementOptions): HTMLOptionElement[] => {
    const { text, disabled = false, hidden = false, selected = false, isGrouped } = opts || {};
    const option = document.createElement('option');

    option.text = text;
    option.selected = selected;
    if (disabled) {
      option.setAttribute('disabled', 'true');
    }
    if (hidden) {
      option.setAttribute('hidden', 'true');
    }

    // we're not using a select element since it has impact on the selected property
    const parent = document.createElement(isGrouped ? 'optgroup' : 'div');
    (parent as HTMLOptGroupElement).label = 'Optgroup Label';
    parent.appendChild(option);

    return [option];
  };

  const text = 'Value 1';
  const amount = 1;

  it.each<[HTMLOptionElement[], OptionMap[]]>([
    [generateHTMLOptionElements({ text }), generateOptionMaps({ amount })],
    [generateHTMLOptionElements({ text, selected: true }), generateOptionMaps({ amount, selectedIndex: 0 })],
    [generateHTMLOptionElements({ text, disabled: true }), generateOptionMaps({ amount, disabledIndex: 0 })],
    [generateHTMLOptionElements({ text, hidden: true }), generateOptionMaps({ amount, initiallyHiddenIndex: 0 })],
    [generateHTMLOptionElements({ text, isGrouped: true }), generateOptionMaps({ amount, title: 'Optgroup Label' })],
  ])('should correctly transform HTMLOptionElements to OptionMaps', (optionElements, optionMaps) => {
    expect(getOptionMaps(optionElements)).toEqual(optionMaps);
  });
});

describe('setSelectedOptionMaps()', () => {
  it('should set selected and highlighted on correct option', () => {
    const options = generateOptionMaps();
    const result1 = setSelectedOptionMaps(options, 1);
    expect(getIndexOfSelectedOption(result1)).toBe(1);
    expect(getIndexOfHighlightedOption(result1)).toBe(1);

    const result2 = setSelectedOptionMaps(options, 2);
    expect(getIndexOfSelectedOption(result2)).toBe(2);
    expect(getIndexOfHighlightedOption(result2)).toBe(2);
  });
});

describe('setHighlightedOptionMaps()', () => {
  it('should set highlighted on correct option', () => {
    const options = generateOptionMaps();
    expect(getIndexOfHighlightedOption(options)).toBe(-1);

    const result = setHighlightedOptionMaps(options, 1);
    expect(getIndexOfHighlightedOption(result)).toBe(1);
  });
});

describe('resetHighlightedToSelectedOptionMaps()', () => {
  it('should reset highlighted options', () => {
    const options = generateOptionMaps({ selectedIndex: 2, highlightedIndex: 1 });
    expect(getIndexOfHighlightedOption(options)).toBe(1);

    const result = resetHighlightedToSelectedOptionMaps(options);
    expect(getIndexOfHighlightedOption(result)).toBe(2);
  });
});

describe('setFirstHighlightedOptionMaps()', () => {
  it('should set highlight on first option', () => {
    const options = generateOptionMaps();
    expect(getIndexOfHighlightedOption(options)).toBe(-1);

    const result = setFirstHighlightedOptionMaps(options);
    expect(getIndexOfHighlightedOption(result)).toBe(0);
  });
});

describe('setLastHighlightedOptionMaps()', () => {
  it('should set highlighted on last option', () => {
    const options = generateOptionMaps();
    expect(getIndexOfHighlightedOption(options)).toBe(-1);

    const result = setLastHighlightedOptionMaps(options);
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

describe('getAmountOfVisibleOptionsAndOptgroups()', () => {
  it('should return number of options that are not hidden or initiallyHidden summed with number of optgroups', () => {
    const options = generateOptionMaps({ amount: 6, initiallyHiddenIndex: 0 });
    const result1 = getAmountOfVisibleOptionsAndOptgroups(options);
    expect(result1).toBe(options.length - 1);

    options[1].hidden = true;
    options[2].initiallyHidden = true;
    options[3].title = 'Some title';

    const result2 = getAmountOfVisibleOptionsAndOptgroups(options);
    expect(result2).toBe(4);
  });
});

describe('getMatchingOptionMaps()', () => {
  it.each<[string, number]>([
    ['Invalid Value', 0],
    ['First Value', 1],
    ['Fourth Value', 1],
    ['Value', 0],
  ])('should for searchString %s return %s options', (searchString, expected) => {
    const options = mapValuesToBeBetterFilterable(generateOptionMaps());
    const result = getMatchingOptionMaps(options, searchString);
    expect(result.length).toBe(expected);
  });
});

describe('setFilteredOptionMaps()', () => {
  it.each<[string, number]>([
    ['Invalid Value', 0],
    ['First Value', 1],
    ['Value', 4],
    ['value', 4],
    ['ir', 2],
    ['st Val', 1],
  ])('should for searchString %s return %s visible options', (searchString, expected) => {
    const options = mapValuesToBeBetterFilterable(generateOptionMaps());
    const result = setFilteredOptionMaps(options, searchString);
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
  const amount = 1;

  it.each<[OptionMap[], boolean]>([
    [generateOptionMaps({ amount }), true],
    [generateOptionMaps({ amount, selectedIndex: 0 }), true],
    [generateOptionMaps({ amount, highlightedIndex: 0 }), true],
    [generateOptionMaps({ amount, hiddenIndex: 0 }), false],
    [generateOptionMaps({ amount, initiallyHiddenIndex: 0 }), false],
  ])('should for options %j return %s', (options, expected) => {
    expect(hasFilterResults(options)).toBe(expected);
  });
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

  it.each<[number, DropdownDirectionInternal, number]>([
    [0, 'down', 1],
    [3, 'down', 0],
    [1, 'up', 0],
    [0, 'up', 3],
  ])('should for selectedIndex: %s, direction %s and return %s', (selectedIndex, direction, expected) => {
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
