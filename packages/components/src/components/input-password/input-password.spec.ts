import { vi } from 'vitest';
import * as implicitSubmitUtils from '../../utils/form/implicitSubmit';
import { InputPassword } from './input-password';

class MockElementInternals {
  setValidity = vi.fn();
  setFormValue = vi.fn();
}

let mockEmit: ReturnType<typeof vi.fn>;

const initComponent = (): InputPassword => {
  const component = new InputPassword();
  component.host = document.createElement('p-input-password');
  component.host.attachShadow({ mode: 'open' });
  const input = document.createElement('input');
  component.host.shadowRoot.appendChild(input);
  component['inputElement'] = input;
  component['internals'] = new MockElementInternals() as unknown as ElementInternals;

  mockEmit = vi.fn();

  // Mock the emit methods
  component.change = { emit: mockEmit } as any;
  component.blur = { emit: mockEmit } as any;
  component.input = { emit: mockEmit } as any;
  return component;
};

describe('formResetCallback', () => {
  it('should reset value to defaultValue', () => {
    const component = initComponent();
    const defaultValue = 'default-value';
    component['defaultValue'] = defaultValue;
    component.value = 'test';
    component.formResetCallback();
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
describe('componentDidLoad', () => {
  it('should call setFormValue with current value', () => {
    const component = initComponent();
    component.value = 'test';
    const setFormValueSpy = vi.spyOn(component['internals'], 'setFormValue' as any);
    component.componentDidLoad();
    expect(setFormValueSpy).toHaveBeenCalledWith(component.value);
  });
});
describe('onChange', () => {
  it('should emit change event on onChange', () => {
    const component = initComponent();
    const event = {
      stopPropagation: vi.fn(),
      stopImmediatePropagation: vi.fn(),
    } as unknown as Event;

    component['onChange'](event);

    expect(mockEmit).toHaveBeenCalledWith(event);
  });
});
describe('onBlur', () => {
  it('should stop propagation and emit blur event on onBlur', () => {
    const component = initComponent();
    const event = {
      stopPropagation: vi.fn(),
      stopImmediatePropagation: vi.fn(),
    } as unknown as Event;

    component['onBlur'](event);

    expect(event.stopPropagation).toHaveBeenCalled();
    expect(event.stopImmediatePropagation).toHaveBeenCalled();
    expect(mockEmit).toHaveBeenCalledWith(event);
  });
});
describe('onInput', () => {
  it('should stop propagation and emit input event on onInput', () => {
    const component = initComponent();
    const testValue = 'test';
    const event = {
      stopPropagation: vi.fn(),
      stopImmediatePropagation: vi.fn(),
      target: {
        value: testValue,
      },
    } as unknown as InputEvent;

    component['onInput'](event);

    expect(event.stopPropagation).toHaveBeenCalled();
    expect(event.stopImmediatePropagation).toHaveBeenCalled();
    expect(mockEmit).toHaveBeenCalledWith(event);
    expect(component.value).toBe(testValue);
  });
});

describe('onKeyDown', () => {
  it('should call implicitSubmit with correct parameters', () => {
    const component = initComponent();
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    const implicitSubmitSpy = vi.spyOn(implicitSubmitUtils, 'implicitSubmit');
    component['onKeyDown'](event);
    expect(implicitSubmitSpy).toHaveBeenCalledWith(event, component['internals'], component.host);
  });
});

describe('componentDidRender', () => {
  it('should call ElementInternals setValidity()', () => {
    const component = initComponent();
    const setValiditySpy = vi.spyOn(component['internals'], 'setValidity' as any);
    component.componentDidRender();
    expect(setValiditySpy).toHaveBeenCalledTimes(1);
    expect(setValiditySpy).toHaveBeenCalledWith(
      component['inputElement'].validity,
      component['inputElement'].validationMessage || ' ',
      component['inputElement']
    );
  });
});
describe('connectedCallback', () => {
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
describe('componentWillUpdate', () => {
  it('should assign this.initialLoading to true for this.loading = true', () => {
    const component = initComponent();
    component.loading = true;

    expect(component['initialLoading']).toBe(false);
    component.componentWillUpdate();
    expect(component['initialLoading']).toBe(true);
  });
});
describe('componentWillLoad', () => {
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

  it("should not mutate value when null is passed, but should preserve null as defaultValue", () => {
    const component = initComponent();
    component.value = null;
    component.componentWillLoad();

    expect(component.value).toBeNull();
    expect(component['defaultValue']).toBeNull();
  });

  it('should keep an existing string value untouched and store it as defaultValue', () => {
    const component = initComponent();
    component.value = 's3cret';
    component.componentWillLoad();

    expect(component.value).toBe('s3cret');
    expect(component['defaultValue']).toBe('s3cret');
  });
});

describe('onValueChange (coercion to string)', () => {
  it("should call setFormValue('') (never null) when value is null", () => {
    const component = initComponent();
    const setFormValueSpy = vi.spyOn(component['internals'], 'setFormValue' as any);

    component.value = null;
    component.onValueChange();

    expect(setFormValueSpy).toHaveBeenCalledWith('');
    expect(setFormValueSpy).not.toHaveBeenCalledWith(null);
  });

  it("should call setFormValue('') (never undefined) when value is undefined", () => {
    const component = initComponent();
    const setFormValueSpy = vi.spyOn(component['internals'], 'setFormValue' as any);

    component.value = undefined;
    component.onValueChange();

    expect(setFormValueSpy).toHaveBeenCalledWith('');
    expect(setFormValueSpy).not.toHaveBeenCalledWith(undefined);
  });

  it('should sync inputElement.value with empty string when value is undefined', () => {
    const component = initComponent();
    component['inputElement'].value = 'old';

    component.value = undefined;
    component.onValueChange();
    expect(component['inputElement'].value).toBe('');
  });

  it('should sync inputElement.value with the coerced string', () => {
    const component = initComponent();
    component['inputElement'].value = 'old';

    component.value = 's3cret';
    component.onValueChange();
    expect(component['inputElement'].value).toBe('s3cret');

    component.value = null;
    component.onValueChange();
    expect(component['inputElement'].value).toBe('');
  });

  it('should call setFormValue with the new string value', () => {
    const component = initComponent();
    const setFormValueSpy = vi.spyOn(component['internals'], 'setFormValue' as any);
    component.value = 's3cret';
    component.onValueChange();
    expect(setFormValueSpy).toHaveBeenCalledWith('s3cret');
  });
});

describe('formResetCallback (with null history)', () => {
  it('should restore null when null was the original value', () => {
    const component = initComponent();
    component.value = null;
    component.componentWillLoad();
    component.value = 'user typed';

    component.formResetCallback();
    expect(component.value).toBeNull();
  });
});

describe('formStateRestoreCallback (with null state)', () => {
  it('should accept null and let the watcher coerce it to an empty string in the DOM', () => {
    const component = initComponent();
    const setFormValueSpy = vi.spyOn(component['internals'], 'setFormValue' as any);

    component.value = 's3cret';
    component.formStateRestoreCallback(null);

    expect(component.value).toBeNull();
    component.onValueChange();
    expect(setFormValueSpy).toHaveBeenCalledWith('');
    expect(setFormValueSpy).not.toHaveBeenCalledWith(null);
  });

  it('should restore the provided string state as-is', () => {
    const component = initComponent();
    component.formStateRestoreCallback('persisted');
    expect(component.value).toBe('persisted');
  });
});
