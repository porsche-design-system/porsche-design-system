import { vi } from 'vitest';
import { Textarea } from './textarea';

vi.mock('../../utils/dom');

class MockElementInternals {
  setValidity = vi.fn();
  setFormValue = vi.fn();
}

let mockEmit: ReturnType<typeof vi.fn>;

const initComponent = (): Textarea => {
  const component = new Textarea();
  component.host = document.createElement('p-textarea');
  component.host.attachShadow({ mode: 'open' });
  const textarea = document.createElement('textarea');
  const counterElement = document.createElement('span');
  component.host.shadowRoot.appendChild(textarea);
  component.host.shadowRoot.appendChild(counterElement);
  component['textAreaElement'] = textarea;
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
describe('componentDidRender (setFormValue)', () => {
  it('should call setFormValue with current value', () => {
    const component = initComponent();
    component.value = 'test';
    const setFormValueSpy = vi.spyOn(component['internals'], 'setFormValue' as any);
    component.componentDidRender();
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
describe('componentDidRender', () => {
  it('should call ElementInternals setValidity()', () => {
    const component = initComponent();
    const setValiditySpy = vi.spyOn(component['internals'], 'setValidity' as any);
    component.componentDidRender();
    expect(setValiditySpy).toHaveBeenCalledTimes(1);
    expect(setValiditySpy).toHaveBeenCalledWith(
      component['textAreaElement'].validity,
      component['textAreaElement'].validationMessage || ' ',
      component['textAreaElement']
    );
  });
});

describe('componentWillLoad', () => {
  it('should not mutate value when null is passed, but should preserve null as defaultValue', () => {
    const component = initComponent();
    component.value = null;
    component.componentWillLoad();

    expect(component.value).toBeNull();
    expect(component['defaultValue']).toBeNull();
  });

  it('should keep an existing string value untouched and store it as defaultValue', () => {
    const component = initComponent();
    component.value = 'some text';
    component.componentWillLoad();

    expect(component.value).toBe('some text');
    expect(component['defaultValue']).toBe('some text');
  });
});

describe('onValueChange (textAreaElement sync)', () => {
  it('should sync textAreaElement.value with empty string when value is undefined', () => {
    const component = initComponent();
    component['textAreaElement'].value = 'old';

    component.value = undefined;
    component.onValueChange();
    expect(component['textAreaElement'].value).toBe('');
  });

  it('should sync textAreaElement.value with the coerced string', () => {
    const component = initComponent();
    component['textAreaElement'].value = 'old';

    component.value = 'new text';
    component.onValueChange();
    expect(component['textAreaElement'].value).toBe('new text');

    component.value = null;
    component.onValueChange();
    expect(component['textAreaElement'].value).toBe('');
  });
});

describe('componentDidRender (setFormValue coercion to string)', () => {
  it("should call setFormValue('') (never null) when value is null", () => {
    const component = initComponent();
    const setFormValueSpy = vi.spyOn(component['internals'], 'setFormValue' as any);

    component.value = null;
    component.componentDidRender();

    expect(setFormValueSpy).toHaveBeenCalledWith('');
    expect(setFormValueSpy).not.toHaveBeenCalledWith(null);
  });

  it("should call setFormValue('') (never undefined) when value is undefined", () => {
    const component = initComponent();
    const setFormValueSpy = vi.spyOn(component['internals'], 'setFormValue' as any);

    component.value = undefined;
    component.componentDidRender();

    expect(setFormValueSpy).toHaveBeenCalledWith('');
    expect(setFormValueSpy).not.toHaveBeenCalledWith(undefined);
  });

  it('should call setFormValue with the new string value', () => {
    const component = initComponent();
    const setFormValueSpy = vi.spyOn(component['internals'], 'setFormValue' as any);
    component.value = 'new text';
    component.componentDidRender();
    expect(setFormValueSpy).toHaveBeenCalledWith('new text');
  });
});

describe('formResetCallback (with null history)', () => {
  it('should restore null when null was the original value', () => {
    const component = initComponent();
    component.value = null;
    component.componentWillLoad();
    component.value = 'changed';

    component.formResetCallback();
    expect(component.value).toBeNull();
  });
});

describe('formStateRestoreCallback (with null state)', () => {
  it('should accept null and let componentDidRender coerce it to an empty string for form submission', () => {
    const component = initComponent();
    const setFormValueSpy = vi.spyOn(component['internals'], 'setFormValue' as any);

    component.value = 'existing';
    component.formStateRestoreCallback(null);

    expect(component.value).toBeNull();
    component.componentDidRender();
    expect(setFormValueSpy).toHaveBeenCalledWith('');
    expect(setFormValueSpy).not.toHaveBeenCalledWith(null);
  });

  it('should restore the provided string state as-is', () => {
    const component = initComponent();
    component.formStateRestoreCallback('restored text');
    expect(component.value).toBe('restored text');
  });
});
