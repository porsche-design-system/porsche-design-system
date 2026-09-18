import { vi } from 'vitest';
import { PinCode } from './pin-code';
import * as pinCodeUtils from './pin-code-utils';

class MockElementInternals {
  setValidity = vi.fn();
  setFormValue = vi.fn();
}

const initComponent = (): PinCode => {
  const component = new PinCode();
  component.host = document.createElement('p-pin-code');
  component.host.attachShadow({ mode: 'open' });
  component['internals'] = new MockElementInternals() as unknown as ElementInternals;

  return component;
};

describe('connectedCallback()', () => {
  it('should assign this.initialLoading to value of this.loading', () => {
    const component = initComponent();
    component.loading = true;

    expect(component['initialLoading']).toBe(false);
    component.connectedCallback();
    expect(component['initialLoading']).toBe(true);

    component.loading = false;
    component.connectedCallback();
    expect(component['initialLoading']).toBe(false);
  });
});

describe('componentWillUpdate()', () => {
  it('should assign this.initialLoading to true for this.loading = true', () => {
    const component = initComponent();
    component.loading = true;

    expect(component['initialLoading']).toBe(false);
    component.componentWillUpdate();
    expect(component['initialLoading']).toBe(true);
  });
});

describe('componentWillLoad', () => {
  it('should call getSanitisedValue() with correct parameters', () => {
    const component = initComponent();
    const spy = vi.spyOn(pinCodeUtils, 'getSanitisedValue');
    const value = '3333';
    component.value = value;
    component.componentWillLoad();

    expect(spy).toHaveBeenCalledWith(component.host, component.value, component.length);
    expect(component['defaultValue']).toBe(value);
  });

  it('should coerce numeric value to string when calling getSanitisedValue() and store coerced value as defaultValue', () => {
    const component = initComponent();
    const spy = vi.spyOn(pinCodeUtils, 'getSanitisedValue');
    component.value = 3333;
    component.componentWillLoad();

    expect(spy).toHaveBeenCalledWith(component.host, '3333', component.length);
    expect(component.value).toBe('3333');
    expect(component['defaultValue']).toBe('3333');
  });

  it('should not call getSanitisedValue() and preserve null as value and defaultValue when value is null', () => {
    const component = initComponent();
    const spy = vi.spyOn(pinCodeUtils, 'getSanitisedValue');
    component.value = null;
    component.componentWillLoad();

    expect(spy).not.toHaveBeenCalled();
    expect(component.value).toBeNull();
    expect(component['defaultValue']).toBeNull();
  });

  it('should not call getSanitisedValue() and preserve undefined as value and defaultValue when value is undefined', () => {
    const component = initComponent();
    const spy = vi.spyOn(pinCodeUtils, 'getSanitisedValue');
    component.value = undefined;
    component.componentWillLoad();

    expect(spy).not.toHaveBeenCalled();
    expect(component.value).toBeUndefined();
    expect(component['defaultValue']).toBeUndefined();
  });

  it('should assign this.initialLoading to value of this.loading', () => {
    const component = initComponent();
    component.loading = true;

    expect(component['initialLoading']).toBe(false);
    component.componentWillLoad();
    expect(component['initialLoading']).toBe(true);

    component.loading = false;
    component.componentWillLoad();
    expect(component['initialLoading']).toBe(false);
  });
});
describe('componentDidLoad', () => {
  it('should call setFormValue with correct value', () => {
    const component = initComponent();
    component.value = '1234';
    const setFormValueSpy = vi.spyOn(component['internals'], 'setFormValue' as any);
    component.componentDidLoad();
    expect(setFormValueSpy).toHaveBeenCalledWith(component.value);
  });

  it('should call setFormValue with stringified value when value is a number', () => {
    const component = initComponent();
    component.value = 1234;
    const setFormValueSpy = vi.spyOn(component['internals'], 'setFormValue' as any);
    component.componentDidLoad();
    expect(setFormValueSpy).toHaveBeenCalledWith('1234');
  });

  it('should call setFormValue with empty string when value is null', () => {
    const component = initComponent();
    component.value = null;
    const setFormValueSpy = vi.spyOn(component['internals'], 'setFormValue' as any);
    component.componentDidLoad();
    expect(setFormValueSpy).toHaveBeenCalledWith('');
  });

  it('should call setFormValue with empty string when value is undefined', () => {
    const component = initComponent();
    component.value = undefined;
    const setFormValueSpy = vi.spyOn(component['internals'], 'setFormValue' as any);
    component.componentDidLoad();
    expect(setFormValueSpy).toHaveBeenCalledWith('');
  });
});
describe('formResetCallback', () => {
  it('should reset value to defaultValue', () => {
    const component = initComponent();
    const defaultValue = '1234';
    component['defaultValue'] = defaultValue;
    component.value = 'test';
    const setFormValueSpy = vi.spyOn(component['internals'], 'setFormValue' as any);
    component.formResetCallback();
    expect(setFormValueSpy).toHaveBeenCalledWith(defaultValue);
    expect(component.value).toBe(defaultValue);
  });

  it('should reset value to numeric defaultValue and pass stringified value to setFormValue', () => {
    const component = initComponent();
    component['defaultValue'] = 1234;
    component.value = '5678';
    const setFormValueSpy = vi.spyOn(component['internals'], 'setFormValue' as any);
    component.formResetCallback();
    expect(setFormValueSpy).toHaveBeenCalledWith('1234');
    expect(component.value).toBe(1234);
  });

  it('should reset value to null defaultValue and pass empty string to setFormValue', () => {
    const component = initComponent();
    component['defaultValue'] = null;
    component.value = '5678';
    const setFormValueSpy = vi.spyOn(component['internals'], 'setFormValue' as any);
    component.formResetCallback();
    expect(setFormValueSpy).toHaveBeenCalledWith('');
    expect(component.value).toBe(null);
  });

  it('should reset value to undefined defaultValue and pass empty string to setFormValue', () => {
    const component = initComponent();
    component['defaultValue'] = undefined;
    component.value = '5678';
    const setFormValueSpy = vi.spyOn(component['internals'], 'setFormValue' as any);
    component.formResetCallback();
    expect(setFormValueSpy).toHaveBeenCalledWith('');
    expect(component.value).toBe(undefined);
  });
});
describe('formDisabledCallback', () => {
  it('should set disabled to true when called with true', () => {
    const component = initComponent();
    component.disabled = false;
    component.formDisabledCallback(true);
    expect(component.disabled).toBe(true);
  });
});
describe('formStateRestoreCallback', () => {
  it('should restore value', () => {
    const component = initComponent();
    component.value = '1234';
    const restoredValue = 'restored-value';
    component.formStateRestoreCallback(restoredValue);
    expect(component.value).toBe(restoredValue);
  });
});

describe('onPaste()', () => {
  it('should not emit a change when pasted text matches a numeric value', () => {
    const component = initComponent();
    const emitSpy = vi.fn();
    const setFormValueSpy = vi.spyOn(component['internals'], 'setFormValue' as any);
    const preventDefaultSpy = vi.fn();
    component.value = 1234;
    component.change = { emit: emitSpy };

    component['onPaste']({
      clipboardData: { getData: vi.fn().mockReturnValue('1234') },
      preventDefault: preventDefaultSpy,
    } as unknown as ClipboardEvent);

    expect(component.value).toBe(1234);
    expect(emitSpy).not.toHaveBeenCalled();
    expect(setFormValueSpy).not.toHaveBeenCalled();
    expect(preventDefaultSpy).toHaveBeenCalled();
  });
});

describe('updateValue()', () => {
  it('should call change.emit() with correct parameters and call setFormValue()', () => {
    const component = initComponent();
    const newValue = '1234';
    const emitSpy = vi.fn();
    const setFormValueSpy = vi.spyOn(component['internals'], 'setFormValue' as any);

    component.change = { emit: emitSpy };

    // @ts-expect-error
    component.updateValue(newValue);

    expect(emitSpy).toHaveBeenCalledWith({ value: newValue, isComplete: true });
    expect(setFormValueSpy).toHaveBeenCalledWith(newValue);
  });
});

describe('parsedValue (getter)', () => {
  it.each<[string | number | null | undefined, string]>([
    ['1234', '1234'],
    ['', ''],
    [1234, '1234'],
    [0, '0'],
    [null, ''],
    [undefined, ''],
  ])('should coerce value: %s to string: %s', (value, expected) => {
    const component = initComponent();
    component.value = value;
    expect(component['parsedValue']).toBe(expected);
  });
});

const createLinkedInputs = (values: string[]): HTMLInputElement[] => {
  const wrapper = document.createElement('div');
  const inputs = values.map((value) => {
    const input = document.createElement('input');
    input.value = value;
    wrapper.append(input);
    return input;
  });
  return inputs;
};

const createBeforeInputEvent = ({
  data,
  inputType = 'insertText',
  target,
}: {
  data?: string | null;
  inputType?: string;
  target: HTMLInputElement;
}) => ({
  data,
  inputType,
  target,
  preventDefault: vi.fn(),
});

describe('onBeforeInput()', () => {
  it('should preventDefault when loading', () => {
    const component = initComponent();
    component.loading = true;
    const [target] = createLinkedInputs(['']);
    const event = createBeforeInputEvent({ data: '1', target });

    component['onBeforeInput'](event as any);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(target.value).toBe('');
  });

  it('should preventDefault for non-digit input', () => {
    const component = initComponent();
    const [target] = createLinkedInputs(['']);
    const event = createBeforeInputEvent({ data: 'a', target });

    component['onBeforeInput'](event as any);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(target.value).toBe('');
  });

  it('should not preventDefault when inserting a digit into an empty input', () => {
    const component = initComponent();
    const [target] = createLinkedInputs(['']);
    const event = createBeforeInputEvent({ data: '1', target });

    component['onBeforeInput'](event as any);

    expect(event.preventDefault).not.toHaveBeenCalled();
    expect(target.value).toBe('');
  });

  it('should overwrite occupied input with a single digit and focus the next input', () => {
    const component = initComponent();
    const emitSpy = vi.fn();
    component.change = { emit: emitSpy };
    const [target, next] = createLinkedInputs(['1', '']);
    const nextFocusSpy = vi.spyOn(next, 'focus');
    component['inputElements'] = [target, next];
    const event = createBeforeInputEvent({ data: '9', target });

    component['onBeforeInput'](event as any);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(target.value).toBe('9');
    expect(emitSpy).toHaveBeenCalledWith({ value: '9 ', isComplete: false });
    expect(nextFocusSpy).toHaveBeenCalled();
  });

  it('should overwrite last occupied input with a single digit and select it', () => {
    const component = initComponent();
    component.length = 2;
    const emitSpy = vi.fn();
    component.change = { emit: emitSpy };
    const [previous, target] = createLinkedInputs(['1', '2']);
    const selectSpy = vi.spyOn(target, 'select');
    component['inputElements'] = [previous, target];
    const event = createBeforeInputEvent({ data: '9', target });

    component['onBeforeInput'](event as any);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(target.value).toBe('9');
    expect(emitSpy).toHaveBeenCalledWith({ value: '19', isComplete: true });
    expect(selectSpy).toHaveBeenCalled();
  });

  it('should preventDefault for multi-character insertText into an occupied input', () => {
    const component = initComponent();
    const emitSpy = vi.fn();
    component.change = { emit: emitSpy };
    const [target] = createLinkedInputs(['1']);
    component['inputElements'] = [target];
    const event = createBeforeInputEvent({ data: '23', target });

    component['onBeforeInput'](event as any);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(target.value).toBe('1');
    expect(emitSpy).not.toHaveBeenCalled();
  });
});
