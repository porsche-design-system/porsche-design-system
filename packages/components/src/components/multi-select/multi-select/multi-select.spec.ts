import { vi } from 'vitest';
import * as getShadowRootHTMLElementUtils from '../../../utils/dom/getShadowRootHTMLElement';
import { MultiSelect } from './multi-select';
import * as multiSelectUtils from './multi-select-utils';

class MockElementInternals {
  setValidity = vi.fn();
  setFormValue = vi.fn();
}

const initComponent = (): MultiSelect => {
  const component = new MultiSelect();
  component.host = document.createElement('p-multi-select');
  component.host.attachShadow({ mode: 'open' });
  component['internals'] = new MockElementInternals() as unknown as ElementInternals;

  component['inputSearchElement'] = document.createElement('p-input-search');
  component['inputSearchElement'].attachShadow({ mode: 'open' });
  component['inputSearchElement'].shadowRoot.appendChild(document.createElement('input'));
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
  it('should call setSelectedOptions() and setFormValue() with correct parameters', () => {
    const component = initComponent();
    const setSelectedOptionsSpy = vi.spyOn(multiSelectUtils, 'selectOptionsByValue');
    const setFormValueSpy = vi.spyOn(component['internals'], 'setFormValue' as any);
    const value = 'a';
    component.name = 'some-name';
    component.value = [value];
    const formData = new FormData();
    formData.append(component.name, value);

    component.componentWillLoad();
    expect(setSelectedOptionsSpy).toHaveBeenCalledWith(component.host, [], component.value);
    expect(setFormValueSpy).toHaveBeenCalledWith(formData);
  });
});

describe('componentDidLoad', () => {
  it('should call getShadowRootHTMLElement() with correct parameters and add event listener', () => {
    const component = initComponent();
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
  it('should call stopPropagation() and updateOptions() with correct parameters', () => {
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
    const defaultValue = ['default-value'];
    component['defaultValue'] = defaultValue;
    component.value = ['test'];
    component.name = 'name';
    const setFormValueSpy = vi.spyOn(component['internals'], 'setFormValue' as any);
    component.formResetCallback();
    component.onValueChange(); // simulate Stencil @Watch which doesn't fire in unit tests
    const formData = new FormData();
    defaultValue.forEach((val) => {
      formData.append(component.name, val);
    });
    expect(setFormValueSpy).toHaveBeenCalledWith(formData);
    expect(component.value).toBe(defaultValue);
  });
});

describe('setFormValue', () => {
  it('should call setFormValue with correct FormData', () => {
    const component = initComponent();
    const setFormValueSpy = vi.spyOn(component['internals'], 'setFormValue' as any);
    const value = ['a', 'b', 'c'];
    component.name = 'some-name';
    component.value = value;
    component.setFormValue();
    const formData = new FormData();
    value.forEach((val) => {
      formData.append(component.name, val);
    });
    expect(setFormValueSpy).toHaveBeenCalledWith(formData);
  });

  it('should call setFormValue with null when value is null', () => {
    const component = initComponent();
    const setFormValueSpy = vi.spyOn(component['internals'], 'setFormValue' as any);
    component.name = 'some-name';
    component.value = null;
    component.setFormValue();
    expect(setFormValueSpy).toHaveBeenCalledWith(null);
  });

  it('should call setFormValue with null when value is empty array', () => {
    const component = initComponent();
    const setFormValueSpy = vi.spyOn(component['internals'], 'setFormValue' as any);
    component.name = 'some-name';
    component.value = [];
    component.setFormValue();
    expect(setFormValueSpy).toHaveBeenCalledWith(null);
  });

  it('should stringify number values when serializing to FormData', () => {
    const component = initComponent();
    const setFormValueSpy = vi.spyOn(component['internals'], 'setFormValue' as any);
    component.name = 'some-name';
    component.value = [1, 2, 3];
    component.setFormValue();
    const formData = new FormData();
    ['1', '2', '3'].forEach((val) => {
      formData.append(component.name, val);
    });
    expect(setFormValueSpy).toHaveBeenCalledWith(formData);
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
    component.value = ['test'];
    const restoredValue = 'restored-value';
    const formData = new FormData();
    formData.append(component.name, restoredValue);
    component.formStateRestoreCallback(formData);
    expect(component.value).toStrictEqual([restoredValue]);
  });

  it('should restore values as string[] even if original value was number[] (native form limitation)', () => {
    const component = initComponent();
    component.name = 'some-name';
    component.value = [1, 2];
    const formData = new FormData();
    formData.append(component.name, '1');
    formData.append(component.name, '2');
    component.formStateRestoreCallback(formData);
    // FormData always serializes as strings; consumers using controlled forms keep the original number type
    expect(component.value).toStrictEqual(['1', '2']);
  });
});

describe('componentWillLoad value coercion', () => {
  it('should pass the FormData (stringified) value to setFormValue and the raw value to selectOptionsByValue', () => {
    const component = initComponent();
    component.name = 'some-name';
    component.value = [42, 7];
    const selectOptionsByValueSpy = vi.spyOn(multiSelectUtils, 'selectOptionsByValue');
    const setFormValueSpy = vi.spyOn(component['internals'], 'setFormValue' as any);

    component.componentWillLoad();

    const formData = new FormData();
    formData.append(component.name, '42');
    formData.append(component.name, '7');
    expect(setFormValueSpy).toHaveBeenCalledWith(formData);
    // strict-typed matching: pass raw values, not stringified
    expect(selectOptionsByValueSpy).toHaveBeenCalledWith(component.host, component['multiSelectOptions'], [42, 7]);
    // public value retains its original (number[]) type
    expect(component.value).toStrictEqual([42, 7]);
  });

  it('should pass null to setFormValue and null (raw) to selectOptionsByValue when value is null', () => {
    const component = initComponent();
    component.value = null;
    const selectOptionsByValueSpy = vi.spyOn(multiSelectUtils, 'selectOptionsByValue');
    const setFormValueSpy = vi.spyOn(component['internals'], 'setFormValue' as any);

    component.componentWillLoad();

    expect(setFormValueSpy).toHaveBeenCalledWith(null);
    // strict-typed matching: null is passed through; utils internally coalesces to []
    expect(selectOptionsByValueSpy).toHaveBeenCalledWith(component.host, component['multiSelectOptions'], null);
  });

  it('should preserve the original (non-normalized) value as defaultValue', () => {
    const component = initComponent();
    component.value = [42, 7];
    component.componentWillLoad();
    expect(component['defaultValue']).toStrictEqual([42, 7]);

    const component2 = initComponent();
    component2.value = null;
    component2.componentWillLoad();
    expect(component2['defaultValue']).toBeNull();
  });
});

describe('formResetCallback type preservation', () => {
  it('should restore a number[] defaultValue with its original type and stringify only for setFormValue', () => {
    const component = initComponent();
    component.name = 'some-name';
    component['defaultValue'] = [7, 8];
    component.value = ['something-else'];
    const setFormValueSpy = vi.spyOn(component['internals'], 'setFormValue' as any);

    component.formResetCallback();
    component.onValueChange(); // simulate Stencil @Watch which doesn't fire in unit tests

    // public value retains the original numeric type
    expect(component.value).toStrictEqual([7, 8]);
    expect(component['defaultValue']).toStrictEqual([7, 8]);
    // setFormValue is called with the normalized (string) form via FormData
    const formData = new FormData();
    formData.append(component.name, '7');
    formData.append(component.name, '8');
    expect(setFormValueSpy).toHaveBeenCalledWith(formData);
  });

  it('should restore a null defaultValue as null and pass null to setFormValue', () => {
    const component = initComponent();
    component['defaultValue'] = null;
    component.value = ['something-else'];
    const setFormValueSpy = vi.spyOn(component['internals'], 'setFormValue' as any);

    component.formResetCallback();
    component.onValueChange(); // simulate Stencil @Watch

    expect(component.value).toBeNull();
    expect(setFormValueSpy).toHaveBeenCalledWith(null);
  });

  it('should restore an empty defaultValue and pass null to setFormValue', () => {
    const component = initComponent();
    component['defaultValue'] = [];
    component.value = ['something-else'];
    const setFormValueSpy = vi.spyOn(component['internals'], 'setFormValue' as any);

    component.formResetCallback();
    component.onValueChange(); // simulate Stencil @Watch

    expect(component.value).toStrictEqual([]);
    expect(setFormValueSpy).toHaveBeenCalledWith(null);
  });
});

describe('emitUpdateEvent', () => {
  it('should emit the value with its original type (number[]) when value is number[]', () => {
    const component = initComponent();
    component.value = [0, 1];
    component.name = 'my-multi-select';
    const emitSpy = vi.fn();
    component.change = { emit: emitSpy } as any;

    component['emitUpdateEvent']();

    expect(emitSpy).toHaveBeenCalledWith({ value: [0, 1], name: 'my-multi-select' });
  });

  it('should emit the value with its original type (string[]) when value is string[]', () => {
    const component = initComponent();
    component.value = ['a', 'b'];
    component.name = 'my-multi-select';
    const emitSpy = vi.fn();
    component.change = { emit: emitSpy } as any;

    component['emitUpdateEvent']();

    expect(emitSpy).toHaveBeenCalledWith({ value: ['a', 'b'], name: 'my-multi-select' });
  });

  it('should emit an empty array when no options are selected', () => {
    const component = initComponent();
    component.value = [];
    component.name = 'my-multi-select';
    const emitSpy = vi.fn();
    component.change = { emit: emitSpy } as any;

    component['emitUpdateEvent']();

    expect(emitSpy).toHaveBeenCalledWith({ value: [], name: 'my-multi-select' });
  });
});

describe('updateSelectedOption value assignment', () => {
  it('should preserve numeric option.value (no string coercion) when adding to this.value', () => {
    const component = initComponent();
    component['multiSelectOptions'] = [];
    component.change = { emit: vi.fn() } as any;
    component.value = [1];
    const option = { value: 2, selected: false } as unknown as multiSelectUtils.MultiSelectOption;

    component['updateSelectedOption'](option);

    // setSelectedMultiSelectOption flips option.selected to true → branch adds it
    expect(component.value).toStrictEqual([1, 2]);
  });

  it('should preserve string option.value when adding to this.value', () => {
    const component = initComponent();
    component['multiSelectOptions'] = [];
    component.change = { emit: vi.fn() } as any;
    component.value = ['a'];
    const option = { value: 'b', selected: false } as unknown as multiSelectUtils.MultiSelectOption;

    component['updateSelectedOption'](option);

    expect(component.value).toStrictEqual(['a', 'b']);
  });

  it('should remove a numeric value from this.value (preserving number type) when deselecting', () => {
    const component = initComponent();
    component['multiSelectOptions'] = [];
    component.change = { emit: vi.fn() } as any;
    component.value = [1, 2, 3];
    const option = { value: 2, selected: true } as unknown as multiSelectUtils.MultiSelectOption;

    component['updateSelectedOption'](option);

    // setSelectedMultiSelectOption flips selected to false → branch removes it
    expect(component.value).toStrictEqual([1, 3]);
  });

  it('should be a no-op when called with undefined (e.g. no highlighted option)', () => {
    const component = initComponent();
    component['multiSelectOptions'] = [];
    component.change = { emit: vi.fn() } as any;
    component.value = [1, 2];

    component['updateSelectedOption'](undefined as unknown as multiSelectUtils.MultiSelectOption);

    expect(component.value).toStrictEqual([1, 2]);
  });
});
