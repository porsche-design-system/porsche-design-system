import { vi } from 'vitest';
import * as getShadowRootHTMLElementUtils from '../../../utils/dom/getShadowRootHTMLElement';
import { Select } from './select';
import * as selectUtils from './select-utils';

class MockElementInternals {
  setValidity = vi.fn();
  setFormValue = vi.fn();
}

const initComponent = (): Select => {
  const component = new Select();
  component.host = document.createElement('p-select');
  component.host.attachShadow({ mode: 'open' });
  component['internals'] = new MockElementInternals() as unknown as ElementInternals;
  return component;
};

describe('connectedCallback', () => {
  it('should add event listener', () => {
    const component = initComponent();
    const addEventListenerSpy = vi.spyOn(document, 'addEventListener');
    component.connectedCallback();
    expect(addEventListenerSpy).toHaveBeenCalledWith('mousedown', component['onClickOutside'], true);
  });
});

describe('componentWillLoad', () => {
  it('should call updateOptions(), selectOptionByValue() and setFormValue() with correct parameters', () => {
    const component = initComponent();
    const updateSelectOptionsSpy = vi.spyOn(selectUtils, 'selectOptionByValue');
    const setFormValueSpy = vi.spyOn(component['internals'], 'setFormValue' as any);

    component.componentWillLoad();
    expect(updateSelectOptionsSpy).toHaveBeenCalledWith(component.host, component['selectOptions'], component['value']);
    expect(setFormValueSpy).toHaveBeenCalledWith(component.value);
  });
});

describe('componentDidLoad', () => {
  it('should call getShadowRootHTMLElement() with correct parameters and add event listener)', () => {
    const component = initComponent();
    component.value = 'test';
    const slot = document.createElement('slot');
    const slotSpy = vi.spyOn(slot, 'addEventListener');
    const getShadowRootHTMLElementSpy = vi
      .spyOn(getShadowRootHTMLElementUtils, 'getShadowRootHTMLElement')
      .mockReturnValueOnce(slot);

    component.componentDidLoad();
    expect(getShadowRootHTMLElementSpy).toHaveBeenCalledWith(component.host, 'slot:not([name])');
    expect(slotSpy).toHaveBeenCalledTimes(1);
  });
});

describe('disconnectedCallback', () => {
  it('should remove event listener', () => {
    const component = initComponent();
    const spy = vi.spyOn(document, 'removeEventListener');
    component.disconnectedCallback();
    expect(spy).toHaveBeenCalledWith('mousedown', component['onClickOutside'], true);
  });
});

describe('optgroupUpdateHandler', () => {
  it('should call stopPropagation(), updateOptions() and syncSelectChildrenProps() with correct parameters', () => {
    const component = initComponent();
    const event = new Event('internalOptgroupUpdate', { bubbles: true });
    const stopPropagationSpy = vi.spyOn(event, 'stopPropagation');

    component.optgroupUpdateHandler(event);

    expect(stopPropagationSpy).toHaveBeenCalled();
  });
});

describe('formResetCallback', () => {
  it('should reset value to defaultValue', () => {
    const component = initComponent();
    const defaultValue = 'default-value';
    component['defaultValue'] = defaultValue;
    component.value = 'test';
    const setFormValueSpy = vi.spyOn(component['internals'], 'setFormValue' as any);
    component.formResetCallback();
    component.onValueChange(); // simulate Stencil @Watch which doesn't fire in unit tests
    expect(setFormValueSpy).toHaveBeenCalledWith(defaultValue);
    expect(component.value).toBe(defaultValue);
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
    component.value = 'test';
    const restoredValue = 'restored-value';
    component.formStateRestoreCallback(restoredValue);
    expect(component.value).toBe(restoredValue);
  });
});

describe('setFormValue', () => {
  it.each<[string | number | null | undefined, string | undefined]>([
    [undefined, undefined],
    [null, undefined],
    ['', ''],
    ['abc', 'abc'],
    [0, '0'],
    [42, '42'],
    [-1.5, '-1.5'],
  ])('should call internals.setFormValue with normalized value=%p as %p', (input, expected) => {
    const component = initComponent();
    component.value = input;
    const setFormValueSpy = vi.spyOn(component['internals'], 'setFormValue' as any);

    component.setFormValue();

    expect(setFormValueSpy).toHaveBeenCalledWith(expected);
  });

  it('should not throw when internals is undefined', () => {
    const component = initComponent();
    component['internals'] = undefined;
    component.value = 'foo';
    expect(() => component.setFormValue()).not.toThrow();
  });
});

describe('componentWillLoad value coercion', () => {
  it('should pass the normalized (string) value to setFormValue and the raw value to selectOptionByValue', () => {
    const component = initComponent();
    component.value = 42;
    const selectOptionByValueSpy = vi.spyOn(selectUtils, 'selectOptionByValue');
    const setFormValueSpy = vi.spyOn(component['internals'], 'setFormValue' as any);

    component.componentWillLoad();

    expect(setFormValueSpy).toHaveBeenCalledWith('42');
    // strict-typed matching: pass raw value, not stringified
    expect(selectOptionByValueSpy).toHaveBeenCalledWith(component.host, component['selectOptions'], 42);
    // public value retains its original (number) type
    expect(component.value).toBe(42);
  });

  it('should pass undefined to setFormValue and null (raw) to selectOptionByValue when value is null', () => {
    const component = initComponent();
    component.value = null;
    const selectOptionByValueSpy = vi.spyOn(selectUtils, 'selectOptionByValue');
    const setFormValueSpy = vi.spyOn(component['internals'], 'setFormValue' as any);

    component.componentWillLoad();

    expect(setFormValueSpy).toHaveBeenCalledWith(undefined);
    // strict-typed matching: null is a distinct value, only matches options with value === null
    expect(selectOptionByValueSpy).toHaveBeenCalledWith(component.host, component['selectOptions'], null);
  });

  it('should preserve the original (non-normalized) value as defaultValue', () => {
    const component = initComponent();
    component.value = 42;
    component.componentWillLoad();
    expect(component['defaultValue']).toBe(42);

    const component2 = initComponent();
    component2.value = null;
    component2.componentWillLoad();
    expect(component2['defaultValue']).toBeNull();
  });
});

describe('formResetCallback type preservation', () => {
  it('should restore a numeric defaultValue with its original type and stringify only for setFormValue', () => {
    const component = initComponent();
    component['defaultValue'] = 7;
    component.value = 'something-else';
    const setFormValueSpy = vi.spyOn(component['internals'], 'setFormValue' as any);

    component.formResetCallback();
    component.onValueChange(); // simulate Stencil @Watch

    // public value retains the original numeric type
    expect(component.value).toBe(7);
    expect(component['defaultValue']).toBe(7);
    // setFormValue is called with the normalized (string) form
    expect(setFormValueSpy).toHaveBeenCalledWith('7');
  });

  it('should restore a null defaultValue as null and pass undefined to setFormValue', () => {
    const component = initComponent();
    component['defaultValue'] = null;
    component.value = 'something-else';
    const setFormValueSpy = vi.spyOn(component['internals'], 'setFormValue' as any);

    component.formResetCallback();
    component.onValueChange(); // simulate Stencil @Watch

    expect(component.value).toBeNull();
    expect(setFormValueSpy).toHaveBeenCalledWith(undefined);
  });

  it('should restore an undefined defaultValue as undefined', () => {
    const component = initComponent();
    component['defaultValue'] = undefined;
    component.value = 'something-else';
    const setFormValueSpy = vi.spyOn(component['internals'], 'setFormValue' as any);

    component.formResetCallback();
    component.onValueChange(); // simulate Stencil @Watch

    expect(component.value).toBeUndefined();
    expect(setFormValueSpy).toHaveBeenCalledWith(undefined);
  });
});

describe('emitUpdateEvent', () => {
  it('should emit the value with its original type (number) when selectedOption value is number', () => {
    const component = initComponent();
    component['selectedOption'] = { value: 0 } as unknown as selectUtils.SelectOption;
    component.name = 'my-select';
    const emitSpy = vi.fn();
    component.change = { emit: emitSpy } as any;

    component['emitUpdateEvent']();

    expect(emitSpy).toHaveBeenCalledWith({ value: 0, name: 'my-select' });
  });

  it('should emit the value with its original type (string) when selectedOption value is string', () => {
    const component = initComponent();
    component['selectedOption'] = { value: 'a' } as unknown as selectUtils.SelectOption;
    component.name = 'my-select';
    const emitSpy = vi.fn();
    component.change = { emit: emitSpy } as any;

    component['emitUpdateEvent']();

    expect(emitSpy).toHaveBeenCalledWith({ value: 'a', name: 'my-select' });
  });

  it('should emit undefined when there is no selectedOption', () => {
    const component = initComponent();
    component['selectedOption'] = undefined;
    component.name = 'my-select';
    const emitSpy = vi.fn();
    component.change = { emit: emitSpy } as any;

    component['emitUpdateEvent']();

    expect(emitSpy).toHaveBeenCalledWith({ value: undefined, name: 'my-select' });
  });

  it('should emit undefined when selectedOption.value is undefined', () => {
    const component = initComponent();
    component['selectedOption'] = { value: undefined } as unknown as selectUtils.SelectOption;
    component.name = 'my-select';
    const emitSpy = vi.fn();
    component.change = { emit: emitSpy } as any;

    component['emitUpdateEvent']();

    expect(emitSpy).toHaveBeenCalledWith({ value: undefined, name: 'my-select' });
  });
});

describe('updateSelectedOption value assignment', () => {
  it('should preserve a numeric option.value (no string coercion) when assigning to this.value', () => {
    const component = initComponent();
    component['selectOptions'] = [];
    component.change = { emit: vi.fn() } as any;
    const option = { value: 42, selected: false } as unknown as selectUtils.SelectOption;
    component['buttonElement'] = { focus: vi.fn() } as unknown as HTMLButtonElement;

    component['updateSelectedOption'](option);

    expect(component.value).toBe(42);
  });

  it('should preserve a string option.value when assigning to this.value', () => {
    const component = initComponent();
    component['selectOptions'] = [];
    component.change = { emit: vi.fn() } as any;
    const option = { value: 'a', selected: false } as unknown as selectUtils.SelectOption;
    component['buttonElement'] = { focus: vi.fn() } as unknown as HTMLButtonElement;

    component['updateSelectedOption'](option);

    expect(component.value).toBe('a');
  });

  it('should assign undefined when option.value is undefined', () => {
    const component = initComponent();
    component['selectOptions'] = [];
    component.change = { emit: vi.fn() } as any;
    const option = { value: undefined, selected: false } as unknown as selectUtils.SelectOption;
    component['buttonElement'] = { focus: vi.fn() } as unknown as HTMLButtonElement;

    component['updateSelectedOption'](option);

    expect(component.value).toBeUndefined();
  });
});
