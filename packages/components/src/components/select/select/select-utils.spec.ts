import * as stencilUtils from '@stencil/core';
import * as loggerUtils from '../../../utils/log/logger';
import * as selectUtils from './select-utils';
import {
  type SelectOption,
  getSelectedOptionString,
  resetSelectedOption,
  setSelectedOption,
  syncSelectChildrenProps,
  updateSelectOptions,
} from './select-utils';

type GenerateOptionsParams = {
  amount?: number;
  values?: string[];
  textContents?: string[];
  selectedIndices?: number[];
  highlightedIndex?: number;
  disabledIndex?: number;
  hiddenIndex?: number;
};

const generateOptions = (
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
