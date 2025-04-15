import type { DropdownDirectionInternal } from '../../select-wrapper/select-wrapper/select-wrapper-utils';
import * as multiSelectUtils from './multi-select-utils';
import {
  type MultiSelectOptgroup,
  type MultiSelectOption,
  getHighlightedOption,
  getHighlightedOptionIndex,
  getNewOptionIndex,
  getSelectedOptionValues,
  getSelectedOptions,
  getSelectedOptionsString,
  getUsableOptions,
  hasFilterOptionResults,
  resetFilteredOptions,
  resetHighlightedOptions,
  resetSelectedOptions,
  setFirstOptionHighlighted,
  setHighlightedOption,
  setLastOptionHighlighted,
  setNextOptionHighlighted,
  setSelectedOptions,
  syncMultiSelectChildrenProps,
  updateHighlightedOption,
  updateOptionsFilterState,
  setAriaActiveDescendantElement,
} from './multi-select-utils';

type GenerateMultiSelectOptionsParams = {
  amount: number;
  selectedIndices?: number[];
  highlightedIndex?: number;
  disabledIndex?: number;
  hiddenIndex?: number;
};

type GenerateMultiSelectOptgroupParams = {
  amount: number;
  disabledIndex?: number;
  hiddenIndex?: number;
};

type Writeable<T> = { -readonly [P in keyof T]: T[P] };

const generateMultiSelectOptions = (
  { amount, selectedIndices = [], highlightedIndex, disabledIndex, hiddenIndex }: GenerateMultiSelectOptionsParams = {
    amount: 3,
    selectedIndices: [],
  }
): MultiSelectOption[] => {
  return Array.from(
    new Array(amount),
    (_, idx) =>
      ({
        value: `Value ${idx}`,
        textContent: `Option ${idx}`,
        selected: selectedIndices.includes(idx),
        highlighted: highlightedIndex === idx,
        disabled: disabledIndex === idx,
        hidden: hiddenIndex === idx,
      }) as MultiSelectOption
  );
};

const generateMultiSelectOptgroups = (
  { amount, disabledIndex, hiddenIndex }: GenerateMultiSelectOptgroupParams = {
    amount: 3,
  }
): MultiSelectOptgroup[] => {
  return Array.from(
    new Array(amount),
    (_, idx) =>
      ({
        label: `Label ${idx}`,
        disabled: disabledIndex === idx,
        hidden: hiddenIndex === idx,
      }) as MultiSelectOptgroup
  );
};

describe('syncMultiSelectChildrenProps', () => {
  it('should update theme and force update for mismatched options', () => {
    const options = generateMultiSelectOptions();
    options[0].theme = 'light';
    options[1].theme = 'dark';

    syncMultiSelectChildrenProps(options, 'dark');

    options.forEach((option) => {
      expect(option.theme).toBe('dark');
    });
  });
});

describe('updateOptionsFilterState()', () => {
  it('should update hidden option prop depending on search string', () => {
    const options = generateMultiSelectOptions();
    const optgroups = generateMultiSelectOptgroups();

    optgroups.forEach(
      (optgroup) => ((optgroup as Writeable<HTMLPOptgroupElement>).children = options as unknown as HTMLCollection)
    );

    const searchString1 = 'Option 3';
    updateOptionsFilterState(searchString1, options, optgroups);

    options.forEach((option) => {
      expect(option.hidden).toBeTruthy();
    });

    optgroups.forEach((optgroup) => {
      expect(optgroup.hidden).toBeTruthy();
    });

    const searchString2 = 'Option 2';
    updateOptionsFilterState(searchString2, options, optgroups);
    expect(options[0].hidden).toBeTruthy();
    expect(options[1].hidden).toBeTruthy();
    expect(options[2].hidden).toBeFalsy();

    const searchString3 = 'Option';
    updateOptionsFilterState(searchString3, options, optgroups);
    options.forEach((option) => {
      expect(option.hidden).toBeFalsy();
    });

    optgroups.forEach((optgroup) => {
      expect(optgroup.hidden).toBeFalsy();
    });
  });
});

describe('hasFilterOptionResults()', () => {
  it('should return boolean depending if there are hidden options', () => {
    const options = generateMultiSelectOptions();
    expect(hasFilterOptionResults(options)).toBeTruthy();
    options[0].hidden = true;
    options[1].hidden = true;
    expect(hasFilterOptionResults(options)).toBeTruthy();
    options[2].hidden = true;
    expect(hasFilterOptionResults(options)).toBeFalsy();
  });
});

describe('resetFilteredOptions()', () => {
  it('should reset all options to not be hidden', () => {
    const options = generateMultiSelectOptions();
    const optgroups = generateMultiSelectOptgroups();

    resetFilteredOptions(options, optgroups);
    options.forEach((option) => {
      expect(option.hidden).toBeFalsy();
    });
    optgroups.forEach((option) => {
      expect(option.hidden).toBeFalsy();
    });

    options[0].hidden = true;
    options[1].hidden = true;
    optgroups[0].hidden = true;
    optgroups[1].hidden = true;
    resetFilteredOptions(options, optgroups);
    options.forEach((option) => {
      expect(option.hidden).toBeFalsy();
    });
    optgroups.forEach((optgroup) => {
      expect(optgroup.hidden).toBeFalsy();
    });
  });
});

describe('getSelectedOptions()', () => {
  it('should return all selected options', () => {
    const options = generateMultiSelectOptions();
    expect(getSelectedOptions(options)).toEqual([]);
    options[0].selected = true;
    expect(getSelectedOptions(options)).toEqual([options[0]]);
    options[2].selected = true;
    expect(getSelectedOptions(options)).toEqual([options[0], options[2]]);
  });
});

describe('getSelectedOptionValues', () => {
  it('should return all selected options values', () => {
    const options = generateMultiSelectOptions();
    expect(getSelectedOptionValues(options)).toEqual([]);
    options[0].selected = true;
    expect(getSelectedOptionValues(options)).toEqual([options[0].value]);
    options[2].selected = true;
    expect(getSelectedOptionValues(options)).toEqual([options[0].value, options[2].value]);
  });
});

describe('getSelectedOptionsString', () => {
  it('should return all selected options textContent joined to one string', () => {
    const options = generateMultiSelectOptions();
    expect(getSelectedOptionsString(options)).toEqual('');
    options[0].selected = true;
    expect(getSelectedOptionsString(options)).toEqual(options[0].textContent);
    options[2].selected = true;
    expect(getSelectedOptionsString(options)).toEqual(`${options[0].textContent}, ${options[2].textContent}`);
  });
});

describe('getUsableOptions', () => {
  it('should return all options which are not disabled or hidden', () => {
    const options = generateMultiSelectOptions();
    expect(getUsableOptions(options)).toEqual(options);
    options[0].hidden = true;
    expect(getUsableOptions(options)).toEqual([options[1], options[2]]);
    options[2].disabled = true;
    expect(getUsableOptions(options)).toEqual([options[1]]);
  });
});

describe('getHighlightedOption', () => {
  it('should return the highlighted option', () => {
    const options = generateMultiSelectOptions();
    expect(getHighlightedOption(options)).toBeUndefined();
    options[0].highlighted = true;
    expect(getHighlightedOption(options)).toEqual(options[0]);
    options[0].highlighted = false;
    options[2].highlighted = true;
    expect(getHighlightedOption(options)).toEqual(options[2]);
  });
});

describe('setSelectedOptions', () => {
  it('should update the selected state of options not fitting the value', () => {
    const consoleWarnMock = jest.spyOn(console, 'warn').mockImplementation();
    const options = generateMultiSelectOptions({ amount: 5, selectedIndices: [0, 2, 3] });
    const value1 = ['Value 1', 'Value 2'];

    setSelectedOptions(options, value1);
    expect(options[0].selected).toBeFalsy();
    expect(options[1].selected).toBeTruthy();
    expect(options[2].selected).toBeTruthy();
    expect(options[3].selected).toBeFalsy();
    expect(options[4].selected).toBeFalsy();

    const value2 = ['Value 0', 'Value 4'];

    setSelectedOptions(options, value2);
    expect(options[0].selected).toBeTruthy();
    expect(options[1].selected).toBeFalsy();
    expect(options[2].selected).toBeFalsy();
    expect(options[3].selected).toBeFalsy();
    expect(options[4].selected).toBeTruthy();

    const value3 = ['Value 2', '3', 'test'];

    setSelectedOptions(options, value3);
    expect(options[0].selected).toBeFalsy();
    expect(options[1].selected).toBeFalsy();
    expect(options[2].selected).toBeTruthy();
    expect(options[3].selected).toBeFalsy();
    expect(options[4].selected).toBeFalsy();

    expect(consoleWarnMock).toHaveBeenCalledWith(
      '[Porsche Design System]',
      'The following values are not included in the options of the p-multi-select:',
      '3, test'
    );
  });
});

describe('setHighlightedOption', () => {
  it('should set the option highlighted', () => {
    const options = generateMultiSelectOptions();
    expect(options[0].highlighted).toBeFalsy();
    setHighlightedOption(options[0], true);
    expect(options[0].highlighted).toBeTruthy();
    setHighlightedOption(options[0], false);
    expect(options[0].highlighted).toBeFalsy();
  });
});

describe('getHighlightedOptionIndex', () => {
  it('should return the index of the highlighted option', () => {
    const options = generateMultiSelectOptions();
    expect(getHighlightedOptionIndex(options)).toBe(-1);
    options[0].highlighted = true;
    expect(getHighlightedOptionIndex(options)).toBe(0);
    options[0].highlighted = false;
    options[2].highlighted = true;
    expect(getHighlightedOptionIndex(options)).toBe(2);
  });
});

describe('setNextOptionHighlighted()', () => {
  it('should set the next option highlighted', () => {
    const host = document.createElement('p-multi-select');
    const spy = jest.spyOn(multiSelectUtils, 'handleDropdownScroll');
    const options = generateMultiSelectOptions();
    options.forEach((option) => {
      expect(option.highlighted).toBeFalsy();
    });
    setNextOptionHighlighted(host, options, 1);
    expect(options[1].highlighted).toBeTruthy();
    expect(spy).toHaveBeenCalledTimes(1);

    setNextOptionHighlighted(host, options, 2);
    expect(options[1].highlighted).toBeFalsy();
    expect(options[2].highlighted).toBeTruthy();
    expect(spy).toHaveBeenCalledTimes(2);

    setNextOptionHighlighted(host, options, 0);
    expect(options[2].highlighted).toBeFalsy();
    expect(options[0].highlighted).toBeTruthy();
    expect(spy).toHaveBeenCalledTimes(3);
  });
});

describe('setFirstOptionHighlighted()', () => {
  it('should set first option highlighted', () => {
    const host = document.createElement('p-multi-select');
    const options = generateMultiSelectOptions({ amount: 5, highlightedIndex: 2 });
    expect(options[2].highlighted).toBeTruthy();
    setFirstOptionHighlighted(host, options);
    expect(options[0].highlighted).toBeTruthy();
    expect(options[2].highlighted).toBeFalsy();
  });
});

describe('setLastOptionHighlighted()', () => {
  it('should set last option highlighted', () => {
    const host = document.createElement('p-multi-select');
    const options = generateMultiSelectOptions({ amount: 5, highlightedIndex: 2 });
    expect(options[2].highlighted).toBeTruthy();
    setLastOptionHighlighted(host, options);
    expect(options[2].highlighted).toBeFalsy();
    expect(options[4].highlighted).toBeTruthy();
  });
});

describe('resetHighlightedOptions()', () => {
  it('should reset highlighted options', () => {
    const options = generateMultiSelectOptions({ amount: 5, highlightedIndex: 2 });
    expect(options[2].highlighted).toBeTruthy();
    resetHighlightedOptions(options);
    expect(options[2].highlighted).toBeFalsy();
    options[0].highlighted = true;
    resetHighlightedOptions(options);
    expect(options[0].highlighted).toBeFalsy();
  });
});

describe('resetSelectedOptions()', () => {
  it('should reset selected options', () => {
    const options = generateMultiSelectOptions({ amount: 5, selectedIndices: [0, 1, 2] });
    expect(options[0].selected).toBeTruthy();
    expect(options[1].selected).toBeTruthy();
    expect(options[1].selected).toBeTruthy();
    resetSelectedOptions(options);
    options.forEach((option) => {
      expect(option.selected).toBeFalsy();
    });
  });
});

describe('getNewOptionIndex()', () => {
  it('should return undefined if there is no valid option', () => {
    const options = generateMultiSelectOptions({ amount: 5 }).map((item) => ({
      ...item,
      disabled: true,
    }));

    const result = getNewOptionIndex(options, 'down');
    expect(result).toBeUndefined();
  });

  it.each<[number, DropdownDirectionInternal, number, number]>([
    [0, 'down', 3, 1],
    [1, 'down', 3, 2],
    [1, 'down', 2, 0],
    [0, 'up', 3, 2],
    [1, 'up', 3, 0],
    [2, 'up', 3, 1],
  ])(
    'should for highlightedIndex: %s, direction %s, amount: %s and return %s',
    (highlightedIndex, direction, amount, expected) => {
      const options = generateMultiSelectOptions({ amount, highlightedIndex });
      expect(getNewOptionIndex(options, direction)).toBe(expected);
    }
  );
});

describe('updateHighlightedOption()', () => {
  it('should get new index with getNewOptionIndex() and call setNextOptionHighlighted()', () => {
    const host = document.createElement('p-multi-select');
    const options = generateMultiSelectOptions();

    const getNewOptionIndexSpy = jest.spyOn(multiSelectUtils, 'getNewOptionIndex').mockReturnValueOnce(1);
    const setNextOptionHighlightedSpy = jest.spyOn(multiSelectUtils, 'setNextOptionHighlighted');
    updateHighlightedOption(host, options, 'down');

    expect(getNewOptionIndexSpy).toHaveBeenCalledTimes(1);
    expect(setNextOptionHighlightedSpy).toHaveBeenCalledWith(host, options, 1);
  });
});

describe('setAriaActiveDescendantElement()', () => {
  it('should set ariaActiveDescendantElement to the highlighted option', () => {
    const combobox = document.createElement('input');
    const options = generateMultiSelectOptions({ amount: 3, highlightedIndex: 1 });

    const result = setAriaActiveDescendantElement(combobox, options);

    // @ts-ignore - HTMLCombobox type is missing
    expect(combobox.ariaActiveDescendantElement).toBe(options[1]);
    expect(result).toBe(options[1]);
  });

  it('should set ariaActiveDescendantElement to undefined if no option is highlighted', () => {
    const combobox = document.createElement('input');
    const options = generateMultiSelectOptions({ amount: 3 });

    const result = setAriaActiveDescendantElement(combobox, options);

    // @ts-ignore - HTMLCombobox type is missing
    expect(combobox.ariaActiveDescendantElement).toBeUndefined();
    expect(result).toBeUndefined();
  });
});
