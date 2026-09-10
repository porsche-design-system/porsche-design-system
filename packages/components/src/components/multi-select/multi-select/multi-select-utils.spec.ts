import { vi } from 'vitest';
import {
  getSelectedOptions,
  getSelectedOptionsString,
  type MultiSelectOption,
  resetSelectedOptions,
  selectOptionsByValue,
  setSelectedMultiSelectOption,
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
    const consoleWarnMock = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const options = generateMultiSelectOptions({ amount: 5, selectedIndices: [0, 2, 3] });
    const value1 = ['Value 1', 'Value 2'];

    selectOptionsByValue(options, value1);
    expect(options[0].selected).toBeFalsy();
    expect(options[1].selected).toBeTruthy();
    expect(options[2].selected).toBeTruthy();
    expect(options[3].selected).toBeFalsy();
    expect(options[4].selected).toBeFalsy();

    const value2 = ['Value 0', 'Value 4'];

    selectOptionsByValue(options, value2);
    expect(options[0].selected).toBeTruthy();
    expect(options[1].selected).toBeFalsy();
    expect(options[2].selected).toBeFalsy();
    expect(options[3].selected).toBeFalsy();
    expect(options[4].selected).toBeTruthy();

    const value3 = ['Value 2', '3', 'test'];

    selectOptionsByValue(options, value3);
    expect(options[0].selected).toBeFalsy();
    expect(options[1].selected).toBeFalsy();
    expect(options[2].selected).toBeTruthy();
    expect(options[3].selected).toBeFalsy();
    expect(options[4].selected).toBeFalsy();

    expect(consoleWarnMock).not.toHaveBeenCalled();
  });

  it.each([null, undefined])('should deselect all options when value is %p', (value) => {
    const options = generateMultiSelectOptions({ amount: 3, selectedIndices: [0, 2] });
    const result = selectOptionsByValue(options, value);
    expect(options[0].selected).toBe(false);
    expect(options[1].selected).toBe(false);
    expect(options[2].selected).toBe(false);
    expect(result).toEqual([]);
  });

  it('should deselect all options when value is empty array', () => {
    const options = generateMultiSelectOptions({ amount: 3, selectedIndices: [0, 2] });
    const result = selectOptionsByValue(options, []);
    expect(options[0].selected).toBe(false);
    expect(options[1].selected).toBe(false);
    expect(options[2].selected).toBe(false);
    expect(result).toEqual([]);
  });

  it('should match numeric values against numeric option.values (same type)', () => {
    const options = [
      { value: 1, selected: false },
      { value: 2, selected: false },
      { value: 3, selected: false },
    ] as unknown as MultiSelectOption[];
    const result = selectOptionsByValue(options, [1, 3]);
    expect(options[0].selected).toBe(true);
    expect(options[1].selected).toBe(false);
    expect(options[2].selected).toBe(true);
    expect(result).toEqual([options[0], options[2]]);
  });

  it('should match numeric option.value=0 against value=[0] (no falsy regression)', () => {
    const options = [{ value: 0, selected: false }] as unknown as MultiSelectOption[];
    selectOptionsByValue(options, [0]);
    expect(options[0].selected).toBe(true);
  });

  it('should NOT match numeric option.values against string host values (strict-typed)', () => {
    const consoleWarnMock = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const options = [
      { value: 1, selected: false },
      { value: 2, selected: false },
    ] as unknown as MultiSelectOption[];
    selectOptionsByValue(options, ['1', '2']);
    expect(options[0].selected).toBe(false);
    expect(options[1].selected).toBe(false);
    expect(consoleWarnMock).not.toHaveBeenCalled();
  });

  it('should NOT match string option.values against numeric host values (strict-typed)', () => {
    const consoleWarnMock = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const options = [
      { value: '1', selected: false },
      { value: '2', selected: false },
    ] as unknown as MultiSelectOption[];
    selectOptionsByValue(options, [1, 2]);
    expect(options[0].selected).toBe(false);
    expect(options[1].selected).toBe(false);
    expect(consoleWarnMock).not.toHaveBeenCalled();
  });

  it('should select matching options without warning about unmatched values', () => {
    const consoleWarnMock = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const options = [
      { value: 'a', selected: false },
      { value: 'b', selected: false },
    ] as unknown as MultiSelectOption[];
    selectOptionsByValue(options, ['a', 'missing']);
    expect(options[0].selected).toBe(true);
    expect(options[1].selected).toBe(false);
    expect(consoleWarnMock).not.toHaveBeenCalled();
  });

  it('should NOT warn when all values match (number[])', () => {
    const consoleWarnMock = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const options = [
      { value: 1, selected: false },
      { value: 2, selected: false },
    ] as unknown as MultiSelectOption[];
    selectOptionsByValue(options, [1, 2]);
    expect(consoleWarnMock).not.toHaveBeenCalled();
  });

  it.each<[string[] | number[] | null | undefined]>([[null], [undefined], [[]], [['']], [['missing']], [[0]]])(
    'should deselect without warning when value=%p has no matches',
    (value) => {
      const consoleWarnMock = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const options = generateMultiSelectOptions({ amount: 2, selectedIndices: [0] });
      expect(selectOptionsByValue(options, value)).toEqual([]);
      expect(options.every((option) => !option.selected)).toBe(true);
      expect(consoleWarnMock).not.toHaveBeenCalled();
    }
  );

  it('should match an empty-string option', () => {
    const options = [{ value: '', selected: false }] as MultiSelectOption[];
    expect(selectOptionsByValue(options, [''])).toEqual(options);
    expect(options[0].selected).toBe(true);
  });

  it('should return only currently selected options', () => {
    const options = generateMultiSelectOptions({ amount: 4 });
    const result = selectOptionsByValue(options, ['Value 1', 'Value 3']);
    expect(result).toEqual([options[1], options[3]]);
  });

  it('should not call forceUpdate when option.selected already matches the desired state', () => {
    const options = [
      { value: 'a', selected: true },
      { value: 'b', selected: false },
    ] as unknown as MultiSelectOption[];
    // Both options already in their target state; calling with current values should be a no-op
    selectOptionsByValue(options, ['a']);
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

describe('setSelectedMultiSelectOption()', () => {
  it('should select an unselected option', () => {
    const option = { selected: false } as MultiSelectOption;
    setSelectedMultiSelectOption(option);
    expect(option.selected).toBe(true);
  });

  it('should unselect an already-selected option', () => {
    const option = { selected: true } as MultiSelectOption;
    setSelectedMultiSelectOption(option);
    expect(option.selected).toBe(false);
  });
});
