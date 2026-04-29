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
