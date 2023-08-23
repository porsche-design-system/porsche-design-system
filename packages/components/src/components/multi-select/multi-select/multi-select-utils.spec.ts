import * as multiSelectUtils from './multi-select-utils';
import {
  getDropdownDirection,
  getHighlightedOption,
  getHighlightedOptionIndex,
  getNewOptionIndex,
  getSelectedOptions,
  getSelectedOptionsString,
  getSelectedOptionValues,
  getUsableOptions,
  hasFilterOptionResults,
  initNativeSelect,
  MultiSelectOption,
  resetFilteredOptions,
  resetHighlightedOptions,
  resetSelectedOptions,
  setFirstOptionHighlighted,
  setHighlightedOption,
  setLastOptionHighlighted,
  setNextOptionHighlighted,
  setSelectedOptions,
  syncMultiSelectOptionProps,
  syncNativeSelect,
  updateHighlightedOption,
  updateNativeOptions,
  updateOptionsFilterState,
} from './multi-select-utils';
import * as setAttributesUtils from '../../../utils/dom/setAttributes';
import * as setAttributeUtils from '../../../utils/dom/setAttribute';
import * as removeAttributesUtils from '../../../utils/dom/removeAttribute';
import * as dropdownDirectionUtils from '../../../utils/select/select-dropdown';
import { Theme } from '../../../utils';
import { DropdownDirectionInternal } from '../../select-wrapper/select-wrapper/select-wrapper-utils';

type Option = {
  value: string | number;
  selected: boolean;
  highlighted: boolean;
  disabled: boolean;
  hidden: boolean;
  theme?: Theme;
};

type GenerateMultiSelectOptionsParams = {
  amount: number;
  selectedIndices?: number[];
  highlightedIndex?: number;
  disabledIndex?: number;
  hiddenIndex?: number;
};

export const generateMultiSelectOptions = (
  { amount, selectedIndices = [], highlightedIndex, disabledIndex, hiddenIndex }: GenerateMultiSelectOptionsParams = {
    amount: 3,
    selectedIndices: [],
  }
): MultiSelectOption[] => {
  return Array.from(Array(amount)).map<Option>((_, idx) => ({
    value: `Value ${idx}`,
    textContent: `Option ${idx}`,
    selected: selectedIndices.includes(idx),
    highlighted: highlightedIndex === idx,
    disabled: disabledIndex === idx,
    hidden: hiddenIndex === idx,
  })) as MultiSelectOption[];
};

describe('syncMultiSelectOptionProps', () => {
  it('should update theme and force update for mismatched options', () => {
    const options = generateMultiSelectOptions();
    options[0].theme = 'light';
    options[1].theme = 'dark';

    syncMultiSelectOptionProps(options, 'dark');

    options.forEach((option) => {
      expect(option.theme).toBe('dark');
    });
  });
});

describe('initNativeSelect', () => {
  it('should return native select with added attributes and add native select to host', () => {
    const spy = jest.spyOn(setAttributesUtils, 'setAttributes');
    const syncNativeSelectSpy = jest.spyOn(multiSelectUtils, 'syncNativeSelect');

    const host = document.createElement('p-multi-select');
    const name = 'options';
    const disabled = true;
    const required = false;

    const nativeSelect = initNativeSelect(host, name, disabled, required);

    expect(nativeSelect instanceof HTMLSelectElement).toBe(true);
    expect(spy).toHaveBeenCalledWith(nativeSelect, {
      multiple: 'true',
      'aria-hidden': 'true',
      tabindex: '-1',
      slot: 'select',
    });
    expect(syncNativeSelectSpy).toHaveBeenCalledWith(nativeSelect, name, disabled, required);
    expect(host.firstChild).toBe(nativeSelect);
  });
});

describe('syncNativeSelect', () => {
  it('should synchronize attributes of native select element', () => {
    const setAttributeSpy = jest.spyOn(setAttributeUtils, 'setAttribute');
    const removeAttributeSpy = jest.spyOn(removeAttributesUtils, 'removeAttribute');

    const nativeSelect = document.createElement('select');
    const name = 'testSelect';
    const disabled = true;
    const required = false;

    syncNativeSelect(nativeSelect, name, disabled, required);

    expect(setAttributeSpy).toHaveBeenCalledWith(nativeSelect, 'name', name);
    expect(setAttributeSpy).toHaveBeenCalledWith(nativeSelect, 'disabled');
    expect(removeAttributeSpy).toHaveBeenCalledWith(nativeSelect, 'required');
  });

  it('should remove "disabled" and "required" attributes when not disabled and not required', () => {
    const setAttributeSpy = jest.spyOn(setAttributeUtils, 'setAttribute');
    const removeAttributeSpy = jest.spyOn(removeAttributesUtils, 'removeAttribute');
    const nativeSelect = document.createElement('select');
    const name = 'testSelect';
    const disabled = false;
    const required = false;

    syncNativeSelect(nativeSelect, name, disabled, required);

    expect(setAttributeSpy).toHaveBeenCalledWith(nativeSelect, 'name', name);
    expect(removeAttributeSpy).toHaveBeenCalledWith(nativeSelect, 'disabled');
    expect(removeAttributeSpy).toHaveBeenCalledWith(nativeSelect, 'required');
  });

  it('should add "required" and "disabled" attributes when required and disabled', () => {
    const setAttributeSpy = jest.spyOn(setAttributeUtils, 'setAttribute');
    const nativeSelect = document.createElement('select');
    const name = 'testSelect';
    const disabled = true;
    const required = true;

    syncNativeSelect(nativeSelect, name, disabled, required);

    expect(setAttributeSpy).toHaveBeenCalledWith(nativeSelect, 'name', name);
    expect(setAttributeSpy).toHaveBeenCalledWith(nativeSelect, 'disabled');
    expect(setAttributeSpy).toHaveBeenCalledWith(nativeSelect, 'required');
  });
});

describe('updateNativeOptions()', () => {
  it('should update the innerHTML of the nativeSelect', () => {
    const nativeSelect = document.createElement('select');
    const selectedOptions = [0, 1, 2];
    const options = generateMultiSelectOptions({ amount: 4, selectedIndices: selectedOptions });

    updateNativeOptions(nativeSelect, options);
    const optionElements = nativeSelect.querySelectorAll('option');
    expect(optionElements.length).toBe(selectedOptions.length);

    optionElements.forEach((option, index) => {
      expect(option.value).toBe(options[index].value);
      // prop reflection not completed yet
      expect(option.getAttribute('selected') === 'true').toBe(options[index].selected);
      expect(option.textContent).toBe(options[index].textContent);
    });
  });
});

describe('updateOptionsFilterState()', () => {
  it('should update hidden option prop depending on search string', () => {
    const options = generateMultiSelectOptions();
    const searchString1 = 'Option 3';
    updateOptionsFilterState(searchString1, options);
    options.forEach((option) => {
      expect(option.hidden).toBeTruthy();
    });

    const searchString2 = 'Option 2';
    updateOptionsFilterState(searchString2, options);
    expect(options[0].hidden).toBeTruthy();
    expect(options[1].hidden).toBeTruthy();
    expect(options[2].hidden).toBeFalsy();

    const searchString3 = 'Option';
    updateOptionsFilterState(searchString3, options);
    options.forEach((option) => {
      expect(option.hidden).toBeFalsy();
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
    resetFilteredOptions(options);
    options.forEach((option) => {
      expect(option.hidden).toBeFalsy();
    });
    options[0].hidden = true;
    options[1].hidden = true;
    resetFilteredOptions(options);
    options.forEach((option) => {
      expect(option.hidden).toBeFalsy();
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

    const value3 = ['Value 2', 3, 'test'];

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

// handleDropdownScroll is not tested on purpose
// describe('handleDropdownScroll()', () => {});

describe('getDropdownDirection()', () => {
  it('should return correct direction', () => {
    const options = generateMultiSelectOptions({ amount: 5, hiddenIndex: 2 });
    const host = document.createElement('p-multi-select');
    expect(getDropdownDirection('down', host, options)).toBe('down');
    expect(getDropdownDirection('up', host, options)).toBe('up');

    const spy = jest.spyOn(dropdownDirectionUtils, 'determineDropdownDirection');
    getDropdownDirection('auto', host, options);
    expect(spy).toHaveBeenCalledWith(host, 4);

    // Fallback when host is undefined
    expect(getDropdownDirection('auto', undefined, options)).toBe('down');
  });
});
