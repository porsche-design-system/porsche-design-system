import * as selectUtils from './select-utils';
import {
  getSelectDropdownDirection,
  getSelectedOptionString,
  getSrHighlightedOptionText,
  initNativeSelect,
  resetSelectedOption,
  type SelectOption,
  setSelectedOption,
  syncNativeSelect,
  syncSelectChildrenProps,
  updateNativeSelectOption,
  updateSelectOptions,
} from './select-utils';
import * as stencilUtils from '@stencil/core';
import * as loggerUtils from '../../../utils/log/logger';
import * as setAttributesUtils from '../../../utils/dom/setAttributes';
import * as setAttributeUtils from '../../../utils/dom/setAttribute';
import * as dropdownDirectionUtils from '../../../utils/select/select-dropdown';
import * as keyboardBehaviorUtils from '../../../utils/select/keyboard-behavior';

type GenerateOptionsParams = {
  amount?: number;
  values?: string[];
  textContents?: string[];
  selectedIndices?: number[];
  highlightedIndex?: number;
  disabledIndex?: number;
  hiddenIndex?: number;
};

export const generateOptions = (
  {
    amount = 3,
    values,
    textContents,
    selectedIndices = [],
    highlightedIndex,
    disabledIndex,
    hiddenIndex,
  }: GenerateOptionsParams = {
    amount: 3,
    selectedIndices: [],
  }
): SelectOption[] => {
  return Array.from(
    new Array(amount),
    (_, idx) =>
      ({
        value: values?.[idx] ? values[idx] : `Value ${idx}`,
        textContent: textContents?.[idx] ? textContents[idx] : `Option ${idx}`,
        selected: selectedIndices.includes(idx),
        highlighted: highlightedIndex === idx,
        disabled: disabledIndex === idx,
        hidden: hiddenIndex === idx,
      }) as SelectOption
  );
};

describe('syncSelectChildrenProps', () => {
  it('should update theme and force update for mismatched options', () => {
    const options = generateOptions();
    options[0].theme = 'light';
    options[1].theme = 'dark';

    syncSelectChildrenProps(options, 'dark');

    options.forEach((option) => {
      expect(option.theme).toBe('dark');
    });
  });
});

describe('getSelectedOptionString', () => {
  it('should return the textContent of the selected option', () => {
    const options = generateOptions({ selectedIndices: [2], textContents: ['a', 'b', 'c'] });
    const selectedString = getSelectedOptionString(options);
    expect(selectedString).toBe('c');
  });
});

describe('resetSelectedOption', () => {
  it('should reset selected option when selected option exists and call forceUpdate', () => {
    const options = generateOptions({ selectedIndices: [2] });
    const forceUpdateSpy = jest.spyOn(stencilUtils, 'forceUpdate');
    expect(options[2].selected).toBe(true);
    resetSelectedOption(options);
    expect(options[2].selected).toBe(false);
    expect(forceUpdateSpy).toHaveBeenCalledWith(options[2]);
  });
  it('should not call forceUpdate when no selected option exists', () => {
    const options = generateOptions();
    const forceUpdateSpy = jest.spyOn(stencilUtils, 'forceUpdate');
    expect(options[2].selected).toBe(false);
    resetSelectedOption(options);
    expect(options[2].selected).toBe(false);
    expect(forceUpdateSpy).not.toHaveBeenCalled();
  });
});

describe('updateSelectOptions', () => {
  it('should not select option when value="undefined" and no option with that value exists', () => {
    const options = generateOptions();
    const resetSelectedOptionSpy = jest.spyOn(selectUtils, 'resetSelectedOption');
    updateSelectOptions(options, undefined);
    expect(resetSelectedOptionSpy).toHaveBeenCalledWith(options);
    options.forEach((option) => {
      expect(option.selected).toBe(false);
    });
  });
  it('should select correct option when value="undefined" and option with that value exists', () => {
    const options = [
      { value: undefined, selected: false },
      { value: 'a', selected: false },
      { value: 'b', selected: false },
    ] as SelectOption[];
    const resetSelectedOptionSpy = jest.spyOn(selectUtils, 'resetSelectedOption');
    updateSelectOptions(options, undefined);
    expect(resetSelectedOptionSpy).toHaveBeenCalledWith(options);
    expect(options[0].selected).toBe(true);
    expect(options[1].selected).toBe(false);
    expect(options[2].selected).toBe(false);
  });
  it('should not select option and show warning when value="a" and no option with that value exists', () => {
    const options = generateOptions();
    const consoleWarnSpy = jest.spyOn(loggerUtils, 'consoleWarn');
    updateSelectOptions(options, 'a');
    options.forEach((option) => {
      expect(option.selected).toBe(false);
    });
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'The provided value is not included in the options of the p-select:',
      'a'
    );
  });
  it('should select correct option when value="a" and option with that value exists', () => {
    const options = [
      { value: 'a', selected: false },
      { value: 'b', selected: false },
      { value: 'c', selected: false },
    ] as SelectOption[];
    const resetSelectedOptionSpy = jest.spyOn(selectUtils, 'resetSelectedOption');
    updateSelectOptions(options, 'a');
    expect(resetSelectedOptionSpy).toHaveBeenCalledWith(options);
    expect(options[0].selected).toBe(true);
    expect(options[1].selected).toBe(false);
    expect(options[2].selected).toBe(false);
  });
});

describe('setSelectedOption', () => {
  it('should set option selected and call resetSelectedOption and forceUpdate', () => {
    const resetSelectedOptionSpy = jest.spyOn(selectUtils, 'resetSelectedOption');
    const forceUpdateSpy = jest.spyOn(stencilUtils, 'forceUpdate');
    const options = generateOptions();
    setSelectedOption(options, options[1]);
    expect(options[0].selected).toBe(false);
    expect(options[1].selected).toBe(true);
    expect(options[2].selected).toBe(false);
    expect(resetSelectedOptionSpy).toHaveBeenCalledWith(options);
    expect(forceUpdateSpy).toHaveBeenCalledWith(options[1]);
  });
});

describe('initNativeSelect', () => {
  it('should return native select with added attributes and add native select to host', () => {
    const spy = jest.spyOn(setAttributesUtils, 'setAttributes');
    const syncNativeSelectSpy = jest.spyOn(selectUtils, 'syncNativeSelect');

    const host = document.createElement('p-select');
    const name = 'options';
    const disabled = true;
    const required = false;

    const nativeSelect = initNativeSelect(host, name, disabled, required);

    expect(nativeSelect instanceof HTMLSelectElement).toBe(true);
    expect(spy).toHaveBeenCalledWith(nativeSelect, {
      'aria-hidden': 'true',
      tabindex: '-1',
      slot: 'internal-select',
    });
    expect(syncNativeSelectSpy).toHaveBeenCalledWith(nativeSelect, name, disabled, required);
    expect(host.firstChild).toBe(nativeSelect);
  });
});

describe('syncNativeSelect', () => {
  it('should synchronize attributes of native select element', () => {
    const setAttributeSpy = jest.spyOn(setAttributeUtils, 'setAttribute');

    const nativeSelect = document.createElement('select');
    const toggleAttributeSpy = jest.spyOn(nativeSelect, 'toggleAttribute');
    const name = 'testSelect';
    const disabled = true;
    const required = false;

    syncNativeSelect(nativeSelect, name, disabled, required);

    expect(setAttributeSpy).toHaveBeenCalledWith(nativeSelect, 'name', name);
    expect(toggleAttributeSpy).toHaveBeenCalledWith('disabled', true);
    expect(toggleAttributeSpy).toHaveBeenCalledWith('required', false);
  });

  it('should remove "disabled" and "required" attributes when not disabled and not required', () => {
    const setAttributeSpy = jest.spyOn(setAttributeUtils, 'setAttribute');
    const nativeSelect = document.createElement('select');
    const toggleAttributeSpy = jest.spyOn(nativeSelect, 'toggleAttribute');
    const name = 'testSelect';
    const disabled = false;
    const required = false;

    syncNativeSelect(nativeSelect, name, disabled, required);

    expect(setAttributeSpy).toHaveBeenCalledWith(nativeSelect, 'name', name);
    expect(toggleAttributeSpy).toHaveBeenCalledWith('disabled', false);
    expect(toggleAttributeSpy).toHaveBeenCalledWith('required', false);
  });

  it('should add "required" and "disabled" attributes when required and disabled', () => {
    const setAttributeSpy = jest.spyOn(setAttributeUtils, 'setAttribute');
    const nativeSelect = document.createElement('select');
    const toggleAttributeSpy = jest.spyOn(nativeSelect, 'toggleAttribute');
    const name = 'testSelect';
    const disabled = true;
    const required = true;

    syncNativeSelect(nativeSelect, name, disabled, required);

    expect(setAttributeSpy).toHaveBeenCalledWith(nativeSelect, 'name', name);
    expect(toggleAttributeSpy).toHaveBeenCalledWith('disabled', true);
    expect(toggleAttributeSpy).toHaveBeenCalledWith('required', true);
  });
});

describe('updateNativeSelectOption', () => {
  it('should update the innerHTML of the nativeSelect', () => {
    const nativeSelect = document.createElement('select');
    const selectedOption = [1];
    const options = generateOptions({ amount: 4, selectedIndices: selectedOption });

    updateNativeSelectOption(nativeSelect, options);
    expect(nativeSelect.innerHTML).toBe('<option value="Value 1" selected=""></option>');
  });

  it('should not update the innerHTML of the nativeSelect when the selected option has undefined value', () => {
    const nativeSelect = document.createElement('select');
    const options = [
      { value: undefined, selected: true },
      { value: 'a', selected: false },
      { value: 'b', selected: false },
    ] as SelectOption[];
    updateNativeSelectOption(nativeSelect, options);
    expect(nativeSelect.innerHTML).toBe('');
  });
});

describe('getSelectDropdownDirection()', () => {
  it('should return correct direction', () => {
    const options = generateOptions({ amount: 5, hiddenIndex: 2 });
    const host = document.createElement('p-select');
    expect(getSelectDropdownDirection('down', host, options)).toBe('down');
    expect(getSelectDropdownDirection('up', host, options)).toBe('up');

    const spy = jest.spyOn(dropdownDirectionUtils, 'determineDropdownDirection');
    getSelectDropdownDirection('auto', host, options);
    expect(spy).toHaveBeenCalledWith(host, 4);

    // Fallback when host is undefined
    expect(getSelectDropdownDirection('auto', undefined, options)).toBe('down');
  });
});

describe('getSrHighlightedOptionText()', () => {
  it('should return undefined when no option is highlighted', () => {
    const getHighlightedSelectOptionIndexSpy = jest.spyOn(keyboardBehaviorUtils, 'getHighlightedSelectOptionIndex');
    const getUsableSelectOptionsSpy = jest.spyOn(keyboardBehaviorUtils, 'getUsableSelectOptions');
    const options = generateOptions();
    const text = getSrHighlightedOptionText(options);

    expect(getHighlightedSelectOptionIndexSpy).toHaveBeenCalledWith(options);
    expect(getUsableSelectOptionsSpy).toHaveBeenCalledWith(options);
    expect(text).toBeUndefined();
  });
  it('should return correct string when option is highlighted, selected and has textContent', () => {
    const getHighlightedSelectOptionIndexSpy = jest.spyOn(keyboardBehaviorUtils, 'getHighlightedSelectOptionIndex');
    const getUsableSelectOptionsSpy = jest.spyOn(keyboardBehaviorUtils, 'getUsableSelectOptions');
    const options = generateOptions({ textContents: ['a'], selectedIndices: [0], highlightedIndex: 0 });
    const text = getSrHighlightedOptionText(options);

    expect(getHighlightedSelectOptionIndexSpy).toHaveBeenCalledWith(options);
    expect(getUsableSelectOptionsSpy).toHaveBeenCalledWith(options);
    expect(text).toBe('a, selected (1 of 3)');
  });
  it('should return correct string when option is highlighted, selected and has no textContent', () => {
    const getHighlightedSelectOptionIndexSpy = jest.spyOn(keyboardBehaviorUtils, 'getHighlightedSelectOptionIndex');
    const getUsableSelectOptionsSpy = jest.spyOn(keyboardBehaviorUtils, 'getUsableSelectOptions');
    const options = [
      { value: undefined, selected: true, textContent: '', highlighted: true },
      { value: 'a', selected: false, textContent: 'a', highlighted: false },
      { value: 'b', selected: false, textContent: 'b', highlighted: false },
    ] as SelectOption[];
    const text = getSrHighlightedOptionText(options);

    expect(getHighlightedSelectOptionIndexSpy).toHaveBeenCalledWith(options);
    expect(getUsableSelectOptionsSpy).toHaveBeenCalledWith(options);
    expect(text).toBe('Empty option, selected (1 of 3)');
  });
  it('should return correct string when option is highlighted, not selected and has textContent', () => {
    const getHighlightedSelectOptionIndexSpy = jest.spyOn(keyboardBehaviorUtils, 'getHighlightedSelectOptionIndex');
    const getUsableSelectOptionsSpy = jest.spyOn(keyboardBehaviorUtils, 'getUsableSelectOptions');
    const options = generateOptions({ textContents: ['a'], highlightedIndex: 0 });
    const text = getSrHighlightedOptionText(options);

    expect(getHighlightedSelectOptionIndexSpy).toHaveBeenCalledWith(options);
    expect(getUsableSelectOptionsSpy).toHaveBeenCalledWith(options);
    expect(text).toBe('a not selected (1 of 3)');
  });
});
