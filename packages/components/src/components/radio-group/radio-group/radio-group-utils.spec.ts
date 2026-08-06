import * as stencilCore from '@stencil/core';
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

type OptionInit = {
  value: string | number | undefined;
  selected?: boolean;
  disabled?: boolean;
};

const createOptions = (inits: OptionInit[]): RadioGroupOption[] =>
  inits.map(
    ({ value, selected = false, disabled = false }) =>
      ({
        value,
        selected,
        disabled,
      }) as unknown as RadioGroupOption
  );

const makeOptions = (specs: Partial<RadioGroupOption>[]): RadioGroupOption[] =>
  specs.map((spec) => ({ selected: false, disabled: false, loading: false, value: '', ...spec }) as RadioGroupOption);

describe('updateRadioGroupOptions()', () => {
  it('should select the option matching a string value', () => {
    const options = createOptions([{ value: 'a' }, { value: 'b' }, { value: 'c' }]);
    const forceUpdateSpy = vi.spyOn(stencilCore, 'forceUpdate');
    const consoleWarnSpy = vi.spyOn(loggerUtils, 'consoleWarn');

    updateRadioGroupOptions(options, 'b');

    expect(options[0].selected).toBe(false);
    expect(options[1].selected).toBe(true);
    expect(options[2].selected).toBe(false);
    expect(forceUpdateSpy).toHaveBeenCalledWith(options[1]);
    expect(consoleWarnSpy).not.toHaveBeenCalled();
  });

  it('should select the option matching a number value', () => {
    const options = createOptions([{ value: 1 }, { value: 2 }, { value: 3 }]);
    const forceUpdateSpy = vi.spyOn(stencilCore, 'forceUpdate');
    const consoleWarnSpy = vi.spyOn(loggerUtils, 'consoleWarn');

    updateRadioGroupOptions(options, 2);

    expect(options[0].selected).toBe(false);
    expect(options[1].selected).toBe(true);
    expect(options[2].selected).toBe(false);
    expect(forceUpdateSpy).toHaveBeenCalledWith(options[1]);
    expect(consoleWarnSpy).not.toHaveBeenCalled();
  });

  it('should not match a number option when the provided value is a string of the same numeric content', () => {
    const options = createOptions([{ value: 1 }, { value: 2 }]);
    const consoleWarnSpy = vi.spyOn(loggerUtils, 'consoleWarn');

    updateRadioGroupOptions(options, '2');

    expect(options.every((option) => !option.selected)).toBe(true);
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'The provided value is not included in the options of the radio group:',
      '2'
    );
  });

  it('should not match a string option when the provided value is a number of the same numeric content', () => {
    const options = createOptions([{ value: '1' }, { value: '2' }]);
    const consoleWarnSpy = vi.spyOn(loggerUtils, 'consoleWarn');

    updateRadioGroupOptions(options, 2);

    expect(options.every((option) => !option.selected)).toBe(true);
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'The provided value is not included in the options of the radio group:',
      '2'
    );
  });

  it('should reset previously selected option without warning when value is null', () => {
    const options = createOptions([{ value: 'a', selected: true }, { value: 'b' }]);
    const consoleWarnSpy = vi.spyOn(loggerUtils, 'consoleWarn');

    updateRadioGroupOptions(options, null);

    options.forEach((option) => {
      expect(option.selected).toBe(false);
    });
    expect(consoleWarnSpy).not.toHaveBeenCalled();
  });

  it('should reset previously selected option without warning when value is undefined', () => {
    const options = createOptions([{ value: 'a' }, { value: 'b', selected: true }]);
    const consoleWarnSpy = vi.spyOn(loggerUtils, 'consoleWarn');

    updateRadioGroupOptions(options, undefined);

    options.forEach((option) => {
      expect(option.selected).toBe(false);
    });
    expect(consoleWarnSpy).not.toHaveBeenCalled();
  });

  it('should warn when value does not match any option', () => {
    const options = createOptions([{ value: 'a' }, { value: 'b' }]);
    const consoleWarnSpy = vi.spyOn(loggerUtils, 'consoleWarn');

    updateRadioGroupOptions(options, 'unknown');

    options.forEach((option) => {
      expect(option.selected).toBe(false);
    });
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'The provided value is not included in the options of the radio group:',
      'unknown'
    );
  });

  it('should deselect the previously selected option when switching to a new matching value', () => {
    const options = createOptions([{ value: 'a', selected: true }, { value: 'b' }]);
    const consoleWarnSpy = vi.spyOn(loggerUtils, 'consoleWarn');

    updateRadioGroupOptions(options, 'b');

    expect(options[0].selected).toBe(false);
    expect(options[1].selected).toBe(true);
    expect(consoleWarnSpy).not.toHaveBeenCalled();
  });
});

describe('resetSelectedRadioGroupOption()', () => {
  it('should reset the currently selected option and call forceUpdate', () => {
    const options = createOptions([{ value: 'a' }, { value: 'b', selected: true }]);
    const forceUpdateSpy = vi.spyOn(stencilCore, 'forceUpdate');

    resetSelectedRadioGroupOption(options);

    expect(options[1].selected).toBe(false);
    expect(forceUpdateSpy).toHaveBeenCalledWith(options[1]);
  });

  it('should not call forceUpdate when no option is selected', () => {
    const options = createOptions([{ value: 'a' }, { value: 'b' }]);
    const forceUpdateSpy = vi.spyOn(stencilCore, 'forceUpdate');

    resetSelectedRadioGroupOption(options);

    expect(forceUpdateSpy).not.toHaveBeenCalled();
  });
});

describe('setSelectedRadioGroupOption()', () => {
  it('should select the given option, reset others and call forceUpdate', () => {
    const options = createOptions([{ value: 'a', selected: true }, { value: 'b' }, { value: 'c' }]);
    const forceUpdateSpy = vi.spyOn(stencilCore, 'forceUpdate');

    setSelectedRadioGroupOption(options, options[2]);

    expect(options[0].selected).toBe(false);
    expect(options[1].selected).toBe(false);
    expect(options[2].selected).toBe(true);
    expect(forceUpdateSpy).toHaveBeenCalledWith(options[2]);
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
      const element = document.createElement('p-radio-group-option');
      element.tabIndex = 0;
      document.body.appendChild(element);
      return element;
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
    [[{}, {}, {}], 0, 1, 1],
    [[{}, {}, {}], 0, -1, 2],
    [[{}, { disabled: true }, {}], 0, 1, 2],
    [[{}, { loading: true }, {}], 0, 1, 2],
    [[{}, { disabled: true }, { disabled: true }], 0, 1, 0],
    [[{ disabled: true }, { disabled: true }, { disabled: true }], 1, 1, 1],
  ])('should find the next enabled index for %j start=%s step=%s -> %s', (specs, start, step, expected) => {
    expect(findNextEnabledIndex(makeOptions(specs), start, step)).toBe(expected);
  });
});
