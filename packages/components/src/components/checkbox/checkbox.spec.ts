import { vi } from 'vitest';
import { Checkbox } from './checkbox';

class MockElementInternals {
  setValidity = vi.fn();
  setFormValue = vi.fn();
}

let mockEmit: ReturnType<typeof vi.fn>;

const initComponent = (): Checkbox => {
  const component = new Checkbox();
  component.host = document.createElement('p-checkbox');
  component.host.attachShadow({ mode: 'open' });
  const input = document.createElement('input');
  input.type = 'checkbox';
  component.host.shadowRoot.appendChild(input);
  component['checkboxInputElement'] = input;
  component['internals'] = new MockElementInternals() as unknown as ElementInternals;

  mockEmit = vi.fn();

  component.change = { emit: mockEmit } as any;
  component.blur = { emit: mockEmit } as any;
  return component;
};

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

describe('formResetCallback', () => {
  it('should reset form value to null if defaultChecked is false', () => {
    const value = 'test-value';
    const defaultChecked = false;
    const component = initComponent();
    component.value = value;
    component['defaultChecked'] = defaultChecked;
    const setFormValueSpy = vi.spyOn(component['internals'], 'setFormValue' as any);

    component.formResetCallback();
    component.componentDidRender();
    expect(setFormValueSpy).toHaveBeenCalledWith(null);
    expect(component.value).toBe(value);
    expect(component.checked).toBe(defaultChecked);
  });

  it('should reset form value to value if defaultChecked is true', () => {
    const value = 'test-value';
    const defaultChecked = true;
    const component = initComponent();
    component.value = value;
    component['defaultChecked'] = defaultChecked;
    const setFormValueSpy = vi.spyOn(component['internals'], 'setFormValue' as any);

    component.formResetCallback();
    component.componentDidRender();
    expect(setFormValueSpy).toHaveBeenCalledWith(value);
    expect(component.value).toBe(value);
    expect(component.checked).toBe(defaultChecked);
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
  it('should set checked to true when restoredValue is "on"', () => {
    const component = initComponent();
    component.checked = false;
    const restoredValue = 'on';
    component.formStateRestoreCallback(restoredValue);
    expect(component.checked).toBe(true);
  });
});

describe('componentDidRender', () => {
  it('should call ElementInternals setValidity()', () => {
    const component = initComponent();
    const setValiditySpy = vi.spyOn(component['internals'], 'setValidity' as any);
    component.componentDidRender();
    expect(setValiditySpy).toHaveBeenCalledTimes(1);
    expect(setValiditySpy).toHaveBeenCalledWith(
      component['checkboxInputElement'].validity,
      component['checkboxInputElement'].validationMessage || ' ',
      component['checkboxInputElement']
    );
  });

  it('should call ElementInternals setValidity() with empty flags to clear validity if checkbox is disabled', () => {
    const component = initComponent();
    const setValiditySpy = vi.spyOn(component['internals'], 'setValidity' as any);
    component.disabled = true;
    component.componentDidRender();
    expect(setValiditySpy).toHaveBeenCalledTimes(1);
    expect(setValiditySpy).toHaveBeenCalledWith({});
  });
  it('should set ariaLabelledByElements when external label exists and no internal label is provided', () => {
    const component = initComponent();
    const externalLabel = document.createElement('label');
    document.body.appendChild(externalLabel);
    externalLabel.appendChild(component.host);

    component['externalLabel'] = externalLabel;
    component.label = '';

    // Mock ariaLabelledByElements support
    Object.defineProperty(component['checkboxInputElement'], 'ariaLabelledByElements', {
      writable: true,
      value: null,
    });

    component.componentDidRender();

    expect(component['checkboxInputElement'].ariaLabelledByElements).toEqual([externalLabel]);

    // Cleanup
    document.body.removeChild(externalLabel);
  });

  it('should set aria-label as fallback when ariaLabelledByElements is not supported', () => {
    const component = initComponent();
    const externalLabel = document.createElement('label');
    externalLabel.textContent = 'External Label Text';
    document.body.appendChild(externalLabel);
    externalLabel.appendChild(component.host);

    component['externalLabel'] = externalLabel;
    component.label = '';

    component.componentDidRender();

    expect(component['checkboxInputElement'].ariaLabel).toBe('External Label Text');

    // Cleanup
    document.body.removeChild(externalLabel);
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
  it('should sync private defaultChecked value with checked prop', () => {
    const component = initComponent();
    component.checked = true;
    component.componentWillLoad();
    expect(component.checked).toBe(true);
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
  it('should set indeterminate property on the inner input', () => {
    const component = initComponent();
    component.indeterminate = true;
    expect(component['checkboxInputElement'].indeterminate).toBe(false);
    component.componentDidLoad();
    expect(component['checkboxInputElement'].indeterminate).toBe(true);
  });
});

describe('componentDidRender (setFormValue)', () => {
  it('should call setFormValue() with value if checkbox is checked', () => {
    const component = initComponent();
    component.value = 'test';
    component.checked = true;
    const setFormValueSpy = vi.spyOn(component['internals'], 'setFormValue' as any);
    component.componentDidRender();
    expect(setFormValueSpy).toHaveBeenCalledWith('test');
  });

  it('should call setFormValue() with null if checkbox is not checked', () => {
    const component = initComponent();
    component.value = 'test';
    component.checked = false;
    const setFormValueSpy = vi.spyOn(component['internals'], 'setFormValue' as any);
    component.componentDidRender();
    expect(setFormValueSpy).toHaveBeenCalledWith(null);
  });

  it('should call setFormValue() with null when disabled, even if checked', () => {
    const component = initComponent();
    component.value = 'test';
    component.checked = true;
    component.disabled = true;
    const setFormValueSpy = vi.spyOn(component['internals'], 'setFormValue' as any);
    component.componentDidRender();
    expect(setFormValueSpy).toHaveBeenCalledWith(null);
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

describe('onChange', () => {
  it('should sync form value with checkbox value and emit change event when checked', () => {
    const value = 'test-value';
    const name = 'test-name';
    const checked = true;
    const component = initComponent();
    component.name = name;
    component.value = value;
    const setFormValueSpy = vi.spyOn(component['internals'], 'setFormValue' as any);

    const event = {
      stopPropagation: vi.fn(),
      stopImmediatePropagation: vi.fn(),
      target: {
        checked,
      },
    } as unknown as Event;

    component['onChange'](event);
    component.componentDidRender();
    expect(component.checked).toBe(true);
    expect(setFormValueSpy).toHaveBeenCalledWith(value);
    expect(mockEmit).toHaveBeenCalledWith(event);
  });

  it('should clear form value if checkbox is not checked and emit change event', () => {
    const value = 'test-value';
    const name = 'test-name';
    const checked = false;
    const component = initComponent();
    component.name = name;
    component.value = value;
    const setFormValueSpy = vi.spyOn(component['internals'], 'setFormValue' as any);

    const event = {
      stopPropagation: vi.fn(),
      stopImmediatePropagation: vi.fn(),
      target: {
        checked,
      },
    } as unknown as Event;

    component['onChange'](event);
    component.componentDidRender();
    expect(component.checked).toBe(false);
    expect(setFormValueSpy).toHaveBeenCalledWith(null);
    expect(mockEmit).toHaveBeenCalledWith(event);
  });
});
