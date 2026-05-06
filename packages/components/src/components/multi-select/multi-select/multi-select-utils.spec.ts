import { vi } from 'vitest';
import {
  getSelectedOptions,
  getSelectedOptionsString,
  getSelectedOptionValues,
  type MultiSelectOption,
  resetSelectedOptions,
  selectOptionsByValue,
} from './multi-select-utils';

type GenerateMultiSelectOptionsParams = {
  amount: number;
  selectedIndices?: number[];
  highlightedIndex?: number;
  disabledIndex?: number;
  hiddenIndex?: number;
};

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

describe('setSelectedOptions', () => {
  it('should update the selected state of options not fitting the value', () => {
    const host = document.createElement('p-multi-select');
    const consoleWarnMock = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const options = generateMultiSelectOptions({ amount: 5, selectedIndices: [0, 2, 3] });
    const value1 = ['Value 1', 'Value 2'];

    selectOptionsByValue(host, options, value1);
    expect(options[0].selected).toBeFalsy();
    expect(options[1].selected).toBeTruthy();
    expect(options[2].selected).toBeTruthy();
    expect(options[3].selected).toBeFalsy();
    expect(options[4].selected).toBeFalsy();

    const value2 = ['Value 0', 'Value 4'];

    selectOptionsByValue(host, options, value2);
    expect(options[0].selected).toBeTruthy();
    expect(options[1].selected).toBeFalsy();
    expect(options[2].selected).toBeFalsy();
    expect(options[3].selected).toBeFalsy();
    expect(options[4].selected).toBeTruthy();

    const value3 = ['Value 2', '3', 'test'];

    selectOptionsByValue(host, options, value3);
    expect(options[0].selected).toBeFalsy();
    expect(options[1].selected).toBeFalsy();
    expect(options[2].selected).toBeTruthy();
    expect(options[3].selected).toBeFalsy();
    expect(options[4].selected).toBeFalsy();

    expect(consoleWarnMock).toHaveBeenCalledWith(
      '[Porsche Design System]',
      'The provided value: 3, test is not included in the options of the p-multi-select:',
      host
    );
  });

  it('should deselect all options when value is null', () => {
    const host = document.createElement('p-multi-select');
    const options = generateMultiSelectOptions({ amount: 3, selectedIndices: [0, 2] });
    const result = selectOptionsByValue(host, options, null);
    expect(options[0].selected).toBe(false);
    expect(options[1].selected).toBe(false);
    expect(options[2].selected).toBe(false);
    expect(result).toEqual([]);
  });

  it('should deselect all options when value is empty array', () => {
    const host = document.createElement('p-multi-select');
    const options = generateMultiSelectOptions({ amount: 3, selectedIndices: [0, 2] });
    const result = selectOptionsByValue(host, options, []);
    expect(options[0].selected).toBe(false);
    expect(options[1].selected).toBe(false);
    expect(options[2].selected).toBe(false);
    expect(result).toEqual([]);
  });

  it('should match numeric values against numeric option.values (same type)', () => {
    const host = document.createElement('p-multi-select');
    const options = [
      { value: 1, selected: false },
      { value: 2, selected: false },
      { value: 3, selected: false },
    ] as unknown as MultiSelectOption[];
    const result = selectOptionsByValue(host, options, [1, 3]);
    expect(options[0].selected).toBe(true);
    expect(options[1].selected).toBe(false);
    expect(options[2].selected).toBe(true);
    expect(result).toEqual([options[0], options[2]]);
  });

  it('should match numeric option.value=0 against value=[0] (no falsy regression)', () => {
    const host = document.createElement('p-multi-select');
    const options = [{ value: 0, selected: false }] as unknown as MultiSelectOption[];
    selectOptionsByValue(host, options, [0]);
    expect(options[0].selected).toBe(true);
  });

  it('should NOT match numeric option.values against string host values (strict-typed)', () => {
    const host = document.createElement('p-multi-select');
    const consoleWarnMock = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const options = [
      { value: 1, selected: false },
      { value: 2, selected: false },
    ] as unknown as MultiSelectOption[];
    selectOptionsByValue(host, options, ['1', '2']);
    expect(options[0].selected).toBe(false);
    expect(options[1].selected).toBe(false);
    expect(consoleWarnMock).toHaveBeenCalled();
  });

  it('should NOT match string option.values against numeric host values (strict-typed)', () => {
    const host = document.createElement('p-multi-select');
    const consoleWarnMock = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const options = [
      { value: '1', selected: false },
      { value: '2', selected: false },
    ] as unknown as MultiSelectOption[];
    selectOptionsByValue(host, options, [1, 2]);
    expect(options[0].selected).toBe(false);
    expect(options[1].selected).toBe(false);
    expect(consoleWarnMock).toHaveBeenCalled();
  });

  it('should warn only for values that do not match any option', () => {
    const host = document.createElement('p-multi-select');
    const consoleWarnMock = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const options = [
      { value: 'a', selected: false },
      { value: 'b', selected: false },
    ] as unknown as MultiSelectOption[];
    selectOptionsByValue(host, options, ['a', 'missing']);
    expect(options[0].selected).toBe(true);
    expect(options[1].selected).toBe(false);
    expect(consoleWarnMock).toHaveBeenCalledWith(
      '[Porsche Design System]',
      'The provided value: missing is not included in the options of the p-multi-select:',
      host
    );
  });

  it('should NOT warn when all values match (number[])', () => {
    const host = document.createElement('p-multi-select');
    const consoleWarnMock = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const options = [
      { value: 1, selected: false },
      { value: 2, selected: false },
    ] as unknown as MultiSelectOption[];
    selectOptionsByValue(host, options, [1, 2]);
    expect(consoleWarnMock).not.toHaveBeenCalled();
  });

  it('should NOT warn when value is null', () => {
    const host = document.createElement('p-multi-select');
    const consoleWarnMock = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const options = generateMultiSelectOptions({ amount: 2 });
    selectOptionsByValue(host, options, null);
    expect(consoleWarnMock).not.toHaveBeenCalled();
  });

  it('should suppress warning when preventWarning is true (e.g. when filterSlot is used)', () => {
    const host = document.createElement('p-multi-select');
    const consoleWarnMock = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const options = [{ value: 'a', selected: false }] as unknown as MultiSelectOption[];
    selectOptionsByValue(host, options, ['a', 'missing'], true);
    expect(consoleWarnMock).not.toHaveBeenCalled();
  });

  it('should return only currently selected options', () => {
    const host = document.createElement('p-multi-select');
    const options = generateMultiSelectOptions({ amount: 4 });
    const result = selectOptionsByValue(host, options, ['Value 1', 'Value 3']);
    expect(result).toEqual([options[1], options[3]]);
  });

  it('should not call forceUpdate when option.selected already matches the desired state', () => {
    const host = document.createElement('p-multi-select');
    const options = [
      { value: 'a', selected: true },
      { value: 'b', selected: false },
    ] as unknown as MultiSelectOption[];
    // Both options already in their target state; calling with current values should be a no-op
    selectOptionsByValue(host, options, ['a']);
    expect(options[0].selected).toBe(true);
    expect(options[1].selected).toBe(false);
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
