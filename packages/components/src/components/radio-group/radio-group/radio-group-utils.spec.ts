import { vi } from 'vitest';
import * as loggerUtils from '../../../utils/log/logger';
import {
  findNextEnabledIndex,
  getActiveOptionIndex,
  getCheckedOptionIndex,
  getFirstEnabledOptionIndex,
  type RadioGroupOption,
  resetSelectedRadioGroupOption,
  setSelectedRadioGroupOption,
  syncRadioGroupChildrenProps,
  updateRadioGroupOptions,
} from './radio-group-utils';

const makeOptions = (specs: Partial<RadioGroupOption>[]): RadioGroupOption[] =>
  specs.map((s) => ({ selected: false, disabled: false, loading: false, value: '', ...s }) as RadioGroupOption);

describe('resetSelectedRadioGroupOption()', () => {
  it('should unselect the currently selected option', () => {
    const options = makeOptions([{ selected: false }, { selected: true }, { selected: false }]);
    resetSelectedRadioGroupOption(options);
    expect(options.map((o) => o.selected)).toEqual([false, false, false]);
  });

  it('should do nothing when no option is selected', () => {
    const options = makeOptions([{ selected: false }, { selected: false }]);
    resetSelectedRadioGroupOption(options);
    expect(options.map((o) => o.selected)).toEqual([false, false]);
  });
});

describe('updateRadioGroupOptions()', () => {
  it('should select the option matching the value and unselect others', () => {
    const options = makeOptions([{ value: 'a', selected: true }, { value: 'b' }, { value: 'c' }]);
    updateRadioGroupOptions(options, 'b');
    expect(options.map((o) => o.selected)).toEqual([false, true, false]);
  });

  it('should warn when the value matches no option and value is not empty', () => {
    const consoleWarnSpy = vi.spyOn(loggerUtils, 'consoleWarn').mockImplementation(() => {});
    const options = makeOptions([{ value: 'a' }, { value: 'b' }]);
    updateRadioGroupOptions(options, 'zzz');
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'The provided value is not included in the options of the radio group:',
      'zzz'
    );
    expect(options.map((o) => o.selected)).toEqual([false, false]);
  });

  it('should not warn when the value is an empty string', () => {
    const consoleWarnSpy = vi.spyOn(loggerUtils, 'consoleWarn').mockImplementation(() => {});
    const options = makeOptions([{ value: 'a', selected: true }, { value: 'b' }]);
    updateRadioGroupOptions(options, '');
    expect(consoleWarnSpy).not.toHaveBeenCalled();
    expect(options.map((o) => o.selected)).toEqual([false, false]);
  });
});

describe('setSelectedRadioGroupOption()', () => {
  it('should select the given option and unselect the previously selected one', () => {
    const options = makeOptions([{ selected: true }, { selected: false }, { selected: false }]);
    setSelectedRadioGroupOption(options, options[2]);
    expect(options.map((o) => o.selected)).toEqual([false, false, true]);
  });
});

describe('syncRadioGroupChildrenProps()', () => {
  it('should copy parent state onto every child', () => {
    const children = makeOptions([{}, {}]);
    syncRadioGroupChildrenProps(children, true, true, 'error', 'my-group');
    for (const child of children) {
      expect(child.disabledParent).toBe(true);
      expect(child.loadingParent).toBe(true);
      expect(child.state).toBe('error');
      expect(child.name).toBe('my-group');
    }
  });
});

describe('getActiveOptionIndex()', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should return the index of the focused option', () => {
    const options = Array.from({ length: 3 }, () => {
      const el = document.createElement('p-radio-group-option');
      el.tabIndex = 0;
      document.body.appendChild(el);
      return el;
    });
    options[1].focus();
    expect(getActiveOptionIndex(options)).toBe(1);
  });

  it('should return -1 when no option is focused', () => {
    const options = Array.from({ length: 2 }, () => document.createElement('p-radio-group-option'));
    expect(getActiveOptionIndex(options)).toBe(-1);
  });
});

describe('getCheckedOptionIndex()', () => {
  it.each<[Partial<RadioGroupOption>[], number]>([
    [[{ selected: false }, { selected: true }], 1],
    [[{ selected: true, disabled: true }, { selected: true }], 1],
    [[{ selected: false }, { selected: false }], -1],
  ])('should return the first enabled selected index for %j -> %s', (specs, expected) => {
    expect(getCheckedOptionIndex(makeOptions(specs))).toBe(expected);
  });
});

describe('getFirstEnabledOptionIndex()', () => {
  it.each<[Partial<RadioGroupOption>[], number]>([
    [[{ disabled: false }, { disabled: false }], 0],
    [[{ disabled: true }, { disabled: false }], 1],
    [[{ disabled: true }, { disabled: true }], -1],
  ])('should return the first non-disabled index for %j -> %s', (specs, expected) => {
    expect(getFirstEnabledOptionIndex(makeOptions(specs))).toBe(expected);
  });
});

describe('findNextEnabledIndex()', () => {
  it.each<[Partial<RadioGroupOption>[], number, number, number]>([
    [[{}, {}, {}], 0, 1, 1], // step forward
    [[{}, {}, {}], 0, -1, 2], // step backward wraps
    [[{}, { disabled: true }, {}], 0, 1, 2], // skip disabled
    [[{}, { loading: true }, {}], 0, 1, 2], // skip loading
    [[{}, { disabled: true }, { disabled: true }], 0, 1, 0], // wraps fully back to enabled startIndex
    [[{ disabled: true }, { disabled: true }, { disabled: true }], 1, 1, 1], // all options disabled -> returns startIndex
  ])('should find the next enabled index for %j start=%s step=%s -> %s', (specs, start, step, expected) => {
    expect(findNextEnabledIndex(makeOptions(specs), start, step)).toBe(expected);
  });
});
